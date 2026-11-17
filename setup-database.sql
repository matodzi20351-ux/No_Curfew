-- Run once in a dedicated Supabase project's SQL Editor.
create table if not exists public.nc_staff(user_id uuid primary key references auth.users(id));
create table if not exists public.nc_catalog(id integer primary key,name text not null,price numeric(10,2) not null check(price>=0),options jsonb not null,cover boolean not null default false,installation boolean not null default false,active boolean not null default true);
create table if not exists public.nc_orders(
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id),
 request_key uuid not null, reference text unique not null default ('NC-'||upper(replace(gen_random_uuid()::text,'-',''))),
 created_at timestamptz not null default now(), customer_name text not null,phone text not null,
 fulfilment text not null,delivery_details text not null,items jsonb not null,subtotal numeric(10,2) not null,
 paxi_fee numeric(10,2), status text not null default 'Awaiting payment details',unique(user_id,request_key));
alter table public.nc_staff enable row level security;
alter table public.nc_catalog enable row level security;
alter table public.nc_orders enable row level security;
create or replace function public.nc_is_staff() returns boolean language sql stable security definer set search_path='' as $$ select exists(select 1 from public.nc_staff where user_id=auth.uid()) $$;
revoke all on function public.nc_is_staff() from public;grant execute on function public.nc_is_staff() to authenticated;
drop policy if exists nc_orders_read on public.nc_orders;
create policy nc_orders_read on public.nc_orders for select to authenticated using(user_id=auth.uid() or public.nc_is_staff());
revoke all on public.nc_staff,public.nc_catalog,public.nc_orders from anon,authenticated;
grant select on public.nc_orders to authenticated;
create or replace function public.nc_place_order(p_key uuid,p_name text,p_phone text,p_fulfilment text,p_details text,p_items jsonb) returns jsonb
language plpgsql security definer set search_path='' as $$
declare u uuid:=auth.uid(); old public.nc_orders; rec public.nc_orders; item jsonb; product public.nc_catalog; qty integer; variant text; unit numeric; total numeric:=0; resolved jsonb:='[]';
begin
 if u is null then raise exception 'Please log in first';end if;
 if p_key is null then raise exception 'Missing request identifier';end if;
 perform pg_advisory_xact_lock(hashtextextended(u::text,0));
 select * into old from public.nc_orders where user_id=u and request_key=p_key;
 if found then return to_jsonb(old);end if;
 if p_name is null or length(trim(p_name)) not between 2 and 100 or p_phone is null or p_phone !~ '^\+?[0-9 ()-]{10,20}$' then raise exception 'Check your name and phone number';end if;
 if p_details is null or length(trim(p_details)) not between 5 and 500 then raise exception 'Enter delivery or collection details';end if;
 if p_fulfilment is null or p_fulfilment not in ('Campus pickup','East London delivery','PAXI outside East London') then raise exception 'Choose a delivery method';end if;
 if p_items is null or jsonb_typeof(p_items)<>'array' then raise exception 'Invalid bag';end if;
 if jsonb_array_length(p_items) not between 1 and 100 then raise exception 'Bag must have 1 to 100 lines';end if;
 if (select count(*) from public.nc_orders where user_id=u and created_at>now()-interval '1 hour')>=20 then raise exception 'Too many order requests. Try later';end if;
 for item in select value from jsonb_array_elements(p_items) loop
  if coalesce(item->>'quantity','') !~ '^[0-9]+$' then raise exception 'Invalid quantity';end if;
  qty:=(item->>'quantity')::integer;variant:=item->>'variant';
  if qty not between 1 and 20 then raise exception 'Quantity must be between 1 and 20';end if;
  select * into product from public.nc_catalog where id=(item->>'id')::integer and active;
  if not found then raise exception 'A product is no longer available';end if;
  if variant is null or length(variant)>180 then raise exception 'Invalid product option';end if;
  if product.cover then
   if variant not like 'Model compatibility to be confirmed — %' or length(variant)<40 then raise exception 'Provide the exact laptop model';end if;
  elsif not (product.options ? variant) then raise exception 'Invalid product option';end if;
  unit:=product.price;
  if product.installation and variant='5 m + installation (+R20)' then unit:=unit+20;end if;
  total:=total+unit*qty;
  resolved:=resolved||jsonb_build_array(jsonb_build_object('id',product.id,'name',product.name,'variant',variant,'quantity',qty,'unit_price',unit));
 end loop;
 insert into public.nc_orders(user_id,request_key,customer_name,phone,fulfilment,delivery_details,items,subtotal,paxi_fee)
 values(u,p_key,trim(p_name),trim(p_phone),p_fulfilment,trim(p_details),resolved,total,case when p_fulfilment='PAXI outside East London' then null else 0 end) returning * into rec;
 return to_jsonb(rec);
end $$;
revoke all on function public.nc_place_order(uuid,text,text,text,text,jsonb) from public;
grant execute on function public.nc_place_order(uuid,text,text,text,text,jsonb) to authenticated;
create or replace function public.nc_update_order(p_id uuid,p_status text,p_fee numeric) returns void language plpgsql security definer set search_path='' as $$
declare shipping text;
begin
 if not public.nc_is_staff() then raise exception 'Owner access required';end if;
 if p_status is null or p_status not in ('Awaiting payment details','Awaiting payment','Paid','Preparing','Ready for collection','Dispatched','Completed','Cancelled') then raise exception 'Invalid status';end if;
 if p_fee is not null and (p_fee<0 or p_fee>2000) then raise exception 'Invalid PAXI fee';end if;
 select fulfilment into shipping from public.nc_orders where id=p_id;
 if not found then raise exception 'Order not found';end if;
 if shipping='PAXI outside East London' and p_fee is null and p_status in ('Paid','Preparing','Dispatched','Completed') then raise exception 'Confirm the PAXI fee before marking this order paid or fulfilled';end if;
 update public.nc_orders set status=p_status,paxi_fee=case when shipping='PAXI outside East London' then p_fee else 0 end where id=p_id;
end $$;
revoke all on function public.nc_update_order(uuid,text,numeric) from public;
grant execute on function public.nc_update_order(uuid,text,numeric) to authenticated;

-- Server-authoritative product prices and options
insert into public.nc_catalog(id,name,price,options,cover,installation) values (3,'Space Cat Graphic Tee',200,'["S","M","L","XL","XXL"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (4,'Rebel Bear Graphic Tee',200,'["S","M","L","XL","XXL"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (6,'Midnight Fox Graphic Tee',200,'["S","M","L","XL","XXL"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (11,'After Dark Signature Hoodie',350,'["S","M","L","XL","XXL"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (1,'Night Skater Graphic Tee',200,'["S","M","L","XL","XXL"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (2,'Dream Runner Graphic Tee',200,'["S","M","L","XL","XXL"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (5,'Cloud Rider Graphic Tee',200,'["S","M","L","XL","XXL"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (7,'Robot Mode Graphic Tee',200,'["S","M","L","XL","XXL"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (8,'City Hero Graphic Tee',200,'["S","M","L","XL","XXL"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (9,'Monster Crew Graphic Tee',200,'["S","M","L","XL","XXL"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (10,'Moon Walker Graphic Tee',200,'["S","M","L","XL","XXL"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (12,'Everyday Signature Tee',200,'["S","M","L","XL","XXL"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (13,'Orbit Graphic Cap',179,'["Adjustable"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (14,'Broken Time Cap',179,'["Adjustable"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (15,'Night Flame Bucket Hat',159,'["S/M","L/XL"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (16,'Star Signal Bucket Hat',159,'["S/M","L/XL"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (17,'After Hours — Amber Scent',199,'["50 ml"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (18,'Daylight — Fresh Scent',189,'["50 ml"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (19,'Midnight — Body Spray',89,'["150 ml"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (20,'Everyday — Body Spray',89,'["150 ml"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (21,'Room Glow LED Strip · 5 m',100,'["5 m — no installation","5 m + installation (+R20)"]'::jsonb,false,true) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (27,'Midnight Fox Canvas Tote',149,'["One size"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (28,'Space Cat Canvas Tote',149,'["One size"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (29,'Rebel Bear Canvas Tote',149,'["One size"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (30,'Signature Everyday Tote',129,'["One size"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (25,'Rebel Bear Graphic Laptop Cover',180,'["Model compatibility to be confirmed"]'::jsonb,true,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (26,'Space Cat Graphic Laptop Cover',180,'["Model compatibility to be confirmed"]'::jsonb,true,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (31,'Monster Crew Graphic Laptop Cover',180,'["Model compatibility to be confirmed"]'::jsonb,true,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (32,'Moon Walker Graphic Laptop Cover',180,'["Model compatibility to be confirmed"]'::jsonb,true,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (33,'Midnight Fox Graphic Laptop Cover',180,'["Model compatibility to be confirmed"]'::jsonb,true,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (34,'Street Sketch Graphic Laptop Cover',180,'["Model compatibility to be confirmed"]'::jsonb,true,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (35,'Space Cat Graphic Hoodie',350,'["S","M","L","XL","XXL"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (36,'Rebel Bear Graphic Hoodie',350,'["S","M","L","XL","XXL"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (37,'Midnight Fox Graphic Hoodie',350,'["S","M","L","XL","XXL"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (38,'Moon Walker Graphic Hoodie',350,'["S","M","L","XL","XXL"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (39,'Monster Crew Graphic Hoodie',350,'["S","M","L","XL","XXL"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;
insert into public.nc_catalog(id,name,price,options,cover,installation) values (40,'City Hero Graphic Hoodie',350,'["S","M","L","XL","XXL"]'::jsonb,false,false) on conflict(id) do update set name=excluded.name,price=excluded.price,options=excluded.options,cover=excluded.cover,installation=excluded.installation;

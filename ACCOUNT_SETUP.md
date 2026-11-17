# Activate customer accounts and orders

The UI and database setup are included. They are not connected until you complete the steps below. Customers must not see a success message unless the database actually saved the order.

1. Create a dedicated Supabase project for NO CURFEW (or use a dedicated existing NO CURFEW project).
2. Run setup-database.sql in that project's SQL Editor. This creates protected order tables, a server-side catalogue and order functions.
3. In config.js, set supabaseUrl to the project URL and supabaseKey to the public publishable key (or legacy anon key). NEVER use a secret/service_role key or database password in this file.
4. In Supabase Auth, enable email/password registration. Set the Site URL to https://no-curfew-shop.onrender.com and add the same address to allowed redirect URLs for confirmations and password resets. Configure an email sender suitable for real customers; test confirmation and password reset delivery to an unrelated address before launch.
5. Commit the updated website files to the Git branch connected to Render and redeploy.
6. Create your own account through the website and confirm the email. Then run the following SQL with your actual email to grant yourself owner access:

   insert into public.nc_staff(user_id)
   select id from auth.users where email = 'YOUR-OWNER-EMAIL'
   on conflict do nothing;

Repeat for Mpumi's email only if you want him to manage orders. Customer signup never grants owner privileges. Log out and log in again after granting access.

## Customer flow

Log in/create account → choose products → bag → delivery choice → name, phone and delivery details → Confirm & submit order → database returns order reference and Awaiting payment details.

For email confirmations, confirm the link in your inbox before logging in. Forgot password sends a recovery link and opens the new-password form.

## Owner flow

Log in → My account → Order management. Customers only see their own orders; staff can read all orders. Customer phone numbers are included so you can contact them yourself with your bank details. No WhatsApp message or email notification is sent automatically. Check the order dashboard regularly.

After sending payment details, set Awaiting payment. Once money is visible in your bank account, select Paid. Further statuses include Preparing, Ready for collection, Dispatched, Completed and Cancelled. For PAXI orders, enter the agreed fee before marking paid. Free East London delivery and campus pickup always have R0 delivery fee.

## Limits and testing

No automatic card payments, inventory reservation, proof-of-payment upload or background notifications. This is an order-request workflow with manual bank transfer confirmation. Confirm product availability with the customer. Other-category provisional prices still need your approval.

The server calculates prices from nc_catalog, not browser-submitted amounts, and checks product options. Update both products.js and nc_catalog when changing prices. The same request identifier avoids duplicate order creation when a submission is retried within the current checkout dialog. Orders are limited to 20 requests per account per hour.

Before launch, use two customer test accounts to verify neither can read the other's orders or update payment status. Verify an owner can update status and a customer sees the result. Test login, signup, reset email, both LED options and all delivery methods. These live backend tests could not be run without your Supabase project configuration.

## References

https://supabase.com/docs/reference/javascript/auth-signup
https://supabase.com/docs/reference/javascript/auth-signinwithpassword
https://supabase.com/docs/guides/database/postgres/row-level-security

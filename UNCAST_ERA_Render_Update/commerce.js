/* Guest ordering works without a backend; saved-account mode remains optional. */
'use strict';
const NC_PHONE='27608418390';
const paymentCopy='<p><strong>PayShap · TymeBank</strong><br>Primary number: <strong>0608418390</strong></p><p>Only pay after a member of the UNCAST ERA team confirms stock, the final total and the recipient name on WhatsApp. In your banking app, choose PayShap and check the recipient before authorising. Use your order reference where supported.</p><p>Payment is pending until we verify receipt in our bank account. A screenshot alone does not confirm payment.</p>';
const WELCOME_KEY='ue-welcome20';
let welcomeClaimed=false;
try{welcomeClaimed=localStorage.getItem(WELCOME_KEY)==='claimed'}catch{}
function welcomeTotals(items,claimed=welcomeClaimed){
 const goods=items.reduce((sum,x)=>sum+PRODUCTS.find(p=>p.id===x.id).price*x.qty,0);
 const gross=items.reduce((sum,x)=>sum+unitPrice(x)*x.qty,0);
 const discount=claimed&&goods>=300?20:0;
 return {goods,installation:gross-goods,discount,total:gross-discount};
}
function claimWelcome(){
 welcomeClaimed=true;try{localStorage.setItem(WELCOME_KEY,'claimed')}catch{}
 $('#claimWelcome').textContent='WELCOME20 claimed';
 $('#welcomeStatus').textContent='Saved for your first order. Add R300 or more in products to qualify. We verify first-order eligibility on WhatsApp.';
 renderBag();
}
$('#claimWelcome').onclick=claimWelcome;
if(welcomeClaimed){$('#claimWelcome').textContent='WELCOME20 claimed';$('#welcomeStatus').textContent='Your coupon is saved on this device.'}
const guestBagBase=renderBag;
renderBag=function(){
 guestBagBase();if(!bag.length)return;
 const t=welcomeTotals(bag);
 $('#cartSummary .total').outerHTML=`<div class="welcome-cart"><strong>First order? Save R20 with WELCOME20</strong><p>Spend R300+ on products. One use per customer; eligibility confirmed on WhatsApp. Delivery and installation do not count toward R300.</p><button class="text-button" id="bagCoupon">${welcomeClaimed?'Remove coupon':'Claim & apply WELCOME20'}</button><p role="status">${t.discount?'R20 discount requested — subject to first-order verification.':welcomeClaimed?'Add '+money(Math.max(0,300-t.goods))+' more in products to qualify.':'Claim your welcome coupon above.'}</p></div><div class="total"><span>Products</span><span>${money(t.goods)}</span></div>${t.installation?`<div class="total"><span>LED installation</span><span>${money(t.installation)}</span></div>`:''}${t.discount?`<div class="total"><span>WELCOME20 (pending verification)</span><span>−${money(t.discount)}</span></div>`:''}<div class="total"><strong>Estimated total before delivery</strong><strong>${money(t.total)}</strong></div>`;
 $('#bagCoupon').onclick=()=>{if(welcomeClaimed){welcomeClaimed=false;try{localStorage.removeItem(WELCOME_KEY)}catch{};$('#claimWelcome').textContent='Claim my coupon';$('#welcomeStatus').textContent='';renderBag()}else claimWelcome()};
 $('#reviewOrder').textContent='Request order on WhatsApp';$('#reviewOrder').onclick=guestCheckout;
 $('#cartSummary .notice').innerHTML='<strong>Confirm first. Pay second.</strong><br>We confirm stock, coupon eligibility, final prices and any PAXI fee before you pay. No payment is taken in your browser.';
};
function guestCheckout(){
 const method=$('#fulfilment').value;deliveryMethod=method;
 const snapshot=bag.map(x=>({...x}));
 const ref='UE-'+Array.from(crypto.getRandomValues(new Uint8Array(8)),b=>b.toString(16).padStart(2,'0')).join('').toUpperCase();
 const totals=welcomeTotals(snapshot);
 const total=totals.total;
 $('#cartDialog').close();
 info('Your order request',`<p class="order-ref">${ref}</p><p>Products: <strong>${money(totals.goods)}</strong>${totals.installation?` · Installation: ${money(totals.installation)}`:''}${totals.discount?' · WELCOME20: −R20 (first-order verification pending)':''}<br>Estimated total before delivery: <strong>${money(total)}</strong> · ${escapeHtml(method)}${method.includes('PAXI')?' — delivery fee still to be quoted.':' — FREE.'}</p><form id="guestForm" class="shop-form"><label>Your name<input name="name" required minlength="2" maxlength="80" autocomplete="name"></label><label>Delivery area or preferred campus pickup point<input name="area" required minlength="3" maxlength="160" placeholder="Area only; share your exact address privately later"></label><label>Anything we should know? <textarea name="note" maxlength="350" rows="3"></textarea></label><label class="consent-line"><input type="checkbox" required> I understand this is a request. Stock, final prices and delivery must be confirmed before payment.</label><p>These details are included in your WhatsApp message. <a href="privacy.html" target="_blank" rel="noopener">Privacy information</a></p><button class="button dark" type="submit">Prepare WhatsApp message </button></form><div id="handoff"></div>`);
 $('#guestForm').onsubmit=e=>{e.preventDefault();const fd=new FormData(e.currentTarget);const lines=snapshot.map(x=>{const product=PRODUCTS.find(p=>p.id===x.id);return product.name+' | '+x.variant+' | Qty '+x.qty+' | '+money(unitPrice(x)*x.qty)});
 const msg=['UNCAST ERA — ORDER REQUEST',ref,'Name: '+String(fd.get('name')).trim(),...lines,'Products subtotal: '+money(totals.goods),'Installation: '+money(totals.installation),...(totals.discount?['Coupon: WELCOME20 — R20 off requested. Please verify this is my first order.']:[]),'Estimated total before delivery: '+money(total),'Delivery: '+method,method.includes('PAXI')?'PAXI fee: quote required':'Delivery/pickup: FREE','Area/pickup: '+String(fd.get('area')).trim(),'Note: '+String(fd.get('note')).trim(),'Please confirm stock, total and PayShap recipient name. I have not paid.'].join('\n');
 const url='https://wa.me/'+NC_PHONE+'?text='+encodeURIComponent(msg);
 $('#handoff').innerHTML=`<div class="notice"><strong>Message ready — not sent yet.</strong><p>Tap below, then press Send in WhatsApp. Keep this reference: ${ref}. Opening WhatsApp does not confirm the order.</p></div><a class="button dark" href="${url}" target="_blank" rel="noopener">Open WhatsApp & send request </a><button class="text-button" id="copyRequest">Copy request instead</button><details><summary>View payment instructions</summary>${paymentCopy}</details><pre class="request-text"></pre><p id="copyStatus" role="status"></p>`;
 $('#handoff pre').textContent=msg;$('#guestForm').hidden=true;
 $('#copyRequest').onclick=async()=>{try{await navigator.clipboard.writeText(msg);$('#copyStatus').textContent='Copied. Paste into WhatsApp to 060 841 8390.'}catch{$('#copyStatus').textContent='Copy the displayed text manually and send it to 060 841 8390.'}};
 };
}
if(!configured()){$('#accountBtn').textContent='Help';$('#accountBtn').onclick=()=>location.href='payment-delivery.html'}
$('#helpBtn').onclick=$('#pickupInfo').onclick=()=>info('Ordering, pickup & payment','<ol><li>Choose products and options, then open your bag.</li><li>Choose free East London delivery, campus pickup or PAXI outside East London.</li><li>Prepare your order request and send it in WhatsApp.</li><li>Wait for us to confirm stock, the total and payment recipient.</li><li>Pay by PayShap. We confirm receipt and arrange fulfilment.</li></ol>'+paymentCopy+'<p>LED strips: 5 m R100. Optional installation: R20 per strip; arrange a suitable appointment with us.</p>');
$('#conceptBtn').onclick=()=>info('Our products & images','<p>UNCAST ERA is a student-led streetwear and essentials brand. Images are AI-generated design concepts, not customer or stock photographs. Request actual product details before ordering. T-shirts R210, hoodies R350, laptop covers R180, 5 m LED strips R100. Other prices are estimates until confirmed.</p><p>Your bag and favourites are saved on this device. Guest requests are sent through WhatsApp only when you press Send there. Payment is verified manually.</p>');

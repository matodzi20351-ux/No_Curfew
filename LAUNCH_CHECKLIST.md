# NO CURFEW launch handover

## Deploy to Render
Extract this ZIP and commit its CONTENTS to the repository connected to your Render Static Site. Put index.html directly in the repository root, alongside styles.css, app.js and assets/. Do not upload only the ZIP.

For that layout: Root Directory = blank; Build Command = echo "No build required"; Publish Directory = .
If your files are inside a subfolder instead, set Root Directory to that folder. Redeploy the connected branch after saving the settings.

Live address: https://no-curfew-shop.onrender.com
A 404 can mean Render is publishing a folder without index.html. Check the actual repository layout and deployed branch. This package does not change your Render dashboard automatically.

## Working now after upload
- 38 listings, search, filters, saved favourites and bag.
- Guest WhatsApp requests to +27 60 841 8390, with reference, product options, quantities and delivery method.
- PayShap instructions for the owner's confirmed primary number 0608418390 at TymeBank.
- Stock, final total, bank recipient name, payment and delivery confirmed manually in WhatsApp.
- Free East London delivery/campus pickup; outside East London PAXI fee quoted separately.
- Six original editorial guides, contact, privacy, payment/delivery and order/returns pages; sitemap and robots.txt.

## Important operational limits
No request reaches you until the customer presses Send in WhatsApp. The website cannot determine whether a WhatsApp message was sent, or whether a bank payment cleared. Reference numbers are request identifiers, not payment confirmations. No automatic stock reservation or payment confirmation. Keep an order ledger and verify bank receipts before fulfilment. The guest form does not persist customer identity data locally.

Accounts/backend code from the previous release is retained. With blank Supabase config the header shows Help and guest ordering works. Account login/order dashboards require setup in ACCOUNT_SETUP.md; they do not automatically import WhatsApp orders. Never add a service_role key to frontend code.

## Owner checks before accepting money
Confirm remaining estimated prices, stock, actual product specifications/photos, exact laptop cover compatibility, delivery dates, return arrangements and seller details required for your business. Test the PayShap recipient in your bank and make sure the payer sees the expected name. Do not request banking passwords or OTPs.

## AdSense: prepared content, not active ads
No ad network script, fake publisher ID, ads.txt declaration or consent claim has been invented. Apply through your own Google AdSense account using the live site address. Google may reject or request further content; there is no guarantee of approval or income.
To connect review/ads, provide the exact verification snippet or public publisher ID and Google's instructions. Add the verification method requested by AdSense, implement the required privacy disclosures/consent configuration for the audience, and publish the exact ads.txt entry issued by Google. Keep ads off checkout/account/payment pages. Do not click your own ads or ask others to do so. Complete identity, address and payout steps privately in your Google account. A custom domain is optional, not a guarantee of approval.

The privacy and returns copy is a factual starter for this operating model, not a legal-compliance certification. Review it against your actual practices before trading.

const PRODUCTS = [
  {
    "id": 201,
    "name": "Moon Skater Tee",
    "cat": "Clothing",
    "price": 210,
    "confirmed": true,
    "atlas": "next-drop",
    "dropRow": 0,
    "row": 0,
    "twoViews": true,
    "colour": "Black",
    "colours": [
      "Black",
      "Cobalt blue",
      "Cream",
      "Pink",
      "Lavender"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "badge": "NEW DROP",
    "desc": "Small UNCAST ERA brush wordmark on the front and your chosen graphic on the back. All five colours available to request. Design mockup; confirm fabric, fit and stock before payment."
  },
  {
    "id": 202,
    "name": "Cosmic Dreamer Tee",
    "cat": "Clothing",
    "price": 210,
    "confirmed": true,
    "atlas": "next-drop",
    "dropRow": 1,
    "row": 0,
    "twoViews": true,
    "colour": "Black",
    "colours": [
      "Black",
      "Cobalt blue",
      "Cream",
      "Pink",
      "Lavender"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "badge": "NEW DROP",
    "desc": "Small UNCAST ERA brush wordmark on the front and your chosen graphic on the back. All five colours available to request. Design mockup; confirm fabric, fit and stock before payment."
  },
  {
    "id": 203,
    "name": "Street Hopper Tee",
    "cat": "Clothing",
    "price": 210,
    "confirmed": true,
    "atlas": "next-drop",
    "dropRow": 2,
    "row": 0,
    "twoViews": true,
    "colour": "Black",
    "colours": [
      "Black",
      "Cobalt blue",
      "Cream",
      "Pink",
      "Lavender"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "badge": "NEW DROP",
    "desc": "Small UNCAST ERA brush wordmark on the front and your chosen graphic on the back. All five colours available to request. Design mockup; confirm fabric, fit and stock before payment."
  },
  {
    "id": 204,
    "name": "Star Cat Tee",
    "cat": "Clothing",
    "price": 210,
    "confirmed": true,
    "atlas": "next-drop",
    "dropRow": 3,
    "row": 0,
    "twoViews": true,
    "colour": "Black",
    "colours": [
      "Black",
      "Cobalt blue",
      "Cream",
      "Pink",
      "Lavender"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "badge": "NEW DROP",
    "desc": "Small UNCAST ERA brush wordmark on the front and your chosen graphic on the back. All five colours available to request. Design mockup; confirm fabric, fit and stock before payment."
  },
  {
    "id": 205,
    "name": "Era 26 Tee",
    "cat": "Clothing",
    "price": 210,
    "confirmed": true,
    "atlas": "next-drop",
    "dropRow": 4,
    "row": 0,
    "twoViews": true,
    "colour": "Black",
    "colours": [
      "Black",
      "Cobalt blue",
      "Cream",
      "Pink",
      "Lavender"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "badge": "NEW DROP",
    "desc": "Small UNCAST ERA brush wordmark on the front and your chosen graphic on the back. All five colours available to request. Design mockup; confirm fabric, fit and stock before payment."
  },
  {
    "id": 206,
    "name": "Rebel Script Wordmark Tee",
    "cat": "Clothing",
    "price": 130,
    "confirmed": true,
    "atlas": "wordmark-tees",
    "cols": 2,
    "rows": 5,
    "row": 0,
    "col": 0,
    "twoViews": true,
    "frontOnly": true,
    "colour": "Black",
    "colours": [
      "Black",
      "Cobalt blue",
      "Cream",
      "Pink",
      "Lavender"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "badge": "R130 ESSENTIAL",
    "desc": "Only the small full-name UNCAST ERA wordmark on the front. Completely plain back. Choose black, cobalt blue, cream, pink or lavender. Design mockup; fit and availability confirmed before payment."
  },
  {
    "id": 207,
    "name": "UNCAST ERA Crew Socks",
    "cat": "Socks",
    "price": 0,
    "quote": true,
    "image": "assets/crew-socks.png",
    "colour": "Black",
    "sizes": [
      "One pair \u2014 confirm fit"
    ],
    "badge": "NEW",
    "desc": "Black crew socks with the UNCAST ERA wordmark. Price, material, size range and availability are awaiting supplier confirmation. Request a quote on WhatsApp. Design mockup."
  },
  {
    "id": 101,
    "name": "Broken Time Tee",
    "cat": "Clothing",
    "price": 210,
    "confirmed": true,
    "atlas": "broken-clock",
    "cols": 2,
    "rows": 4,
    "row": 0,
    "col": 1,
    "twoViews": true,
    "colour": "Black",
    "colours": [
      "Black",
      "Cobalt blue",
      "Cream"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "badge": "NEW ERA",
    "desc": "Small full-name UNCAST ERA chest logo with a bold back print. Choose a colour and switch between front and back to inspect the design. Concept mockup; fabric, measurements and availability will be confirmed before payment."
  },
  {
    "id": 121,
    "name": "Broken Time Hoodie",
    "cat": "Clothing",
    "price": 350,
    "confirmed": true,
    "atlas": "broken-clock",
    "cols": 2,
    "rows": 4,
    "row": 3,
    "col": 1,
    "twoViews": true,
    "colour": "Black",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "desc": "The matching T-shirt artwork on a pullover hoodie, with a small full-name chest logo and large back print. Confirm fabric, fit and stock before payment."
  },
  {
    "id": 102,
    "name": "Exit the Ordinary Tee",
    "cat": "Clothing",
    "price": 210,
    "confirmed": true,
    "atlas": "galaxy-portal",
    "cols": 2,
    "rows": 4,
    "row": 0,
    "col": 1,
    "twoViews": true,
    "colour": "Black",
    "colours": [
      "Black",
      "Cobalt blue",
      "Cream"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "badge": "NEW ERA",
    "desc": "Small full-name UNCAST ERA chest logo with a bold back print. Choose a colour and switch between front and back to inspect the design. Concept mockup; fabric, measurements and availability will be confirmed before payment."
  },
  {
    "id": 122,
    "name": "Exit the Ordinary Hoodie",
    "cat": "Clothing",
    "price": 350,
    "confirmed": true,
    "atlas": "galaxy-portal",
    "cols": 2,
    "rows": 4,
    "row": 3,
    "col": 1,
    "twoViews": true,
    "colour": "Black",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "desc": "The matching T-shirt artwork on a pullover hoodie, with a small full-name chest logo and large back print. Confirm fabric, fit and stock before payment."
  },
  {
    "id": 103,
    "name": "Unwritten Rules Tee",
    "cat": "Clothing",
    "price": 210,
    "confirmed": true,
    "atlas": "unwritten-rules",
    "cols": 2,
    "rows": 4,
    "row": 0,
    "col": 1,
    "twoViews": true,
    "colour": "Black",
    "colours": [
      "Black",
      "Cobalt blue",
      "Cream"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "badge": "NEW ERA",
    "desc": "Small full-name UNCAST ERA chest logo with a bold back print. Choose a colour and switch between front and back to inspect the design. Concept mockup; fabric, measurements and availability will be confirmed before payment."
  },
  {
    "id": 123,
    "name": "Unwritten Rules Hoodie",
    "cat": "Clothing",
    "price": 350,
    "confirmed": true,
    "atlas": "unwritten-rules",
    "cols": 2,
    "rows": 4,
    "row": 3,
    "col": 1,
    "twoViews": true,
    "colour": "Black",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "desc": "The matching T-shirt artwork on a pullover hoodie, with a small full-name chest logo and large back print. Confirm fabric, fit and stock before payment."
  },
  {
    "id": 104,
    "name": "Dream Portal Tee",
    "cat": "Clothing",
    "price": 210,
    "confirmed": true,
    "atlas": "dream-portal",
    "cols": 2,
    "rows": 4,
    "row": 0,
    "col": 1,
    "twoViews": true,
    "colour": "Pink",
    "colours": [
      "Pink",
      "Black",
      "Cream"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "badge": "NEW ERA",
    "desc": "Small full-name UNCAST ERA chest logo with a bold back print. Choose a colour and switch between front and back to inspect the design. Concept mockup; fabric, measurements and availability will be confirmed before payment."
  },
  {
    "id": 124,
    "name": "Dream Portal Hoodie",
    "cat": "Clothing",
    "price": 350,
    "confirmed": true,
    "atlas": "dream-portal",
    "cols": 2,
    "rows": 4,
    "row": 3,
    "col": 1,
    "twoViews": true,
    "colour": "Pink",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "desc": "The matching T-shirt artwork on a pullover hoodie, with a small full-name chest logo and large back print. Confirm fabric, fit and stock before payment."
  },
  {
    "id": 105,
    "name": "Unwritten Tee",
    "cat": "Clothing",
    "price": 210,
    "confirmed": true,
    "atlas": "unwritten-girl",
    "cols": 2,
    "rows": 4,
    "row": 0,
    "col": 1,
    "twoViews": true,
    "colour": "Pink",
    "colours": [
      "Pink",
      "Black",
      "Cream"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "badge": "NEW ERA",
    "desc": "Small full-name UNCAST ERA chest logo with a bold back print. Choose a colour and switch between front and back to inspect the design. Concept mockup; fabric, measurements and availability will be confirmed before payment."
  },
  {
    "id": 125,
    "name": "Unwritten Hoodie",
    "cat": "Clothing",
    "price": 350,
    "confirmed": true,
    "atlas": "unwritten-girl",
    "cols": 2,
    "rows": 4,
    "row": 3,
    "col": 1,
    "twoViews": true,
    "colour": "Pink",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "desc": "The matching T-shirt artwork on a pullover hoodie, with a small full-name chest logo and large back print. Confirm fabric, fit and stock before payment."
  },
  {
    "id": 106,
    "name": "Nobody Assigns Your Role Tee",
    "cat": "Clothing",
    "price": 210,
    "confirmed": true,
    "atlas": "own-role",
    "cols": 2,
    "rows": 4,
    "row": 0,
    "col": 1,
    "twoViews": true,
    "colour": "Black",
    "colours": [
      "Black",
      "Cobalt blue",
      "Cream"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "badge": "NEW ERA",
    "desc": "Small full-name UNCAST ERA chest logo with a bold back print. Choose a colour and switch between front and back to inspect the design. Concept mockup; fabric, measurements and availability will be confirmed before payment."
  },
  {
    "id": 150,
    "name": "Navy Signature Five-panel Cap",
    "cat": "Caps & hats",
    "price": 179,
    "quote": false,
    "atlas": "accessories",
    "cols": 4,
    "rows": 3,
    "row": 0,
    "col": 0,
    "colour": "Navy",
    "sizes": [
      "One size"
    ],
    "desc": "Styled UNCAST ERA name only. Design concept; final specifications and stock subject to supplier confirmation."
  },
  {
    "id": 151,
    "name": "Cream Signature Five-panel Cap",
    "cat": "Caps & hats",
    "price": 179,
    "quote": false,
    "atlas": "accessories",
    "cols": 4,
    "rows": 3,
    "row": 0,
    "col": 1,
    "colour": "Cream",
    "sizes": [
      "One size"
    ],
    "desc": "Styled UNCAST ERA name only. Design concept; final specifications and stock subject to supplier confirmation."
  },
  {
    "id": 152,
    "name": "Black Signature Five-panel Cap",
    "cat": "Caps & hats",
    "price": 179,
    "quote": false,
    "atlas": "accessories",
    "cols": 4,
    "rows": 3,
    "row": 0,
    "col": 2,
    "colour": "Black",
    "sizes": [
      "One size"
    ],
    "desc": "Styled UNCAST ERA name only. Design concept; final specifications and stock subject to supplier confirmation."
  },
  {
    "id": 153,
    "name": "Pink Signature Five-panel Cap",
    "cat": "Caps & hats",
    "price": 179,
    "quote": false,
    "atlas": "accessories",
    "cols": 4,
    "rows": 3,
    "row": 0,
    "col": 3,
    "colour": "Pink",
    "sizes": [
      "One size"
    ],
    "desc": "Styled UNCAST ERA name only. Design concept; final specifications and stock subject to supplier confirmation."
  },
  {
    "id": 154,
    "name": "Black Signature Cotton Tote",
    "cat": "Tote bags",
    "price": 129,
    "quote": false,
    "atlas": "accessories",
    "cols": 4,
    "rows": 3,
    "row": 1,
    "col": 0,
    "colour": "Black",
    "sizes": [
      "One size"
    ],
    "desc": "Styled UNCAST ERA name only. Design concept; final specifications and stock subject to supplier confirmation."
  },
  {
    "id": 155,
    "name": "Cream Signature Cotton Tote",
    "cat": "Tote bags",
    "price": 129,
    "quote": false,
    "atlas": "accessories",
    "cols": 4,
    "rows": 3,
    "row": 1,
    "col": 1,
    "colour": "Cream",
    "sizes": [
      "One size"
    ],
    "desc": "Styled UNCAST ERA name only. Design concept; final specifications and stock subject to supplier confirmation."
  },
  {
    "id": 156,
    "name": "Pink Signature Cotton Tote",
    "cat": "Tote bags",
    "price": 129,
    "quote": false,
    "atlas": "accessories",
    "cols": 4,
    "rows": 3,
    "row": 1,
    "col": 2,
    "colour": "Pink",
    "sizes": [
      "One size"
    ],
    "desc": "Styled UNCAST ERA name only. Design concept; final specifications and stock subject to supplier confirmation."
  },
  {
    "id": 157,
    "name": "Lavender Signature Cotton Tote",
    "cat": "Tote bags",
    "price": 129,
    "quote": false,
    "atlas": "accessories",
    "cols": 4,
    "rows": 3,
    "row": 1,
    "col": 3,
    "colour": "Lavender",
    "sizes": [
      "One size"
    ],
    "desc": "Styled UNCAST ERA name only. Design concept; final specifications and stock subject to supplier confirmation."
  },
  {
    "id": 158,
    "name": "Black Signature Fleece Shorts",
    "cat": "Clothing",
    "price": 0,
    "quote": true,
    "atlas": "accessories",
    "cols": 4,
    "rows": 3,
    "row": 2,
    "col": 0,
    "colour": "Black",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "desc": "Styled UNCAST ERA name only. Design concept; final specifications and stock subject to supplier confirmation."
  },
  {
    "id": 159,
    "name": "Cream Signature Fleece Shorts",
    "cat": "Clothing",
    "price": 0,
    "quote": true,
    "atlas": "accessories",
    "cols": 4,
    "rows": 3,
    "row": 2,
    "col": 1,
    "colour": "Cream",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "desc": "Styled UNCAST ERA name only. Design concept; final specifications and stock subject to supplier confirmation."
  },
  {
    "id": 160,
    "name": "Cobalt blue Signature Fleece Shorts",
    "cat": "Clothing",
    "price": 0,
    "quote": true,
    "atlas": "accessories",
    "cols": 4,
    "rows": 3,
    "row": 2,
    "col": 2,
    "colour": "Cobalt blue",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "desc": "Styled UNCAST ERA name only. Design concept; final specifications and stock subject to supplier confirmation."
  },
  {
    "id": 161,
    "name": "Mint Signature Fleece Shorts",
    "cat": "Clothing",
    "price": 0,
    "quote": true,
    "atlas": "accessories",
    "cols": 4,
    "rows": 3,
    "row": 2,
    "col": 3,
    "colour": "Mint",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "desc": "Styled UNCAST ERA name only. Design concept; final specifications and stock subject to supplier confirmation."
  },
  {
    "id": 180,
    "name": "Broken Time Laptop Cover",
    "cat": "Laptop covers",
    "price": 180,
    "confirmed": true,
    "atlas": "covers",
    "cols": 3,
    "rows": 2,
    "row": 0,
    "col": 0,
    "colour": "Black",
    "sizes": [
      "Model compatibility to be confirmed"
    ],
    "cover": true,
    "desc": "Fitted hard-shell laptop cover concept, not a laptop bag. Laptop not included. Send the exact laptop model so we can confirm compatibility before payment."
  },
  {
    "id": 181,
    "name": "Exit the Ordinary Laptop Cover",
    "cat": "Laptop covers",
    "price": 180,
    "confirmed": true,
    "atlas": "covers",
    "cols": 3,
    "rows": 2,
    "row": 0,
    "col": 1,
    "colour": "Cobalt blue",
    "sizes": [
      "Model compatibility to be confirmed"
    ],
    "cover": true,
    "desc": "Fitted hard-shell laptop cover concept, not a laptop bag. Laptop not included. Send the exact laptop model so we can confirm compatibility before payment."
  },
  {
    "id": 182,
    "name": "Unwritten Rules Laptop Cover",
    "cat": "Laptop covers",
    "price": 180,
    "confirmed": true,
    "atlas": "covers",
    "cols": 3,
    "rows": 2,
    "row": 0,
    "col": 2,
    "colour": "Cream",
    "sizes": [
      "Model compatibility to be confirmed"
    ],
    "cover": true,
    "desc": "Fitted hard-shell laptop cover concept, not a laptop bag. Laptop not included. Send the exact laptop model so we can confirm compatibility before payment."
  },
  {
    "id": 183,
    "name": "Dream Portal Laptop Cover",
    "cat": "Laptop covers",
    "price": 180,
    "confirmed": true,
    "atlas": "covers",
    "cols": 3,
    "rows": 2,
    "row": 1,
    "col": 0,
    "colour": "Pink",
    "sizes": [
      "Model compatibility to be confirmed"
    ],
    "cover": true,
    "desc": "Fitted hard-shell laptop cover concept, not a laptop bag. Laptop not included. Send the exact laptop model so we can confirm compatibility before payment."
  },
  {
    "id": 184,
    "name": "Unwritten Laptop Cover",
    "cat": "Laptop covers",
    "price": 180,
    "confirmed": true,
    "atlas": "covers",
    "cols": 3,
    "rows": 2,
    "row": 1,
    "col": 1,
    "colour": "Lavender",
    "sizes": [
      "Model compatibility to be confirmed"
    ],
    "cover": true,
    "desc": "Fitted hard-shell laptop cover concept, not a laptop bag. Laptop not included. Send the exact laptop model so we can confirm compatibility before payment."
  },
  {
    "id": 185,
    "name": "Nobody Assigns Your Role Laptop Cover",
    "cat": "Laptop covers",
    "price": 180,
    "confirmed": true,
    "atlas": "covers",
    "cols": 3,
    "rows": 2,
    "row": 1,
    "col": 2,
    "colour": "Black",
    "sizes": [
      "Model compatibility to be confirmed"
    ],
    "cover": true,
    "desc": "Fitted hard-shell laptop cover concept, not a laptop bag. Laptop not included. Send the exact laptop model so we can confirm compatibility before payment."
  },
  {
    "id": 17,
    "name": "After Hours \u2014 Amber Scent",
    "cat": "Fragrances",
    "price": 199,
    "img": "fragrance",
    "colour": "Amber",
    "sizes": [
      "50 ml"
    ],
    "desc": "A proposed warm amber fragrance for the everyday collection. Final scent notes, ingredients and bottle design will be confirmed with the supplier."
  },
  {
    "id": 18,
    "name": "Daylight \u2014 Fresh Scent",
    "cat": "Fragrances",
    "price": 189,
    "img": "fragrance",
    "colour": "Fresh",
    "sizes": [
      "50 ml"
    ],
    "desc": "A proposed fresh fragrance. Supplier, ingredients and final scent notes have not yet been selected."
  },
  {
    "id": 19,
    "name": "Midnight \u2014 Body Spray",
    "cat": "Fragrances",
    "price": 89,
    "img": "fragrance",
    "colour": "Midnight",
    "sizes": [
      "150 ml"
    ],
    "desc": "A body spray concept for your everyday routine. Final formula and packaging are subject to supplier confirmation."
  },
  {
    "id": 20,
    "name": "Everyday \u2014 Body Spray",
    "cat": "Fragrances",
    "price": 89,
    "img": "fragrance",
    "colour": "Fresh",
    "sizes": [
      "150 ml"
    ]
  },
  {
    "id": 21,
    "name": "Room Glow LED Strip \u00b7 5 m",
    "cat": "LED lights",
    "price": 100,
    "confirmed": true,
    "img": "led",
    "colour": "Multicolour",
    "badge": "ROOM EDIT",
    "sizes": [
      "5 m \u2014 no installation",
      "5 m + installation (+R20)"
    ],
    "installation": true,
    "desc": "5 m LED strip lights for R100. Optional installation costs R20 per strip, making R120 with installation. Installation location and appointment are arranged separately; PAXI delivery does not include an installer."
  }
];
const SHOP_CONFIG={brand:"UNCAST ERA",currency:"ZAR",liveSales:false,whatsappNumber:"27608418390"};

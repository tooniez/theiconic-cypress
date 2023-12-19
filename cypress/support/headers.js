// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('visitWithHeaders', (url) => {
  const headers = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'accept-language': 'en-US,en;q=0.5',
    'accept-encoding': 'gzip, deflate, br',
    'upgrade-insecure-requests': '1',
    'connection': 'keep-alive',
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0',
    cookie:
      'optimizelyEndUserId=oeu1698820440389r0.5440022522485501; cf_clearance=E8kaJWIeRH0Yp58mgh8UGuPPchRukT_qB9J8jnDRpo0-1702882306-0-1-fa37a050.c83345c5.ad36ffb0-0.2.1702882306; PHPSESSID_11c82b2f5afa71b5cc0108c076f018e5=a1d59aa0f1426588e5d89a839d782db0; device_pixel_ratio=2; location=%5B%5D; autologin=a%3A4%3A%7Bi%3A0%3Bs%3A8%3A%2210915645%22%3Bi%3A1%3Bs%3A40%3A%222922a68cde97ba59b4bca2a54bde159abafdecb8%22%3Bi%3A2%3Bi%3A31536000%3Bi%3A3%3Ba%3A0%3A%7B%7D%7DM4R1044b602a793973af9642eafe7da55d17992bc0c4173932b41b8f7d1ed2199001a; g=m; eve_access=%7B%22user%22%3A%7B%22access_token%22%3A%22eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ii1Lb3piblJ0NFVXZW5NSldnRkFDMiJ9.eyJodHRwOi8vb2F1dGgudGhlaWNvbmljLmNvbS5hdS9jbGFpbXMvdXVpZCI6ImYyNjFiMmU2LTlkODktMTFlZS04OTlhLWM2ZDMxM2NkZmQ1YiIsImlzcyI6Imh0dHBzOi8vdGhlaWNvbmljLXByb2R1Y3Rpb24uYXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY1ODAxNDU5NjAwZTg2OTY4NDdlNzEzZiIsImF1ZCI6WyJ0aGVpY29uaWMiLCJodHRwczovL3RoZWljb25pYy1wcm9kdWN0aW9uLmF1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MDI5MzY3OTgsImV4cCI6MTcwMjk0Mzk5OCwiYXpwIjoiWVU3QkE3cWZ4c0Q5SVkxWHQ4czIzYXd0ajhVcGNZbnciLCJzY29wZSI6Im9wZW5pZCBlbWFpbCBvZmZsaW5lX2FjY2VzcyJ9.crtDEr4ZmY1HDks5yJK6Bc2nHtBl6N8__wHQcMCjMC1KxhNNm5BrLiwD2pPvah8agILZrz-UQ5RifZKzOGMCKq0eMwMuUOrMcCiPDNqmuVYGBNsKT2frCSNhbamqoUON0hh9XFCV9NsdARUb-8rz_GIAMCTabrQSvtsgSTYNfzcyjXZ1A7KDFnwXZDtf6M5QlB3a0HiSEhEnrGXd9OKoKjT5i_lkFErBe0WX_XhsplCn9fSNdApbHOQXFMkx6XThIr5NtfuDxnOnRiaGPCnoeuT22xu4FohWn2hSMSN6021dnUeMzcnCa_H9-XIAHJoK4cHWyTV6U7F-OH7uXo3XNQ%22%2C%22token_type%22%3A%22Bearer%22%2C%22scope%22%3A%22user%22%2C%22client_id%22%3A%22website%22%2C%22csrf_token%22%3A%2213f0d78f9f9d26929fd5bf761c4db46de8100a10%22%7D%7D; __stripe_mid=8d0cb0ee-4fae-4d87-ae1c-6ae9a10f706bf1ab95; __cf_bm=FFZHedbAfpm8duesp53ESOgCpa9tDrfD2nLjOOzi3GY-1702936798-1-Aap5GPUHGlqIXQXyY8SdxcWJKX2DIgJK9102CS2J7o0+3DpYOC89FbAw3C3Ks4ZJdR9W6LhoHl5kOv4vadSk5+MnQO7lnzuneHD05wwT5Paa; _ticid=691efcc7-89fa-4c1c-9370-5907a821d74f',
    host: 'www.theiconic.com.au',
    connection: 'keep-alive',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1',
    'TE': 'trailers',
    'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
  };

  cy.visit(url, {
    headers: headers
  });
});

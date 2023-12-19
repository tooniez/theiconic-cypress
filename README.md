# TheIconic Cypress

> Objective: Test the iconic website (https://www.theiconic.com.au/ ) to check if the basic functionality is working correctly.
> Scenario: You are tasked with testing the shopping cart functionality of an e-commerce website. Your goal is to ensure that users can add items to their cart, view the cart, and proceed to checkout without errors.

## Project Features

- Shared headers for tests
- Custom commands for common steps
- Loading Cypress environment variable for the host
- Fixtures storing product ID for tests

## Installatiion

1. Clone the repository locally
2. Run npm i to install dependencies
3. Run npm run test:chrome for a local test run

## Tests

### 1. Smoke test (Sanity)

This test uses cy.requests to verify that the response code returns 200.

```javascript
describe('API - Landing', () => {
  it('Landing page returns 200 response OK', () => {

    cy.request({ 
      url: Cypress.env('host'), 
      headers: { 
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,/;q=0.8", 
      }
    })
    .then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
```

### 2. Search test

This test suite demonstrates programmatically performing a search using fixtures and a shared visit command with headers.

```javascript
describe('Search', () => {
  beforeEach(() => {
    cy.viewport(1341, 1059);
    cy.visitWithHeaders(Cypress.env('host'));
  });

  it('Should be able to search for product', () => {
    cy.fixture('search').then((search) => {
      cy.searchProduct(search.product);
    });
  });
});
```

### 3. Shopping Cart test

This test suite checks that a user can:

- Search for a product
- Add it to the cart
- Proceed to checkout and payment

```javascript
describe('Shopping cart', () => {
  beforeEach(() => {
    cy.viewport(1341, 1059);
    cy.visitWithHeaders(Cypress.env('host'));

    //search
    cy.searchProduct('maxi');

    //load product id fixture
    cy.fixture('product').then((product) => {
      cy.selectProduct(product.id);
    });
  });

  it('Should go to checkout page', () => {
    cy.goToCheckout();
  });

  it('Should display payment page', () => {
    cy.goToCheckout();
    cy.goToPayments();
  });
});
```

#### Common Commands

Reusable commands for common steps across tests:

```javascript
Cypress.Commands.add('searchProduct', (product) => {
  cy.get('ul input').click();
  cy.get('#search-input').type(product);
  cy.get('.search-btn').click();
  cy.wait(5000);
});

Cypress.Commands.add('selectProduct', (productTrackId) => {
  cy.wait(5000);
  cy.get(
    `[data-ti-track-product="${productTrackId}"] > .pinboard > figcaption > .product-details > .name`
  ).click();
  cy.get('#add-to-cart-button').click();
});

Cypress.Commands.add('goToCheckout', () => {
  cy.wait(5000);

  cy.get('li:nth-of-type(3) p').click();
  cy.get('div.reveal-modal div:nth-of-type(3) a').click();
  cy.location('href').should('eq', 'https://www.theiconic.com.au/checkout/');
});

Cypress.Commands.add('goToPayments', () => {
  cy.get(
    '[data-ng-if="account.authenticated === false && cart.length"] > .button'
  )
    .should('be.visible')
    .click();
});
```

#### Headers

A Cypress command to store headers is reused across tests:

```javascript
Cypress.Commands.add('visitWithHeaders', (url) => {
  const headers = {
    accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'accept-language': 'en-US,en;q=0.5',
    'accept-encoding': 'gzip, deflate, br',
    'upgrade-insecure-requests': '1',
    connection: 'keep-alive',
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
    TE: 'trailers',
    'sec-ch-ua':
      '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
  };

  cy.visit(url, {
    headers: headers,
  });
});
```

#### Fixtures

Fixtures are used to store data informing initial tests. In this example, a test product ID is specified:

```json
{
  "id": "VO034AA84KAT"
}
```

## Test run example

Below is an example of a test run performed locally

<details>

<summary>Below is an example of a test run performed locally..</summary>

```shell
➜  theiconic-cypress git:(main*)npm run test:chrome

> theiconic-cypress@1.0.0 test:chrome
> cypress run --browser chrome --headless


DevTools listening on ws://127.0.0.1:60417/devtools/browser/16a8d2e0-279f-4517-9dbd-f577ac4c791f
2023-12-19 10:47:10.104 Cypress[27600:14474247] WARNING: Secure coding is not enabled for restorable state! Enable secure coding by implementing NSApplicationDelegate.applicationSupportsSecureRestorableState: and returning YES.

====================================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:        13.6.1                                                                         │
  │ Browser:        Chrome 119 (headless)                                                          │
  │ Node Version:   v18.17.0 (/Users/tooniez/.nvm/versions/node/v18.17.0/bin/node)                 │
  │ Specs:          3 found (cart/cart.cy.js, search/search.cy.js, smoke/landing.cy.js)            │
  │ Searched:       cypress/e2e/**/*.cy.{js,jsx,ts,tsx}                                            │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  cart/cart.cy.js                                                                 (1 of 3)


  Shopping cart
    ✓ Should go to checkout page (43758ms)
    ✓ Should display payment page (30788ms)


  2 passing (1m)


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        2                                                                                │
  │ Passing:      2                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        false                                                                            │
  │ Duration:     1 minute, 16 seconds                                                             │
  │ Spec Ran:     cart/cart.cy.js                                                                  │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  search/search.cy.js                                                             (2 of 3)


  Search
    ✓ Should be able to search for product (14238ms)


  1 passing (15s)


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        1                                                                                │
  │ Passing:      1                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        false                                                                            │
  │ Duration:     15 seconds                                                                       │
  │ Spec Ran:     search/search.cy.js                                                              │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  smoke/landing.cy.js                                                             (3 of 3)


  API - Landing
    ✓ Landing page returns 200 response OK (828ms)


  1 passing (838ms)


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        1                                                                                │
  │ Passing:      1                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        false                                                                            │
  │ Duration:     0 seconds                                                                        │
  │ Spec Ran:     smoke/landing.cy.js                                                              │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


====================================================================================================

  (Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  cart/cart.cy.js                          01:16        2        2        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  search/search.cy.js                      00:15        1        1        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  smoke/landing.cy.js                      840ms        1        1        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!                        01:32        4        4        -        -        -

```

</details>

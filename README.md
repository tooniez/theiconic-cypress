# TheIconic Cypress

> Objective: Test The Iconic website (https://www.theiconic.com.au/) to check if the basic functionality is working correctly.
> Scenario: You are tasked with testing the shopping cart functionality of an e-commerce website. Your goal is to ensure that users can add items to their cart, view the cart, and proceed to checkout without errors.

## Project Features

- Shared headers for tests
- Custom commands for common steps
- Loading Cypress environment variable for the host
- Fixtures storing product ID for tests

## Installation

1. Clone the repository locally
2. Run `npm i` to install dependencies
3. Run `npm run test:chrome` for a local test run

## Tests

### 1. Smoke Test (Sanity)

This test uses `cy.requests` to verify that the response code returns 200.

```javascript
describe('API - Landing', () => {
  it('Landing page returns 200 response OK', () => {
    cy.request({ 
      url: Cypress.env('host'), 
      headers: { 
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
      }
    })
    .then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
```

### 2. Search Test

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

### 3. Shopping Cart Test

This test suite checks that a user can:

- Search for a product
- Add it to the cart
- Proceed to checkout and payment

```javascript
describe('Shopping cart', () => {
  beforeEach(() => {
    cy.viewport(1341, 1059);
    cy.visitWithHeaders(Cypress.env('host'));

    // Search
    cy.searchProduct('maxi');

    // Load product ID fixture
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

### Common Commands

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

### Headers

A Cypress command to store headers that is reused across tests:

```javascript
Cypress.Commands.add('visitWithHeaders', (url) => {
  const headers = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'accept-language': 'en-US,en;q=0.5',
    'accept-encoding': 'gzip, deflate, br',
    'upgrade-insecure-requests': '1',
    'connection': 'keep-alive',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0',
    'cookie': '...',
    'host': 'www.theiconic.com.au',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1',
    'TE': 'trailers',
    'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"'
  };

  cy.visit(url, {
    headers: headers
  });
});
```

### Fixtures

Fixtures are used to store data for tests. In this example, a test product ID is specified:

```json
{
  "id": "VO034AA84KAT"
}
```

## Test Run Example

Below is an example of a test run performed locally:

<details>
<summary>Click to expand test run output</summary>

```shell
➜  theiconic-cypress git:(main*) npm run test:chrome

> theiconic-cypress@1.0.0 test:chrome
> cypress run --browser chrome --headless

DevTools listening on ws://127.0.0.1:60417/devtools/browser/16a8d2e0-279f-4517-9dbd-f577ac4c791f
2023-12-19 10:47:10.104 Cypress[27600:14474247] WARNING: Secure coding is not enabled for restorable state! Enable secure coding by implementing NSApplicationDelegate.applicationSupportsSecureRestorableState: and returning YES.

====================================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:        13.6.1                                                                         │
  │ Browser:        Chrome 119 (headless)                                                          │
  │ Node Version:   v18.17.0 (/Users/tooniez/.nvm/versions/node/v18.17.0/bin/node)               │
  │ Specs:          3 found (cart/cart.cy.js, search/search.cy.js, smoke/landing.cy.js)          │
  │ Searched:       cypress/e2e/**/*.cy.{js,jsx,ts,tsx}                                          │
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

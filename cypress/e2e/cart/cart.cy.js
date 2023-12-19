describe('Shopping cart', () => {
  beforeEach(() => {
    cy.viewport(1341, 1059);
    cy.visitWithHeaders(Cypress.env('host'));

    //search
    cy.searchProduct('maxi');
    cy.wait(5000);

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

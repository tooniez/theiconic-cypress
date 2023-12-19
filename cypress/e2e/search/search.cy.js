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

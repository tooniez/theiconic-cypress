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
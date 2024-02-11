describe(`Login, visit dashboard and add/remove products`, () => {
  beforeEach("Login and navigate to the dashboard", () => {
    cy.initializeAuth();
    // open dashboard page
    cy.visit('/dashboard', {
      failOnStatusCode: false,
      timeout: 30000
    });
  });

  it('Type an invalid Amazon URL and display an error mesage', () => {
    cy.get('[data-cy=urlInput]').type('https://www.amazon.it/gp/browse.html?node=411663031&ref_=nav_em__itlv_0_2_10_2')
    cy.get('[data-cy=submitBtn]').click()
    cy.get('[data-cy=submitBtn]').should('contain', 'Add...')
    cy.get('h5').should('contain', 'Error, try again!');
    cy.screenshot()
  })

  it('Type an non-Amazon URL and display an error mesage', () => {
    cy.get('[data-cy=urlInput]').type('https://www.ebay.it/')
    cy.get('[data-cy=submitBtn]').click()
    cy.get('h5').should('contain', 'Error: not an Amazon product link!');
    cy.screenshot()
  })

  it('Add a new tracked product and display the product card', () => {
    cy.get('[data-cy=urlInput]').type('https://www.amazon.it/echo-dot-con-orologio/dp/B09B8RVKGW')
    cy.get('[data-cy=submitBtn]').click()
    cy.get('[data-cy=submitBtn]').should('contain', 'Add...')
    cy.get('[data-cy=productName]', { timeout: 10000 }).should('contain', 'Echo Dot');   
    cy.screenshot()
  })

  it('Delete all tracked products and display the default message', () => {
    cy.get('[data-cy=deleteBtn]').click({ multiple: true })
    cy.get('p').should('contain', 'Nothing to show here, yet!'); 
    cy.screenshot()
  })
});
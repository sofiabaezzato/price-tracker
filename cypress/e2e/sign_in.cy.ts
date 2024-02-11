describe(`Login and visit dashboard`, () => {
  it("Navigate to the dashboard and add and remove a URL", () => {
    cy.initializeAuth();
    // open dashboard page
    cy.visit('/dashboard', {
      failOnStatusCode: false,
      timeout: 30000
    });

    cy.get('[data-cy=urlInput]').type('https://www.amazon.it/echo-dot-con-orologio/dp/B09B8RVKGW')

    cy.get('[data-cy=submitBtn]').click()
    cy.get('[data-cy=submitBtn]').should('contain', 'Add...')

    cy.get('[data-cy=productName]', { timeout: 10000}).should('contain', 'Echo Dot');   

    cy.screenshot()

    cy.get('[data-cy=deleteBtn]').click()

    cy.get('p').should('contain', 'Nothing to show here, yet!'); 

    cy.screenshot()
  });
});
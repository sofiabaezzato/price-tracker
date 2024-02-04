describe(`Login and visit dashboard`, () => {
  it("navigate to the dashboard", () => {
    cy.initializeAuth();
    // open dashboard page
    cy.visit('/dashboard', {
      failOnStatusCode: false,
      timeout: 30000
    });
  
    cy.screenshot()
    // cy.get("h1").contains("Tracked products");   
  });
});
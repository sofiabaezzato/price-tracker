describe(`Login and visit dashboard`, () => {

  // signedin! Now navigate to the dashboard
  it("navigate to the dashboard", () => {
    cy.initializeAuth();
    // open dashboard page
    cy.visit(`/dashboard`,  {
      failOnStatusCode: false,
    });
  
    // cy.get("h1").contains("Tracked products");   
  });
});
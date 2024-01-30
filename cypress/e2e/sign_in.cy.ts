describe(`Login and visit dashboard`, () => {
  beforeEach(() => {
    cy.initializeAuth();
  });

  // signedin! Now navigate to the dashboard
  it("navigate to the dashboard", () => {
    // open dashboard page
    cy.visit(`/dashboard`,  {
      failOnStatusCode: false,
    });
  
    cy.get("h1").contains("Tracked products");   
  });
});
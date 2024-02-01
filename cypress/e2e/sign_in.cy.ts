describe(`Login and visit dashboard`, () => {

  // signedin! Now navigate to the dashboard
  it("navigate to the dashboard", () => {
    cy.initializeAuth();
    // open dashboard page
    cy.visit(`/dashboard`);
  
    cy.screenshot()
    // cy.get("h1").contains("Tracked products");   
  });
});
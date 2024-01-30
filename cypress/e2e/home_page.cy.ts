describe('Homepage test', () => {
  it('Shows the homepage title and signin/signup buttons', () => {
    cy.visit("/", {
      failOnStatusCode: false,
    })
    cy.contains("Price Tracker Home")

    cy.get("button").contains("Sign in");
    cy.get("button").contains("Sign up");
  })
})
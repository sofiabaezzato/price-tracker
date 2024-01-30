describe('First test', () => {
  it('Shows the homepage title', () => {
    cy.visit("/", {
      failOnStatusCode: false,
    })
    cy.contains("Price Tracker Home")
  })
})


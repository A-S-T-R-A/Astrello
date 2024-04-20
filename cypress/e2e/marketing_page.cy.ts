describe("Login Page Tests", () => {
  it('redirects to the sign-in page when clicking "Login"', () => {
    cy.visit("http://localhost:3000/", {
      failOnStatusCode: false
    });
    cy.contains("a", "Login").click();
    cy.url().should("include", "/sign-in");
  });
});

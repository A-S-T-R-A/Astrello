describe("Marketing Page Tests", () => {
    it('redirects to the sign-up page when clicking "Get Astrello for free"', () => {
        cy.visit("http://localhost:3000/", {
            failOnStatusCode: false,
        })
        cy.contains("a", "Get Astrello for free").click()
        cy.url().should("include", "/sign-up")
    })
})

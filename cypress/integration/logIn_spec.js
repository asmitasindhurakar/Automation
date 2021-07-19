///<reference types ="Cypress"/>

const email = 'lll@fg.com'

beforeEach('visits login page', () => {
    //using baseURL
    cy.visit("/")
    cy.get('.logo').should('be.visible')
    cy.get(".login").click()

    // assertion to verify the login page is visited
    cy.url().should('include','controller=authentication')
    cy.get('.page-heading').should('contain','Authentication')

    cy.get('#email').should('be.enabled').as('email')
    cy.get('#passwd').should('be.enabled').as('password')
    cy.get('#SubmitLogin').should('be.visible').as('submit')

})
describe("login suite", () => {
    it('Can locate Login and Password elements', () => {
        cy.get('@email').should('be.empty')
        cy.get('@password').should('be.empty')
    });

    it('cannot login with only one input field filled.', () => {
        cy.get('@email').type(email)
        cy.get("@submit").click()
        cy.wait(1000)
        cy.get('ol > li').should('have.text', 'Password is required.')

        cy.get('@email').clear()
        cy.get('@password').type('12345')
        cy.get("@submit").click()
        cy.get('ol > li').should('have.text', 'An email address required.')
    })
    it("should login when the valid email and password is provided", () => {
        cy.get('@email').clear().type('email')
        cy.get('@password').clear().type('12345')
        cy.get("@submit").click()

        //verify that user is loged in
        cy.get('.navigation_page').should('have.text', 'My account')
    })
    it("should not be loged in when invalid data is provided", () => {
        cy.get('@email').clear().type(email)
        cy.get('@password').clear().type('1234')
        cy.get("@submit").click()
        cy.get('ol > li').should('have.text', 'Invalid password.')
    })

    it("checks whether the forget password link works or not", () => {
        cy.get('.lost_password > a').then(link => {
            cy.request(link.prop('href'))
                .its('status')
                .should('eq', 200)
        })

    })
})
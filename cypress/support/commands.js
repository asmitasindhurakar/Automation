// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {

    cy.get('.logo').should('be.visible')
    cy.get(".login").click()

    cy.get('#email').should('be.enabled').type('lll@fg.com')
    cy.get('#passwd').should('be.enabled').type('12345')
    cy.get('#SubmitLogin').should('be.visible').click()

})

Cypress.Commands.add('logout', () => {

    cy.get('.logout').
    should('be.visible').
    should('contain','Sign out').
    click()

    // assertion to verify that the user is logout
    cy.wait(1000)
    cy.url().should('include','controller=authentication')
    cy.get('.page-heading').should('contain','Authentication')
})
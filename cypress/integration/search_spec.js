///<reference types ="Cypress"/>
beforeEach('by passing UI to login', () => {
    cy.visit("/")
      
})
describe('Search for a keyword and add item to cart', () => {
    it('should display the item related with the keywords', () => {
        cy.get('#search_query_top').should('be.enabled').type('dress{enter}')
        cy.get('.page-heading>span').contains("dress")

    })
    it('should display proper message when the keyword is missing', () => {
            cy.get('#search_query_top').should('be.enabled')
            cy.get('#searchbox > .btn').should('be.visible').click()
            cy.get('.alert').should('contain','Please enter a search keyword')
    }) 
})
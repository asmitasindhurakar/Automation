///<reference types ="Cypress"/>

beforeEach('using custom command to login', () => {
    cy.visit("/")
    cy.viewport(1280, 720)
    cy.login()
})

describe('e2e', () => {
        it('adding an item to cart and visiting the checkout page', () => {
            cy.get('#search_query_top').should('be.enabled').type('dress{enter}')
            cy.get('.page-heading>span').contains("dress")
            cy.get(".product_list > :nth-child(1)").trigger('mouseover')
    
            //add to the card
            cy.contains('Add to cart').click({ force: true })
            cy.get('.layer_cart_product > h2').should('contain', 'Product successfully added to your shopping cart')
        
            //proceed to checkout page
            cy.get('.button-container > .button-medium > span').click();
            cy.url().should('include', 'controller=order')
            cy.get('#cart_title').should('contain', 'Shopping-cart summary')
            cy.get(".cart_navigation > .button ")
          
            //verify that the item added is the correct one
            cy.get(".cart_description > .product-name").should('have.text','Printed Summer Dress')

            cy.logout()

        })
})
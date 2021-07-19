///<reference types ="Cypress"/>

beforeEach('using custom command to login', () => {
    cy.visit("/")
    cy.viewport(1280, 720)
    cy.request({
        method:"POST",
        url: 'http://automationpractice.com/index.php?controller=authentication',
        body:{
            email:'lll@fg.com',
            passwd:'12345'}
       }) 

       //search an item
        cy.get('#search_query_top').should('be.enabled').type('dress{enter}')
        cy.get('.page-heading>span').contains("dress")
        cy.get(".product_list > :nth-child(1)").trigger('mouseover')

})

describe('cart suite', () => {
    it('view an item through quick view',()=>{
      cy.contains('Quick view').click()
        
    })
    it('adding an item to cart',()=>{             
        cy.contains('Add to cart').click({force:true})
        cy.get('#layer_cart_product_title').should('contain','Printed Summer Dress')
        cy.get('h2').should('contain','There is 1 item in your cart')
        cy.get('.layer_cart_product > h2').should('contain', 'Product successfully added to your shopping cart')
    })
    it('add an item and proceed checkout',()=>{
        cy.contains('Add to cart').click({force:true})
        cy.wait(1000)
        cy.get('.button-container > .button-medium').
        should('be.visible').
        should('contain','Proceed to checkout').
        should('have.attr','href')
    })   
    it('add an item and continue shopping',()=>{
        cy.contains('Add to cart').click({force:true})
        cy.wait(1000)
        cy.get('.continue').
        should('be.visible').
        should('contain','Continue shopping').click()

   })   

})
///<reference types ="Cypress"/>
describe("registration", () => {
    beforeEach('visits Sign In page', () => {
        //using baseURL
        cy.visit("/")
        cy.get('.logo').should('be.visible')
        cy.get(".login").click()
    })
    it('email field should not be empty', () => {
        cy.get('#email_create').should('be.empty')
        cy.get('#SubmitCreate').should('be.visible').click()
        cy.get('ol > li').should('have.text', 'Invalid email address.')
    })
    it('should not be allowed to register will already used email', () => {
        cy.get('#email_create').should('be.visible').type("lll@fg.com{enter}")
        cy.get('#create_account_error').should("contain",'An account using this email address has already been registered. Please enter a valid password or request a new one.')
    })
    it('cannot register when required fields are left empty', () => {
        cy.get('#email_create').should('be.visible').type("ram@fgg.com{enter}")
        cy.wait(1000)
        cy.get('.page-heading').should('have.text','Create an account')
        cy.get('#submitAccount ').should('be.visible').click()
        cy.get('.alert').should('be.visible')

    })
    it('entering valid email and filling up all required field  ', () => {
        cy.get('#email_create').should('be.enabled').type("ram@fgg.com{enter}")
        cy.wait(1000)
        cy.get('.page-heading').should('have.text','Create an account')

        // radio button
        cy.get('#id_gender1').check().should('be.checked')
        cy.get('#id_gender2').should('not.be.checked')
        
        cy.get('#customer_firstname').should('be.visible').clear().type('Ram')
        cy.get('#customer_lastname').should('be.visible').clear().type('sharma')
        cy.get('#passwd').should('be.visible').type('ram123')
        cy.get('#days').select('10')
        cy.get('#months').select('3')
        cy.get('#years').select('1953')
        cy.get('#newsletter').check().should('be.checked')
        cy.get('#company').clear().type('Fusemachine')
        cy.get('#address1').clear().type('Paknajol')
        cy.get('#city').clear().type('Ktm')
        cy.get('#id_state').select('California').should('contain','California')
        cy.get('#postcode').clear().type('10923')
        cy.get('#customer_firstname').clear().type('Ram')
        cy.get('#phone_mobile').clear().type('01453768')
        cy.get('#alias').clear().type('paknajol')
        // cy.get('#submitAccount ').should("be.enabled").click()

    });
})
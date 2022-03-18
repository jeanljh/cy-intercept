describe('Test Suite - Main', () => {
    it('Intercept request to spy response body from page loading', () => {
        cy.intercept('**/search*').as('req')
        cy.visit('')
        cy.wait('@req')
        Cypress._.times(3, i => {
            cy.intercept(`**/search?*page=${i+1}*`).as('req')
            cy.contains('button', 'More').scrollIntoView().click()
            cy.wait('@req').its('response.body.hits.length').should('be.lte', 100)
        })
    })

    it('Intercept request to stub server error', () => {
        cy.intercept('**/search*', { statusCode: 500 }).as('req')
        cy.visit('')
        cy.wait('@req')
        cy.get('p:contains(Something went wrong)').should('be.visible')
    })

    it('Intercept request to stub network error', () => {
        cy.intercept('**/search*', { forceNetworkError: true }).as('req')
        cy.visit('')
        cy.wait('@req')
        cy.get('p:contains(Something went wrong)').should('be.visible')
    })
})
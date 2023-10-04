/// <reference types='cypress' />

const { _ } = Cypress
describe('Test Suite - UI', () => {
    beforeEach(() => {
        cy.intercept('**/search*').as('req')
        cy.visit('')
        cy.wait('@req')
    })

    it('Test column header and position', () => {
        const expected = ['Title', 'Author', 'Comments', 'Points', 'Action']
        cy.get('div.item-header > span')
            .should('have.length', 5)
            .then($el => _.map($el, 'innerText'))
            .should('deep.equal', expected)
        /** method 2 */
        // .each((e, i) => expect(e).to.have.text(expected[i]))
    })

    it('Test sorting for comments column', () => {
        cy.contains('div.item-header button', 'Comments').click()
        cy.get('div.item > span:nth-child(3)').then(cy.convertToNumberArray).then(cy.checkDescendingOrder)
        cy.contains('div.item-header button', 'Comments').click()
        cy.get('div.item > span:nth-child(3)').then(cy.convertToNumberArray).then(cy.checkAscendingOrder)
    })

    it('Test sorting for points column', () => {
        cy.contains('div.item-header button', 'Points').click()
        cy.get('div.item > span:nth-child(4)').then(cy.convertToNumberArray).then(cy.checkDescendingOrder)
        cy.contains('div.item-header button', 'Points').click()
        cy.get('div.item > span:nth-child(4)').then(cy.convertToNumberArray).then(cy.checkAscendingOrder)
    })
})

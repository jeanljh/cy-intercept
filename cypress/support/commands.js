/// <reference types='cypress' />
const { _ } = Cypress
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

Cypress.Commands.add('inputSearch', input => {
    cy.get('input').clear().should('be.empty').type(`${input}{enter}`)
    // cy.get('form').submit()
})

Cypress.Commands.add('checkResponseTitle', (arr, input) => {
    expect(arr.every(o => o.title.match(new RegExp(input, 'i')))).to.be.true
})

Cypress.Commands.add('convertToNumberArray', $e => _.map($e, e => _.toNumber(e.innerText)))

Cypress.Commands.add('checkDescendingOrder', val => {
    for (let i = 0; i < val.length - 1; i++) {
        expect(val[i]).to.be.gte(val[i + 1])
    }
})

Cypress.Commands.add('checkAscendingOrder', val => {
    for (let i = 0; i < val.length - 1; i++) {
        expect(val[i]).to.be.lte(val[i + 1])
    }
})

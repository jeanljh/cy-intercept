declare namespace Cypress {
    interface Chainable<Subject> {
        inputSearch(input: string): Chainable<void>
        checkResponseTitle(obj: object, input: string): Chainable<void>
        convertToNumberArray(mapFunc: Function): Chainable<number[]>
        checkDescendingOrder(arr: number[]): Chainable<void>
        checkAscendingOrder(arr: number[]): Chainable<void>
    }
}
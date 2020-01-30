describe('App', () => {
    it('can be opened', () => {
        cy.visit('/')
        cy.contains('[data-test="app"]')
    })
})

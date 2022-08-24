import data from '../fixtures/testdata.json'

describe('Test Suite - Search', () => {
    beforeEach('Intercept request verify response', () => {
        cy.intercept({
            method: 'GET',
            path: '**/search?query=redux&page=0&hitsPerPage=100',
            // query: {
            //     query: data.defInput,
            //     page: '0',
            //     hitsPerPage: '100'
            // }
        }).as('req')
        cy.visit('')
        cy.wait('@req').then(({response}) => {
            expect(response.statusCode).to.eq(200)
            expect(response.body.hits).length.to.be.lte(100)
            cy.checkResponseTitle(response.body.hits, data.defInput)
            // method 2
            // cy.wrap(response.body.hits).each(o => expect(o.title).to.match(new RegExp(data.defInput, 'i')))
            // method 3
            // response.body.hits.forEach(o => {
            //   expect(o.title).to.match(new RegExp(data.defInput, 'i'))
            // })
        })
    })

    it('Intercept request to spy response from search via RouteHandler', () => {
        cy.intercept({
            method: 'GET',
            pathname: '**/search*',
            query: {
                query: data.input,
                page: '0',
                hitsPerPage: '100'
            } 
        }).as('req')
        cy.inputSearch(data.input)
        cy.wait('@req').its('response').then(res => {
            expect(res.statusCode).to.eq(200)
            expect(res.body.hits).length.to.be.lte(100)
            cy.checkResponseTitle(res.body.hits, data.input)
        })
        cy.get('.table > .table-row a').each(e => expect(e.text()).to.match(new RegExp(data.input, 'i')))
        .eq(1)
        .then(e => {
            const href = e.attr('href')
            e.removeAttr('target')
            cy.wrap(e).click()
            cy.url().should('eq', href)
            // cy.location('href').should('eq', href)
        })
        // method 2
        // cy.get('.table > .table-row a').then(el => {
        //     for (const e of el) {
        //         expect(e.textContent).matches(new RegExp(data.input, 'i'))
        //     }
        // })
    })

    it('Intercept request to stub data in response body via RouteHandler', () => {
        cy.intercept('GET', '**/search*', req => {
            req.reply(res => {
                const o = res.body.hits.find(e => e.author === 'greenie_beans')
                const d = data.hits[0]
                o.title = d.title
                o.author = d.author,
                o.num_comments = d.num_comments
                o.points = d.points
            })
            req.alias = 'req'
        })
        cy.inputSearch(data.input)
        cy.wait('@req').its('response.body.hits').then(arr => {
            const o = arr.find(k => k.title === data.hits[0].title)
            expect(o).not.to.be.undefined
            expect(o).to.deep.contain(data.hits[0])
            // method 2            
            // const d = data.hits[0]
            // expect(o).not.to.be.undefined
            // expect(o.author).to.eq(d.author)
            // expect(o.num_comments).to.eq(d.num_comments)
            // expect(o.points).to.eq(d.points)
        })
    })

    it('Intercept request to stub entire response body via RouteHandler', () => {
        cy.intercept('**/search*', req => {
            req.reply(data)
            req.alias = 'req'
        })
        cy.inputSearch(data.input)
        cy.wait('@req').then(({response}) => {
            expect(response.body.hits).to.have.lengthOf(1)
            expect(response.body).to.deep.eq(data)
        })
    })

    it('Intercept request to stub entire response body via StaticResponce', () => {
        cy.intercept('**/search*', { fixture: 'testdata' }).as('req')
        cy.inputSearch(data.input)
        cy.wait('@req').its('response.body.hits').then(arr => {
            expect(arr.length).to.eq(1)
            expect(arr).to.deep.eq(data.hits)
        })
    })
})
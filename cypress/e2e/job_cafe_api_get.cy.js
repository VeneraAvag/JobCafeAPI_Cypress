/// <reference types = "Cypress"/>

describe('Get jobs test', () => {
  it('get all jobs', () => {
    cy.request('/').then((response) => {
      console.log(response),
      expect(response.status).equal(200),
      expect(response.statusText).equal("OK")
    })
  })

  it('verify jobs result list', () => {
    cy.request('/').then((response) => {
      console.log(response.body.content),
      expect(response.body.content).not.empty
    })
  })

    it('job listing has all details', () => {
      cy.request('/').then((response) => {
        var result = response.body.content[0]

        console.log(result),
        expect(result).have.property("id"),
        expect(result.id).not.null,

        expect(result).have.property("location"),
        expect(result.location).not.null,

        expect(result).have.property("link"),
        expect(result.link).contain("http")
  
      })
    })

    it('serch by location', () => {
      cy.request('/?location=Toronto').then((response) => {
        let resultList = response.body.content
        console.log(resultList)
        expect(response.status).equal(200)

        for(let i = 0; i < resultList.length; i++) {
          expect(resultList[i].location).contain("Toronto")
        }
      })
    })

})
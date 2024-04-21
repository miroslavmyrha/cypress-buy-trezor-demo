describe('Scraper', () => {
  if (Cypress.config('scraping') === true) {
    beforeEach(() => {

      cy.visit('/')

    })

    it('Scrape test data attributes from ' + Cypress.config('baseUrl'), () => {

      cy.scrapeDataTestIDsWith(
          'data-testid', 
          'baseUrlPage.json'
      )

    })

    it('Scrape test data attributes from product detail.', () => {
              
      cy.selectProductOnHeaderNavigation('Trezor Model T')

      cy.scrapeDataTestIDsWith(
        'data-testid', 
        'productDetail.json'
      )
    })
  }
})
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

Cypress.Commands.add('getElementByDataTestID', (selector) => { 

    cy.get('[data-testid="' + selector + '"]')

})

Cypress.Commands.add('scrapeDataTestIDsWith', (attribute, fileName) => { 

    let resultObject = {}

    cy.get('[' + attribute + ']').filter(':visible').each(element => {
        let tagName = Cypress.$(element).prop('tagName')
        resultObject[element.attr(attribute)] = [tagName, element.text()]
    })

    cy.writeFile(fileName, resultObject)

})

Cypress.Commands.add('selectProductOnHeaderNavigation', (product) => { 

    cy.intercept(Cypress.config('collectResponse')).as('collectResponse')

    cy.get('nav#nav-header')
        .find('div')
        .contains('Products')
        .click()

    cy.wait('@collectResponse')

    cy.get('div.rounded-xl.bg-white.p-4.drop-shadow-sm')
        .find('div')
        .contains(product)
        .click()

})

Cypress.Commands.add('verificationPopUpElementsAddedToShoppingCart', () => {

    // added to cart popup
    // maybe typo? added to cart?
    cy.getElementByDataTestID('added-to-chart-go-to-cart')
        .should('be.visible')


    cy.getElementByDataTestID('basic-image')
        .find('img')
        .should('be.visible')

    cy.getElementByDataTestID('basic-icon-iconsvg-ChevronRight')
        .should('be.visible')

})

Cypress.Commands.add('itemsInCartHasValue', (numOfItems) => {

    cy.get('div')
        .contains('Cart')
        .find('div')
        .contains(numOfItems)

})

Cypress.Commands.add('fillAboutYouForm', (objectWithData) => {

    if (objectWithData.firstName !== '') {
        cy.wait(1000)
        cy.getElementByDataTestID('pages-checkout-about-you-first-name')
            .should('be.visible')
            .type(
                objectWithData.firstName
            )
    }

    if (objectWithData.lastName !== '') {
        cy.getElementByDataTestID('pages-checkout-about-you-last-name')
            .should('be.visible')
            .type(
                objectWithData.lastName
            )
    }

    if (objectWithData.yourEmail !== '') {
        cy.getElementByDataTestID('pages-checkout-about-you-email')
            .should('be.visible')
            .type(
                objectWithData.yourEmail
            )
    }

    if (objectWithData.phone !== '') {
        cy.getElementByDataTestID('pages-checkout-about-you-phone')
            .should('be.visible')
            .type(
                objectWithData.phone
            )
    }

    if (objectWithData.newsletter === true) {
        cy.get('input[name="newsletterSubscription"][type="checkbox"]')
            .click()
    }

    if (objectWithData.termsOfService === true) {
        cy.get('input[name="privacyPolicy"][type="checkbox"]')
            .click()
    }
})

Cypress.Commands.add('fillDeliveryAddressForm', (objectWithData) => {

    if (objectWithData.streetAndHouseNumber !== '') {
        cy.getElementByDataTestID('pages-checkout-delivery-address-street-and-house-no')
            .should('be.visible')
            .type(
                objectWithData.streetAndHouseNumber,
                {delay: 0}
            )
    }

    if (objectWithData.apartmentSuite !== '') {
        // missing data attribute, not required, but in some scenario can be filled in the future
        cy.get('input[name="apartmentSuite"]')
            .should('be.visible')
            .type(
                objectWithData.apartmentSuite,
                {delay: 0}
            )
    }

    if (objectWithData.ZIPCode !== '') {
        cy.getElementByDataTestID('pages-checkout-delivery-address-zip-code')
            .should('be.visible')
            .type(
                objectWithData.ZIPCode,
                {delay: 0}
            )
    }

    if (objectWithData.city !== '') {
        cy.getElementByDataTestID('pages-checkout-delivery-address-city')
            .should('be.visible')
            .type(
                objectWithData.city,
                {delay: 0}
            )
    }
})

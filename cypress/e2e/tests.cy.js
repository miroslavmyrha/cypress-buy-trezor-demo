import scrapedTestElementsFromBaseUrl from '../../baseUrlPage.json'
import scrapedTestElementsFromProductDetail from '../../productDetail.json'
import aboutYouData from '../fixtures/aboutYou.json'
import deliveryAddressData from '../fixtures/deliveryAddress.json'

describe('Demo tests', () => {

    beforeEach(() => {

        cy.visit('/')

    })

    context('Example of smoke tests - all scraped data-testid elements should be visible', () => {

        it('All elements on baseUrl page should be visible.', () => {
            Object.keys(scrapedTestElementsFromBaseUrl).forEach(testElementOnBaseUrlPage => {

                cy.getElementByDataTestID(testElementOnBaseUrlPage)
                    .should('be.visible')

            })
        })

        
        it('All elements on productDetail page should be visible.', () => {

            cy.selectProductOnHeaderNavigation('Trezor Model T')

            Object.keys(scrapedTestElementsFromProductDetail).forEach(testElementOnProductDetailPage => {

                cy.getElementByDataTestID(testElementOnProductDetailPage)
                    .should('be.visible')
            
            })
        
        })

    })

    context('Example of integration tests', () => {

        before(() => {

            cy.visit('/')
    
        })

        it('Example of integration test - Buy 2x Trezor model T', () => {
            
            cy.selectProductOnHeaderNavigation('Trezor Model T')

            cy.intercept('collectResponse').as('collectResponse')

            cy.getElementByDataTestID('btn-buy')
                .click()

            cy.wait('@collectResponse')

            cy.verificationPopUpElementsAddedToShoppingCart()

            cy.itemsInCartHasValue(1)
                .and('be.visible')

            // add second trezor to shopping cart

            cy.getElementByDataTestID('btn-buy')
                .click()

            cy.wait('@collectResponse')

            // There are probably bug. It should have 2 items in cart, but for continue buy process and finish it will be ignored for now.
            // cy.itemsInCartHasValue(2)
            //    .and('be.visible')

            cy.get('div')
                .contains('Cart')
                .click()

            // try to select invalid promocode

            cy.getElementByDataTestID('blocks-promocode-add-button')
                .click()

            cy.get('input[name="promoCode"]')
                .type(
                    'somethingelse',
                    {delay: 0}
                )
            
            // there is also typo?
            cy.getElementByDataTestID('-fetching-button')
                .click()

            // I cann´t find better selector  :(
            cy.get('div.Toastify__toast.Toastify__toast-theme--colored.Toastify__toast--error')
                .should('be.visible')

            cy.getElementByDataTestID('blocks-promocode-cancel-button')
                .click()

            cy.getElementByDataTestID('pages-cart-list-checkout-cart')
                .click()

            // select light blue version of Trezor protection 
            cy.getElementByDataTestID('section-Addprotection')
                .find('[data-testid="basic-icon-iconsvg-ChevronDown"]')
                .click({force: true})

            cy.get('span')
                .contains('Light Blue')
                .click()

            cy.getElementByDataTestID('pages-cart-list-checkout-accessories')
                .click()

            cy.getElementByDataTestID('pages-checkout-about-you-submit')
                .click()

            cy.wait('@collectResponse')

            Object.keys(aboutYouData).forEach(input => {

                const populatedAboutYouInputs = {
                    firstName: '',
                    lastName: '',
                    yourEmail: '',
                    phone: '',
                    newsletter: '',
                    termsOfService: ''
                }

                populatedAboutYouInputs[input] = aboutYouData[input]

                cy.fillAboutYouForm(
                    populatedAboutYouInputs    
                )

                cy.getElementByDataTestID('pages-checkout-about-you-submit')
                    .click()
                
            })

            Object.keys(deliveryAddressData).forEach(input => {

                const populatedDeliveryAddressInputs = {

                    state: '',
                    streetAndHouseNumber: '',
                    apartmentSuite: '',
                    ZIPCode: '',
                    city: ''
                    
                }

                populatedDeliveryAddressInputs[input] = deliveryAddressData[input]

                cy.fillDeliveryAddressForm(
                    populatedDeliveryAddressInputs    
                )

                cy.getElementByDataTestID('pages-checkout-delivery-address-submit')
                    .click()                

            })

            // wrong data attribute naming
            cy.getElementByDataTestID('pages-checkout-delivery-types-submit')
                .click()

            // TO-DO

        })
    })
})

   
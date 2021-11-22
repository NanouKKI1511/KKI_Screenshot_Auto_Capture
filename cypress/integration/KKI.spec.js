/// <reference types="cypress" />
const dataList = "kki.json";
const marketList = ["gb","kw"]

const selectedMarket = 'gb'

const index = marketList.indexOf(selectedMarket)

before(() => {
    cy.fixture(dataList).then(data => {
        const url = data[index]
        cy.log(url)
        cy.visit(url.domain + url.loginUrl)
        cy.wait(2000);

        //Accept Cookies
        cy.xpath('//div[contains(@class,"cookie-banner__controls-primary")]//button[1]').click()


        //Login
        const credential = data[0]
        cy.get('[id=email]').type(credential.username)
        cy.get('[id=password]').type(credential.password)
        cy.xpath('//button[contains(@type,"submit")] ').click()
        cy.wait(5000)
    })
})

beforeEach(() => {
    Cypress.Cookies.preserveOnce('session_id', 'remember_token')
})

afterEach(() => {
    //Code to Handle the Sesssions in cypress.
    //Keep the Session alive when you jump to another test
    let str = [];
    cy.getCookies().then((cook) => {
        cy.log(cook);
        for (let l = 0; l < cook.length; l++) {
            if (cook.length > 0 && l == 0) {
                str[l] = cook[l].name;
                Cypress.Cookies.preserveOnce(str[l]);
            } else if (cook.length > 1 && l > 1) {
                str[l] = cook[l].name;
                Cypress.Cookies.preserveOnce(str[l]);
            }
        }
    })
})

context('Pages Screenshots', () => {

    it('Visit URL and ScreenShot', () => {

        cy.log(index)
        cy.fixture(dataList).then(data => {
            const datalist = data[index]
            var arrayLength = datalist.urlList.length;
            //var arrayLength = 3;
            for (var i = 0; i < arrayLength; i++) {
                console.log(datalist.urlList[i]);
                cy.visit(datalist.domain + datalist.urlList[i])
                //cy.visit(datalist.domain + 'veeva-engage-poc'); 
                cy.wait(15000);
                
                cy.get("body").then($body => {
                    if ($body.find('[class="loading-page"]').length > 0) {
                        cy.get('[class="loading-page"]').then($ref => {
                            if ($ref.is(':visible')) {
                                cy.wait(7000)
                            }
                        });
                    }
                })

                //open reference bar
                cy.get("body").then($body => {
                    if ($body.find('[class="custom-focus"]').length > 0) {
                        cy.get('[class="custom-focus"]').then($ref => {
                            if ($ref.is(':visible')) {
                                cy.get('[class="custom-focus"]').should('be.visible').click({ force: true })
                                cy.wait(3000)
                                cy.scrollTo('bottom', {duration:10000});
                            }
                        });
                    }
                })
                cy.percySnapshot((datalist.urlList[i]).replace(/\//g, '_'));
                cy.screenshot((datalist.urlList[i]).replace(/\//g, '_'));
            }
        })
    })
})

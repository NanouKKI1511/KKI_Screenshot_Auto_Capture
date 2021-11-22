/// <reference types="cypress" />
const dataList = "kkifix.json";
const marketList = ["gb", "kw", "de"]

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

                //open reference bar
                cy.get("body").then($body => {
                    if ($body.find('[class="custom-focus"]').length > 0) {
                        cy.get('[class="custom-focus"]').then($ref => {
                            if ($ref.is(':visible')) {
                                cy.get('[class="custom-focus"]').should('be.visible').click({ force: true })
                                cy.wait(3000)
                                cy.scrollTo('bottom', {duration:7000});
                            }
                        });
                    }
                })
                cy.percySnapshot(datalist.urlList[i]);
                cy.screenshot((datalist.urlList[i]).replace(/\//g, '_'));
            }
        })
    })
})

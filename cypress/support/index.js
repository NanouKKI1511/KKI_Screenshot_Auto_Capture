// ***********************************************************

// import './commands'
// import '@percy/cypress'
// import '@percy/cypress/task'
// import 'cypress-plugin-snapshots/commands'
// Alternatively you can use CommonJS syntax:
// require('./commands')

import '@percy/cypress';

require('cypress-xpath');

Cypress.on('uncaught:exception', (err, runable) => {
    return false;
})
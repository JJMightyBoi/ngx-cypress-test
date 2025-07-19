/// <reference types="cypress" />
describe('Test then', () => {
  it('then', () => {
    cy.visit('/');
    cy
  // Find the el with id 'some-link'
  .contains('span.created-by','Created with ♥ by ').find('a[href]')

  .then(($myElement) => {
    // ...massage the subject with some arbitrary code
    
    // grab its href property
    const href = $myElement.prop('href')

    // strip out the 'hash' character and everything after it
    return href.replace(/(#.*)/, '')
    
  })
  .then((href) => {
    cy.log('✅that website is : '+href)
    // href is now the new subject
    // which we can work with now
  })
  })




})
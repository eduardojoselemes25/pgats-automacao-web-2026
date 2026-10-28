
const password = '12345'

const openLoginPage = () => {
    cy.visit('https://www.automationexercise.com')
    cy.get('a[href*="login"]').click()
}

export const startSignup = (user) => {
    openLoginPage()

    cy.get('[data-qa="signup-name"]').type(user.name)
    cy.get('[data-qa="signup-email"]').type(user.email)
    cy.get('[data-qa="signup-button"]').click()
}

export const registerUser = (user) => {
    startSignup(user)

    cy.get('#id_gender2').check()
    cy.get('[data-qa="password"]').type(password)
    cy.get('[data-qa="days"]').select('1')
    cy.get('[data-qa="months"]').select('September')
    cy.get('[data-qa="years"]').select('1988')

    cy.get('#newsletter').check()
    cy.get('#optin').check()

    cy.get('[data-qa="first_name"]').type(user.firstName)
    cy.get('[data-qa="last_name"]').type(user.lastName)
    cy.get('[data-qa="company"]').type(user.company)
    cy.get('[data-qa="address"]').type(user.address)
    cy.get('[data-qa="country"]').select('United States')
    cy.get('[data-qa="state"]').type(user.state)
    cy.get('[data-qa="city"]').type(user.city)
    cy.get('[data-qa="zipcode"]').type(user.zipcode)
    cy.get('[data-qa="mobile_number"]').type(user.mobileNumber)

    cy.get('[data-qa="create-account"]').click()
    cy.contains('Account Created!').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()

    cy.contains(`Logged in as ${user.name}`).should('be.visible')
}

export const loginUser = (user, userPassword = password) => {
    openLoginPage()

    cy.get('[data-qa="login-email"]').type(user.email)
    cy.get('[data-qa="login-password"]').type(userPassword)
    cy.get('[data-qa="login-button"]').click()

    cy.contains(`Logged in as ${user.name}`).should('be.visible')
}

export const logoutUser = () => {
    cy.get('a[href*="logout"]').click()
}

export const deleteAccount = () => {
    cy.contains('Delete Account').click()
    cy.contains('Account Deleted!').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
}

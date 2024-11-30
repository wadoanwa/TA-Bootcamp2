export default class LoginPage{
    static verifyLoginPage(){
        return cy.get('h5').contains('Login');
    }
    static inputUserName(){
        return cy.get('[name="username"]');
    }
    static inputPassword(){
        return cy.get('[name="password"]');
    }
    static ButtonLogin(){
        return cy.get('[type="submit"]');
    }
    static DasboardLogin(){
        return cy.get('h6').contains('Dashboard');
    }
    static visit(){
        return cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }
    static KredensialMessage(){
        return cy.get('.oxd-alert').should('contain', 'Invalid credentials');
    }
    static BlankMessage(){
        return cy.get('.oxd-text').should('contain', 'Required');
    }
}
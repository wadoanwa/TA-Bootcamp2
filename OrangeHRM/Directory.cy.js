// Tugas Akhir Quality Assurance Engineer Batch2 
// Fitur Menu Directory pada WebSite OrangeHRM

import LoginPage from "../../../POM/Login/POMLogin.cy";
import DirectoryPage from "../../../POM/Login/POMDirectory.cy";

describe('Menu Directory Feature', () => {
   
    //Menu Directory
    it('Menu Directory Feature', () => {
        // Kunjungi halaman login
        LoginPage.visit();
        LoginPage.verifyLoginPage().should('have.text','Login');
        LoginPage.inputUserName().type('Admin');
        LoginPage.inputPassword().type('admin123');
        cy.intercept('get','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionsummury');
        LoginPage.ButtonLogin().click();
        cy.wait('@actionsummury');

        // Verifikasi bahwa login berhasil dan diarahkan ke halaman Dashboard
        LoginPage.DasboardLogin().should('have.text','Dashboard');    
        cy.url().should('include', '/web/index.php/dashboard/index');

        cy.intercept('GET', '**/api/v2/directory/employees?limit=14&offset=0').as('haldirectory');
        // Klik link "Directory" untuk menuju halaman Menu Directory
        cy.contains('Directory').click();
        cy.wait('@haldirectory');

        // Verifikasi bahwa halaman Directory terbuka
        cy.get('.oxd-topbar').should('contain', 'Directory');

        cy.get('[placeholder="Type for hints..."]').type('Peter');
        DirectoryPage.isilistbox().contains('Peter Mac Anderson').click();

        DirectoryPage.pilihbox().eq(0).click();
        DirectoryPage.isilistbox().contains('Chief Financial Officer').click();
        
        DirectoryPage.pilihbox().eq(1).click();
        DirectoryPage.isilistbox().contains('New York Sales Office').click();

        cy.intercept('GET', '**/api/v2/directory/employees?limit=14&offset=0&locationId=2&empNumber=3&jobTitleId=2').as('employe');
        cy.get('[type="submit"]').click();
        cy.wait('@employe');

        DirectoryPage.verifyemploye().contains('Peter Mac Anderson');
        DirectoryPage.verifyemploye().contains('Chief Financial Officer');
        DirectoryPage.verifyemploye().contains('New York Sales Office');

    });

});
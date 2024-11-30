// Tugas Akhir Quality Assurance Engineer Batch2 
// Fitur Forgot Password pada WebSite OrangeHRM

import LoginPage from "../../../POM/Login/POMLogin.cy";

describe(' Test Feature Forgot Your Password ', () => {
    
    //Menu Forgot Your Password
    it(' Form reset password page', () => {
        // Kunjungi halaman login
        LoginPage.visit();
        LoginPage.verifyLoginPage().should('have.text','Login');

        // Klik link "Forgot your password?" untuk menuju halaman reset password
        cy.contains('Forgot your password?').click();

        // Verifikasi bahwa halaman menampilkan Form Reset Password
        cy.get('.oxd-text').should('contain', 'Reset Password');

        // Verifikasi bahwa berhasil dan diarahkan ke halaman Reset Password
        cy.url().should('include', '/requestPasswordResetCode');

        // Intercept permintaan reset password yang dikirim ke server
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('resetPasswordRequest');

        LoginPage.inputUserName().type('Admin');

        // Klik tombol Reset Password
        cy.get('button[type="submit"]').contains('Reset Password').click();

        // Menunggu hingga permintaan GET untuk reset password selesai
        cy.wait('@resetPasswordRequest');

        
        // Verifikasi bahwa halaman menampilkan pesan sukses setelah reset password
        cy.get('.oxd-text').should('contain', 'Reset Password link sent successfully');
    });

    it(' Batal reset password page', () => {
        // Kunjungi halaman login
        LoginPage.visit();
        LoginPage.verifyLoginPage().should('have.text','Login');

        // Klik link "Forgot your password?" untuk menuju halaman reset password
        cy.contains('Forgot your password?').click();

        // Verifikasi bahwa halaman menampilkan Form Reset Password
        cy.get('.oxd-text').should('contain', 'Reset Password');

        // Verifikasi bahwa berhasil dan diarahkan ke halaman Reset Password
        cy.url().should('include', '/requestPasswordResetCode');
        LoginPage.inputUserName().type('Admin');

        // Klik tombol 'Cancel' untuk membatalkan reset password
        cy.contains('Cancel').click();

        // Verifikasi kembali kehalaman login
        cy.url().should('include', '/auth/login');
        LoginPage.verifyLoginPage().should('have.text','Login');
    });




});
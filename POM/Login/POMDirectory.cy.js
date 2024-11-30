export default class DirectoryPage{
    
    static pilihbox(){
        return cy.get('.oxd-select-text-input');
    }

    static isilistbox(){
        return cy.get('[role="listbox"]');
    }

    static verifyemploye(){
        return cy.get('p');
    }

}
/// <reference types="cypress" />


describe('template spec', () => {
  it('passes', () => {
    //baseUrl มาจาก cypress.config.ts
    cy.visit('baseUrl');
    cy.get('body > ngx-app > ngx-pages > ngx-one-column-layout > nb-layout > div > div > div > nb-sidebar > div > div > nb-menu > ul > li.menu-item.ng-tns-c7-4.ng-star-inserted > a > span')
    .click();
    cy.get('body > ngx-app > ngx-pages > ngx-one-column-layout > nb-layout > div > div > div > nb-sidebar > div > div > nb-menu > ul > li.menu-item.ng-tns-c7-4.ng-star-inserted > ul > li.menu-item.ng-tns-c7-5.ng-tns-c7-4.ng-star-inserted > a > span')
    .click();
    cy.get('input[ng-reflect-full-width][placeholder="Jane Doe"]')
    cy.get('[data-cy="imputEmail1"]')
    .type('HIHi');
    cy.wait(3000);
  })

  it('second test', () => {
     // code here
     cy.visit('/');
     cy.contains('Forms').click();
     cy.contains('Form Layouts').click();
     cy.contains('Sign in');
     cy.contains('[status="warning"]','Sign in');
     cy.contains('nb-card','Horizontal form');
     cy.contains('nb-card','Horizontal form')
        .find('input#inputEmail3')
        .type('Nice');
    });

  it('save subj. of the command', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();
    // ❌
    // const usingGrid = cy.contains('nb-card','Using the Grid');
    // usingGrid.find('label[for="inputEmail1"]').should('contain','Email');
    // usingGrid.find('label[for="inputPassword2"]').should('contain','Password');

    //1️⃣ Cypres Alias
    cy.contains('nb-card','Using the Grid').as('usingGrid');
    cy.get('@usingGrid').should('contain','Email');
    cy.get('@usingGrid').should('contain','Password');
    
    //2️⃣ Cypress then() Method
    cy.contains('nb-card','Using the Grid').then((usingGridForm) => {
      cy.wrap(usingGridForm).find('[for="inputEmail1"]').should('contain','Email');
      cy.wrap(usingGridForm).find('[for="inputPassword2"]').should('contain','Password');
    });
  });


  it('exract text values', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    // 1️⃣ ใช้ cypress syntax นี้แหละหา text
    cy.get('[for="exampleInputEmail1"]').should('contain','Email address');

    // 2️⃣ ใช้ jQuery เทียบได้เป็น object value
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      const labelText = label.text();
      expect(labelText).to.equal('Email address');
      // cy.wrap(labelText).should('contain','Email address');
    });

    //3️⃣ ใช้ invoke() ซึ่งได้ pure text (ในthenใช้ chai js)
    cy.get('[for="exampleInputEmail1"]').invoke('text').then((text) => {
        expect(text).to.equal('Email address');
      }
    );
    cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelText_aka').should('contain','Email address');
    
    //4️⃣ ใช้ invoke()โดยเข้าถึง attr ของ html (ในตัวอย่างหา attrในclass ชื่อ label)
    cy.get('[for="exampleInputEmail1"]').invoke('attr','class').then((classValue) => {
        expect(classValue).to.equal('label');
      }
    );
    // 5️⃣ invoke property
    cy.get('#exampleInputEmail1').type('test@test.com');
    cy.get('#exampleInputEmail1').invoke('prop','value').as('ExInputEmail1_aka').should('contain','test@test.com');
    cy.get('@ExInputEmail1_aka').then((value) => {
      expect(value).to.equal('test@test.com');
      }
    );
  });

  it('onlyRadio', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();
    //cy.contains('nb-card','Using the Grid').find(`input[type="radio"]`).eq(0).check({force:true}).should('be.checked');
    cy.contains('nb-card','Using the Grid').find(`input[type="radio"]`).then($radio_btn =>{
      cy.wrap($radio_btn).eq(0).check({force:true}).should('be.checked');
      cy.wrap($radio_btn).eq(1).should('not.be.checked');
      cy.wrap($radio_btn).eq(2).should('be.disabled');

    })
  });

  it('checkboxes', () => {
    cy.visit('/');
    cy.contains('Modal & Overlays').click();
    cy.contains('Toastr').click(); 
    cy.contains('nb-card-header','Toaster configuration').next().find(`input[type="checkbox"]`).then($radio=>{
      cy.wrap($radio).eq(0).uncheck({force:true})
    })
  });


  it('Date picker', () => {
    cy.visit('baseUrl');
    cy.contains('Forms').click();
    cy.contains('Datepicker').click();
    cy.contains('nb-card-header','Common Datepicker').next().find('input[placeholder="Form Picker"]').then($date=>{
      // cy.wrap($date).type('2025-04-22')
      cy.wrap($date).click();
      cy.get('.day-cell').not('.bounding-month').contains('21').click();
      cy.wrap($date).should('contain','21/04/22')
    });  

  });

  it('Date_picker by udemy ', () => {
      // recursive function --loopโดยเรียกฟังก์ชันเอง ใช้ได้เฉพาะวันอนาคต
      function selectDayFromCurrent($day) {
        let date = new Date();
        date.setDate(date.getDate()+$day);
        let futureDay = date.getDate();
        let futureMonth = date.toLocaleDateString('en-US',{month:'short'});
        let futureYear = date.getFullYear();
        let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`;

        cy.get('nb-calendar-navigation,ng-reflect-date').invoke('attr','ng-reflect-date').then(dateAttr =>{
          if(!dateAttr.includes(futureMonth) ||!dateAttr.includes(futureYear)){
            cy.get('[data-name="chevron-right"]').click();
            selectDayFromCurrent($day);
          }
          else{
            cy.get('.day-cell').not('.bounding-month').contains(futureDay).click();
          }
        })
        return dateToAssert;
      }

      cy.visit('/');
      cy.contains('Forms').click();
      cy.contains('Datepicker').click();

      cy.contains('nb-card','Common Datepicker').find('input').then(($input) =>{
        cy.wrap($input).click();
        const $dateToAssert$ = selectDayFromCurrent(55);
        cy.wrap($input).invoke('prop','value').should('contain',$dateToAssert$);
        cy.wrap($input).should('have.value',$dateToAssert$);
      });
  //--end it
  });
  it('Lists and Dropdowns', () => {
    cy.visit('/');
    cy.get('nb-layout-header').find('nb-select').click();
    // ไม่ได้เขียนเหมือนเขา กูเขียนเอง
    cy.get('ul.options-list').children().then($dropdown =>{
        cy.log(`🚩length by jquery is :`+$dropdown.length)
        cy.get($dropdown).each((list_item,index)=>{
          const itemText = list_item.text().trim();
          cy.log(index);
          cy.get(list_item).click();
          cy.get('nb-layout-header').find('nb-select').should('contain',itemText);
          if (index < $dropdown.length-1) {
            cy.get('nb-layout-header').find('nb-select').click();
          }
        });
    });

  //--end it
  });

  it.only('Select Table', () => {
    cy.visit('/');
    cy.contains('Tables & Data').click();
    cy.contains('Smart Table').click();
  });

  
})
'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('cesga-big-data-services app', function() {

  browser.get('index.html');

  it('should automatically redirect to /dashboard when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/dashboard");
  });


  describe('cloud services view', function() {

    beforeEach(function() {
      browser.get('index.html#/cloud');
    });


    it('should render cloud services when user navigates to /cloud', function() {
      expect(element.all(by.css('[ui-view] h1')).first().getText()).toMatch(/Cloud Services/);
    });

      // Check that there are 2 rows (title and services table)
      // Don't know why it retrieves 4
      var rows = element.all(by.css('[ui-view] .row'));
      expect(rows.count()).toEqual(4);

  });

  describe('bigdata services view', function() {

    beforeEach(function() {
      browser.get('index.html#/bigdata');
    });


    it('should render bigdata services when user navigates to /bigdata', function() {
      expect(element.all(by.css('[ui-view] h1')).first().getText()).toMatch(/Bigdata Services/);

      // Check that there are 3 rows (title, info and services table)
      var rows = element.all(by.css('[ui-view] .row'));
      expect(rows.count()).toEqual(3);


      // // Check the first row details
      // var firstRowRank = element(
      // by.repeater('service in BigdataCtrl.services')
      // .row(0).column('clustername'));
      // var firstRowName = element(
      // by.repeater('service in BigdataCtrl.services')
      // .row(0).column('num_nodes'));
      // expect(firstRowRank.isDisplayed()).toBe(true);
      // expect(firstRowName.isDisplayed()).toBe(true);
      // expect(firstRowRank.getText()).toEqual('My Slurm Cluster');
      // expect(firstRowName.getText()).toEqual('2');

    });

  });


});

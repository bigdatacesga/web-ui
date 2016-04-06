'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('hadoop-on-demand app', function() {

  browser.get('index.html');

  it('should automatically redirect to /dashboard when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/dashboard");
  });


  describe('clusters view', function() {

    beforeEach(function() {
      browser.get('index.html#/clusters');
    });


    it('should render clusters when user navigates to /clusters', function() {
      expect(element.all(by.css('[ui-view] h1')).first().getText()).
        toMatch(/Clusters/);
    });

  });


});

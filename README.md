# Hadoop on demand Portal

This project provides the web interface for the hadoop on demand REST API project.

The theme is based on the famous Free Bootstrap Theme [SB Admin v2.0 rewritten in AngularJS](https://github.com/start-angular/sb-admin-angular)

## Install Dependencies

```
npm install
```

## Run the Application

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.

## Prepare files for deployment
```
npm run dist
```

## Directory Layout

The project uses the directory layout suggested by [angular-seed](https://github.com/angular/angular-seed)

```
app/                    --> all of the source files for the application
  index.html            --> app layout file (the main html template file of the app)
  index-async.html      --> just like index.html, but loads js files asynchronously
  app.js                --> main application module
  app.css               --> default stylesheet
  assets/               --> app specific js and css files, not managed by bower
    js/                   --> app specific js files
    css/                  --> app specific css files
  components/           --> all app specific modules
    menu/               --> the menu directive
      menu.js                    --> menu directive that includes topbar and sidebar
      topbar/                    --> topbar directive
      sidebar/                   --> sidebar directive
    stats/              --> stats directive
    notifications/      --> notifications directive
    wizard_cluster      --> wizard cluster directive
  dashboard/            --> dashboard view template and logic
    dashboard.html        --> the partial template
    dashboard.js          --> the controller logic
    dashboard_test.js     --> tests of the controller
  clusters/             --> clusters view template and logic
    clusters.html         --> the partial template
    clusters.js           --> the controller logic
    clusters_test.js      --> tests of the controller
karma.conf.js         --> config file for running unit tests with Karma
e2e-tests/            --> end-to-end tests
  protractor-conf.js    --> Protractor config file
  scenarios.js          --> end-to-end scenarios to be run by Protractor
```

## Running Unit Tests

```
npm test
```

## Running end to end tests

First start the server:
```
npm start
```

Then in other console run:
```
npm run update-webdriver
npm run protractor
```

## Continuous Integration

### Travis CI

We use [Travis CI](http://travis-ci.org) continuous integration service.


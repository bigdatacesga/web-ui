CESGA Big Data Infrastructure
=======================

Big Data Services Web Portal - User Interface
=======================

This project provides the web interface for the services deployed as part of the hadoop on demand project (Cloud, OpenNebula) and the new Big Data services.

The theme is based on the famous Free Bootstrap Theme [SB Admin v2.0 rewritten in AngularJS](https://github.com/start-angular/sb-admin-angular)

## Install Dependencies

```
npm install
```

## Run the Application together with the REST service

To run the application including a proxy to connect to the REST service:
```
grunt server
```

Start the hadoop-on-demand-rest-jhipster [REST service](https://github.com/javicacheiro/hadoop-on-demand-rest-jhipster) on port 8080 for the cloud services running on OpenNebula.

Start the big-data-rest-api [REST service]() on port 8081 for the big data services running on the new infrastructure.

Now browse to the app at `http://localhost:9001/app/index.html`.

It is also possible to run the angularjs application in standalone mode (without the proxy) using:
```
npm start
```

In this case the app is accessible at `http://localhost:8000/app/index.html`.

## Prepare files for deployment
```
npm run dist
```

## Directory Layout

The project uses the directory layout suggested by [angular-seed](https://github.com/angular/angular-seed)

```
app/                                --> all of the source files for the application
  index.html                        --> app layout file (the main html template file of the app)
  index-async.html                  --> just like index.html, but loads js files asynchronously
  app.js                            --> main application module
  app.css                           --> default stylesheet
  assets/                           --> app specific js and css files, not managed by bower
    js/                               --> app specific js files
    css/                              --> app specific css files
  components/                       --> all app specific modules
    menu/                           --> the menu directive
      menu.js                                --> menu directive that includes topbar and sidebar
      topbar/                                --> topbar directive
      sidebar/                               --> sidebar directive
    stats/                          --> stats directive
    notifications/                  --> notifications directive
    wizard_cluster                  --> wizard cluster directive
    endpoints/                      --> logic to implement the REST calls for all services
  dashboard/                        --> dashboard view template and logic
    dashboard.html                    --> the partial template
    dashboard.js                      --> the controller logic
    dashboard_test.js                 --> tests of the controller
  cloud_services/                   --> cloud services (OpenNebula)
    partials/                           --> elements to implement the "launch a cloud service" wizard
    cloud_services.html                         --> the partial template
    cloud_services.js                           --> the controller logic
  bigdata_services/               --> multi node services view template and logic
    partials/                           --> elements to implement the "launch a multi service" wizard
    bigdata_services.html                     --> the partial template
    bigdata_services.js                       --> the controller logic
    bigdata_services.js                       --> tests of the controller
karma.conf.js                     --> config file for running unit tests with Karma
e2e-tests/                        --> end-to-end tests
  protractor-conf.js                --> Protractor config file
  scenarios.js                      --> end-to-end scenarios to be run by Protractor
  
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


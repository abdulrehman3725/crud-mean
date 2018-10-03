[![Build Status](https://travis-ci.org/angular/angular.svg?branch=master)](https://travis-ci.org/angular/angular)
[![npm version](https://badge.fury.io/js/%40angular%2Fcore.svg)](https://www.npmjs.com/@angular/core)

# crud-mean

### MEAN Stack CRUD Operations - MEAN Stack Beginners Tutorial
https://www.youtube.com/watch?v=UYh6EvpQquw

### Angular 5 User Registration With Web API
https://www.youtube.com/watch?v=h85_GT62K6A

### Angular 5 - Login and Logout with Web API using Token Based Authentication:
https://www.youtube.com/watch?v=e8BlURn6SFk

### Node.js + MySQL CRUD - GET,POST,PUT and DELETE
https://www.youtube.com/watch?v=4fWWn2Pe2M

# Create Connection with MONGO

To use mongodb you must install mongodb on your windows.
In order to do this, you have to follow this link: 
https://www.mongodb.com/download-center#community

After installing do this:
If you have installed mongodb in c: drive then run the following command in cmd
```
cd C:\Program Files\MongoDB\Server\3.4\bin
Create a folder  ‘data ‘ in your node js project folder and after that run the following command:
mongod.exe --dbpath F:\Project Path\data
```
Now your connection would be created successfully.

Source: http://blog.gvm-it.eu/post/20462477195/getting-started-with-mongodb-and-nodejs-on


https://zapier.com/engineering/apikey-oauth-jwt/ (Read this in order to understand which technique is used for which purpose then read the following links)
# PASSPORT LIBRARY
http://www.passportjs.org/docs/downloads/html/ (This contains the most popular strategies for authentication for login or Api’s)

OAuth2orize Strategy
https://medium.com/@henslejoseph/building-a-restful-api-with-node-oauth2-server-4236c134be4 (This example and below link is complete guideline to understand OAuth2orize Strategy Rest of the links are for understanding the flow. You must read all of them.)
https://rwlive.wordpress.com/2014/05/26/oauth2-authorization-grant-flow-using-oauth2orize-express-4-and-mongojs/ (This example is in the form of frontend & backend. You should check this to in order to understand the flow of OAuth2orize.
This package you will use to install oauth2orize: https://www.npmjs.com/package/oauth2orize , https://github.com/jaredhanson/oauth2orize
See screenshot OAuthFlow in this folder
https://github.com/gerges-beshay/oauth2orize-examples (must read to understand)
https://github.com/reneweb/oauth2orize_authorization_grant_example(must read to understand)
Basic Auth Strategy Intro
https://codequs.com/p/BkjN5PGa2/building-a-restful-api-with-node-passport/
Digest Auth Strategy 
Digest strategy is explained in passport library which is mentioned above. 
NOTE: For basic auth and digest auth strategy  you have to use the following authorization in postman:

# Api Secure With JWT
### Read this first then use second one for refreshing token technique
https://github.com/auth0/node-jsonwebtoken
https://solidgeargroup.com/refresh-token-with-jwt-authentication-node-js (For Refereshing Token (Recommended Approach))
Source Code: This project code is done in crud-mean/nodejs

### Video: 
1.	Node.js API Authentication With JWT – YouTube (in the folder)
2.	 https://www.youtube.com/watch?v=B8suR11BtXg

# Basic Authorization
https://prntscr.com/l1dqe3

# DIGEST AUTHORIZATION
https://prntscr.com/l1drb9

# For Materialize CSS

## This is the Crud Mean project with Api's Authentication.

=>sCLI projects in angular 6 onwards uses angular.json instead of .angular-cli.json for build and project configuration. That implies you are using Angular 6. 
As of v6, the location of the file has changed to angular.json. Since there is no longer a leading dot, the file is no longer hidden by default and is on the same level. which also means that file paths in angular.json should not contain leading dots and slash i.e you should provide an absolute path 

# Install MaterializeCSS and angular2-materialize from npm

```
 npm install materialize-css --save 
 npm install angular2-materialize --save 
 npm install jquery@^2.2.4 --save
 npm install hammerjs --save
```
After installing all the required dependencies add them to styles and scripts array of angular.json
=============================================
```
"styles": [

      "src/styles.css",
      "node_modules/materialize-css/dist/css/materialize.css"
],
"scripts": [
      "node_modules/jquery/dist/jquery.js",
       "node_modules/hammerjs/hammer.js",
       "node_modules/materialize-css/dist/js/materialize.js"
 ]
 
 ```
===================================================
# Import in appComponent.ts

```
import {ViewChild, ElementRef} from '@angular/core';
import * as M from "materialize-css/dist/js/materialize";

Then add your js or jquery code in ngOnInit
Example:

 ngOnInit()
  {
    $(".dropdown-trigger").dropdown();
  }
 ```
======================================================

# Sources:
==========

https://stackoverflow.com/questions/50842115/how-to-use-external-js-files-in-angular-6/50842454
https://stackoverflow.com/questions/48007665/how-to-use-materialize-css-with-angular

# Listing UI

Is a data analysis and interpretation tool.  It gives access to all data collected using angular 4.0.0 and [PrimeNG](https://github.com/primefaces/primeng) dataTables and offers several filtering and viewing options.

develop Backend using JEE standars. and documented via Swagger (we cannot share because is a part of a big project).
Manipulate UI events and API responses, on the Web with [RxJS](https://github.com/ReactiveX/rxjs).

Implemente Ui Component using third party libraries PrimeNG.

## Install Dependecies
Run `npm install` to install all dependecies before running project.

## Folder Structure

After Clonnig and installing dependencies, project should look like this:

```
node_modules/
src/
 app/

    **colonne-module/**
        components/
            add-forms/
                add-forms.component.html
                add-forms.component.ts
            details/
                details.component.html
                details.component.ts
            edit-modal/
                edit-modal.component.html
                edit-modal.component.ts
            internal-colonne/
                internal-colonne.component.html
                internal-colonne.component.ts
            colonne.component.html
            colonne.component.ts
        index.component.html
        index.component.ts
        rapport.module.ts

    **rapports-module/**
        components/
            add-forms/
                add-forms.component.html
                add-forms.component.ts
            rapport-list.component.html
            rapport-list.component.ts
        index.component.html
        index.component.ts
        rapport.module.ts

    **service/**
        generic.service.ts
        colonne.service.ts
        rapports.service.ts

    **shared/**
        components/
            shared-table.component.html
            shared-table.component.ts
        models/
            colonne.ts
            internal-colonne.ts
            rapports.ts
            table-params.ts
        services/
            shared.service.ts 
        shared.module.ts

    app.component.css
    app.component.html
    app.component.js
    app.module.ts
    configuration.ts
 assets/
 environements/
 main.ts
 favico.ico
 index.html
 polyfills.ts
 style.css
 test.ts
 tsconfig.app.json
 typings.d.ts
package.json
README.md
tsconfig.json
karma.conf.js
angular-cli.json
```

For the project to build, **these files must exist with exact filenames**:

* `shared/components/shared-table.components` is a generic table data-table component build on top of PrimeNg data-table, it accept in input a data Object and `models/table-params` Object for config.
* `shared/components/shared-service.components` is a logical service that containe static reusable methods.

* `service/generic.service` is a generic service containes all HTTP metode patch,post,get.. and is inherted by all madel service (rapport and colonne services).
* `src/index.js` is the JavaScript entry point.


## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.



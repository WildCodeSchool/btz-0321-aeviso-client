# AE Viso - Client project

Front-en app: Wild Code School project #3

Team:  
 -Aeryle: https://github.com/Aeryle  
 -Chabelle78: https://github.com/Chabelle78  
 -ThomasBarrial: https://github.com/ThomasBarrial  
 -MatthiasWanner: https://github.com/MatthiasWanner  
 -Benwade-progldc: https://github.com/Benwade-prog

THIS APP ONLY WORKS WITH API: https://github.com/WildCodeSchool/btz-0321-aeviso-api

## Description of the project

As part of our wildcode training, we have the pleasure to present our last project of the session. The main goal of this webapp is to report the search & development working hours from company's collaborators. And then we send the data to an accounting firm who is the project holder. This data allows a company to obtain a specific legal status which then allows them to have a reduced taxation.

Our goal is to create interfaces that are fast and easy to use. In order to optimize the working time and help companies to receive their juridic status.

How the application works :

3 users / 3 different roles / 3 different interfaces

Role 1 : SUPERADMIN if you login as a superadmin you will access to the accounting firm interface.

Role 2 : ADMIN if you login as a admin you will access to the R&D manager interface.

Role 3 : USER if you login as user you will access to the collaborators interface.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

`VITE_API_URL=url-of-the-api`

## Setup

Don't forget to run the API before start the client : https://github.com/WildCodeSchool/btz-0321-aeviso-api

- run `$ git clone https://github.com/WildCodeSchool/btz-0321-aeviso-client.git` in your terminal
- run `$ cd btz-0321-aeviso-client`
- run `npm install `

## First Logging

Use the USER_EMAIL and USER_PASSWORD in the Environment Variables from the API to log you in.

## Development

Run development server

- run `npm run dev`

## Production

Build the project

- run `npm run build`

## ES lint

Run ES lint checks

- run `npm run lint`

## Build preview

Run Project in preview mode

```bash
  npm run serve
```

## Librairy used

- React hook form : https://react-hook-form.com/
- React Query : https://react-query.tanstack.com/
- Axios : https://axios-http.com/docs/intro
- React Calendar : https://www.npmjs.com/package/react-calendar

## Current issues reported

. TypeScript Environment Variables for the API requests.  
Localisation : /scr/API/request.ts  
Issues:  
Currently there is a conflict between TypeScript and vite.js for this environment variables.  
We have temporarily fixed the problem by ignoring the Typescript error on the affected line.

Don't worry, all requests work well !!!

Looking forward to an update from vite.js

. Improve the redux dispatch interfaces. You can observe TODO taggs on the affected line.

. 401 Error Landing page.  
When you run the landing page of the app, the API verifies your token, but your are not logged in yet, so the backend will send you an 401 Unauthorized Error and ask you to log in.

Once you are logged in, the error goes away.

. UX issue on the navigation sidebar  
Currently, if you click on a button in the interfaces to change a component by a link method, the sidebar design doesn't update. The Url changes but the sideBar doesn't !

. SUPERADMIN / UX issue : "CreateUpdateCompanyForm" component

If you try to create a new job for one of the company's administrator, you will arrive on the job component.
Then, if you click on the return button you will be redirected to the companies list instead of the form.

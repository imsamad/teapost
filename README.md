# TEAPOST

## DEMO

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Front-End](https://teapost.verel.app)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Back-End](https://teapost.herokuapp.com)

A News Portal web app

## Features

- **Reader**

  - can read news, comment, like or dislike and share news.

  - can add stories/news to \*\*Reading collection\*\* like YouTube playlist.

  - can follow authors and when following author publish story/news followers would be notified.

- **Author**

  - can write stories in **_collaboration_** with other authors.

  - can write stories in steps, instance at each step would be saved in history timeline of story where author can reference back like in Github.

---

## Tech Used

- **Language** - TypeScript
- **Front-End** - NextJS, Formik, ChakraUI, SWR, Sun-Editor
- **Back-End** - Express,Yup(Validation)
- **DBMS** - MongoDB
- **Assets Management** - Cloudinary
- **Hosting** - Heroku, Vercel

## How to use

1.) Install Deps

```sh
npm run bootup
```

3.) Set Config (Optional)

> _This step is optional, if you want to use localhost of MongoDB & No Email service provider And No Cloudinary .envs_

2.) Run data seeder

Create minimum essential data to kickstart app

```sh
npm run seed:k
```

<center>OR</center>

Create High Volume Data, This may take time

```sh
npm run seed:i
```

2.) Run dev server

```sh
npm run dev
```

---

**TODOS**

- Testing
- GraphQL-ise

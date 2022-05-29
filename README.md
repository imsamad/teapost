# TEAPOST - News Portal Web App

## DEMO

<table  width="100%"  >
<tr>
<td>
<a href="https://teapost.vercel.app" target="_blank" >Frontend</a>
</td>
<td><a href="https://teapost.herokuapp.com" target="_blank" >Backend</a>
</td>
</tr> 
</table>

## Features

- **Reader**

  - can read news, comment, like or dislike and share news.

  - can add stories/news to **Reading collection** like YouTube playlist.

  - can follow authors and when following author publish story/news followers would be notified.

- **Author**

  - can write stories in **_collaboration_** with other authors.

  - can write stories in steps, instance at each step would be saved in history timeline of story where author can reference back like in Github.

---

## Tech Used

- **Stack**- MERN
- **Language** - TypeScript
- **Front-End** - NextJS, Formik, ChakraUI, SWR, Sun-Editor
- **Back-End** - Express, Yup(Validation), JWT
- **DBMS** - MongoDB
- **Assets Management** - Cloudinary
- **Hosting** - Heroku, Vercel

## How to use

1.) Install Deps

```sh
npm run bootup
```

2.) Set Config (Optional)

To use default config

```sh
npm run mvConfig
```

<p align='center'>OR</p>

Set .env vars at

```sh
cd app/client/.env
cd app/server/config/.env
```

<!-- > _This step is optional, if you want to use localhost of MongoDB & No Email service provider And No Cloudinary .envs_ -->

3.) Run data seeder

Create minimum essential data to kickstart app

```sh
npm run seed:k
```

<p align='center'>OR</p>

Create High Volume Data, This may take time

```sh
npm run seed:i
```

4.) Run dev server

```sh
npm run dev
```

App ready On

<table  width="100%"  >
<tr>
<td>Frontend
</td><td>Backend
</td>
</tr>
<tr>
<td><a href="http://localhost:3000" target="_blank" >localhost:3000</a>
</td><td><a href="http://localhost:4000" target="_blank" >localhost:4000</a>
</td>
</tr>
</table>

---

**TODOS**

- Testing
- GraphQL-ise

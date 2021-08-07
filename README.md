<p align='center'>
  <img src='frontend/src/assets/unwined_logo_large.png' >
</p>

# Unwined
Unwined is a fullstack React App made with a Redux state manager and a backend using Node/Express, Sequelize, and Postgres. 

* View the <a href='https://unwined-wine-app.herokuapp.com/'>Unwined App</a> Live
* It is modeled after the <a href='https://untappd.com/'>Untappd</a>

Instead of finding and rating beers, the app helps users discover and rate new wines.

* Reference to the <a href='https://www.github.com/nicopierson/unwined/wiki'>Unwined wiki docs</a>

## Table of Contents

  * [Features](#features)
  * [Contact](#contact)
  * [Special Thanks](#special-thanks)
  
## Features

### Splash Page
![Splash Page](./readme_assets/splash_page.png)

### Sign In and Sign Up
![Sign Up](./readme_assets/sign_up.png)
![Sign In](./readme_assets/sign_in.png)

### Add Wine
![Add Wine](./readme_assets/add_wine.png)

### Edit Wine
![Edit Wine](./readme_assets/edit_wine.png)

### Dashboard
![Dashboard](./readme_assets/dashboard.png)

### Check In
![Check In](./readme_assets/check_in.png)

### Check In Edit and Delete
![Check In Edit Delete](./readme_assets/check_in_edit.png)

## Technologies
* [PostgresSQL](https://www.postgresql.org/)
* [Sequelize](https://sequelize.org/)
* [Express.js](https://expressjs.com/)
* [Node.js](https://nodejs.org/)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* CSS3

## Installation

1. Clone this repository

```javascript
git clone https://github.com/nicopierson/unwined.git
```

2. Install npm dependencies for both the `/frontend` and `/backend`

```javascript
npm install
```

3. In the `/backend` directory, create a `.env` based on the `.env.example` with proper settings
4. Setup your PostgreSQL user, password and database and ensure it matches your `.env` file
5. Run migrations and seeds in the `/backend`

```javascript
npx dotenv sequelize db:create
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```

6. Start both the backend and frontend

```javascript
npm start
```

## Contact

* [Email](mailto:nicogpt@gmail.com)
* [LinkedIn](https://www.linkedin.com/in/nico-pierson/)
* [AngelList]()
* [Github](https://github.com/nicopierson)

## Special Thanks
* Fellow peers who have given me support and community: [Andrew](https://github.com/andru17urdna), [Henry](https://github.com/hnrywltn), [Pierre](https://github.com/TheGuilbotine), [Lema](https://github.com/lemlooma), [Meagan](https://github.com/meagan13), [Simon](https://github.com/Simonvargas), [Michelle](https://github.com/michellekontoff), and [John](https://github.com/Jomix-13)
* Mentors who have given me their time and effort: [JD](https://github.com/jdrichardstech), [Peter](https://github.com/Lazytangent), [Thanh](https://github.com/tawnthanh), [William](https://github.com/WJVincent), and [Javier](https://github.com/javiermortiz) 
* My partner: Thayse

# boonafide
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/d3063bad3df7460caa6f37f021f1d10e)](https://www.codacy.com/gh/aemartos/boonafide/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=aemartos/boonafide&amp;utm_campaign=Badge_Grade)

### [https://boonafide.onrender.com/](https://boonafide.onrender.com/)
*"When someone does you a big favor, don't pay it back... PAY IT FORWARD!"*
Change the world through a "favors chain". A person must perform or help three people in a disinterested way. They also have to help three others and so on, until a favors chain, that improves the lives of citizens, is spread around the world.

## Usage
Boonafide is a social webapp to exchange favors. You can create favors (offer or need), specifying day and time, and other users will ask you for a favor or offer you what's needed. When you do 3 favors, them became into 1 boon (app coin). With the boons you can ask for favors.
#### Blockchain philosophy
- Person X does one favor to 3 people.
- Those 3 people verify the favor.
- Person X gain 1 boon.
- Person X can donate the boon to the IBO (initial boon offering) or ask for a favor to other person.
- Person X and those others, who received a favor, do infinite altruistic gestures.

#### CAN
- Favors transit (cession of boon).
- Ask for favors (donation of 1 boon to ibo).
- Offer favors (you receive 1/3 favors to gain 1 boon).

#### CAN NOT
- Buy or sell favors or boons.
- Change 1 favor for several favors.
- Change 1 favor for several boons.
- Change 1 boon for several favors.

## Principles
1. Unlimited favors. 3 favors = 1 boon.
2. Individual boon and favor creation, with receiver verification.
3. Non speculative coins or favors. [1 favor === 1 favor.  1 boon === 1 boon.] (No matter the value of the good or service received)
4. Non-fractionable coin. 1 boon === 1 boon.
5. Non censurable, nobody can prevent the chain.
6. Pseudoanonymous, no real identification is required.
7. Non interchangeable boons or favors.
8. Irreversible favors. Favor can not be modified.
9. Obligatory. Favor offered, favor granted.

## Development
Technologies used in development: React, Redux, MongoDB, Express, Node.js, JavaScript, ES6, HTML5, CSS3, SASS and @emotion.

## Software requirements
This webapp is based on a JavaScript environment and Mongo database. In order to run the project the following requirements must be installed:

- node.js (v14.20.0)
- npm (6.14.13)

## How to install
Copy repository:

```bash
git clone https://github.com/aemartos/boonafide
```
###### Client
```bash
$ cd client
$ npm i
$ npm start
```
###### Server
```bash
$ cd server
$ npm i
$ npm run dev
```

#### docker-compose

###### Build
To create the build for the entire application, we need to run the following command:
```bash
$ docker-compose build
```

###### Starting the services

**Option 1: Run without MongoDB (client + server only)**
```bash
$ docker-compose up
```

**Option 2: Run with MongoDB (full stack)**
```bash
$ docker-compose --profile database up
# or
$ docker-compose --profile full up
```

**Option 3: Run only specific services**
```bash
# Only client and server
$ docker-compose up client server

# Only MongoDB
$ docker-compose --profile database up mongo

# Only client
$ docker-compose up client
```

| App            | URL                      |
|:---------------|:-------------------------|
| Client App     | `http://localhost:3000`  |
| Backend Server | `http://localhost:3001`  |
| MongoDB        | `http://localhost:27017` (only when using database profile) |

###### Maintenance & Inspection
We can inspect running services using the following command:
```bash
$ docker-compose ps
```

To dump the logs of all the running services:
```bash
$ docker-compose logs
```

To follow logs of a specific service:
```bash
$ docker-compose logs -f [service_name]
```

###### Stopping the containers
To stop all the services:
```bash
$ docker-compose stop
```

To bring everything down and remove the containers entirely, with the data volume of the services:
```bash
$ docker-compose down --volumes
```

**Note**: MongoDB data is persisted in a Docker volume (`mongo-data`). Use `docker-compose down -v` to completely remove all data.

###### Database Seeding
When running with MongoDB, you may need to seed the database with initial data:

**Option 1: Using Docker MongoDB**
```bash
# Run MongoDB with database profile
$ docker-compose --profile database up mongo

# In another terminal, run the seeding script
$ docker-compose exec server node bin/seeds.js
```

**Option 2: Using External MongoDB**
```bash
# Make sure your server is running and connected to your external MongoDB
$ docker-compose up server

# In another terminal, run the seeding script
$ docker-compose exec server node bin/seeds.js
```

**Option 3: Local Development (without Docker)**
```bash
# Navigate to server directory
$ cd server

# Install dependencies (if not already done)
$ npm install

# Run the seeding script
$ node bin/seeds.js
```

This will create the necessary Bank user and other initial data required for the application to function properly.

#### Environment variables
You have to create a `.env` file, where you must specify this variables:

| Key           | Description |
|:-------------|:-------------|
| DBURL | database URL (`mongodb://mongo:27017/test` with docker-compose, or your external MongoDB URL) |
| CLOUDINARY_NAME | the name of your Cloudinary account. Used to build the public URL for the media assets. |
| CLOUDINARY_KEY | used together with the API secret to communicate with the Cloudinary API and sign requests. |
| CLOUDINARY_SECRET | used together with the API key to communicate with the Cloudinary API and sign requests. |

Cloudinary hosting [configuration link](https://cloudinary.com/documentation/solution_overview#account_and_api_setup).

## License

Boonafide is available under [MIT License](./LICENSE).
boonafide©2019 by [anæstrada](https://www.linkedin.com/in/aemartos/).

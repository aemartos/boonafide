# boonafide
<!---
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/032683a5d73b414688fbf6fb6967d909)](https://www.codacy.com/app/aemartos/boonafide?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=aemartos/boonafide&amp;utm_campaign=Badge_Grade)
-->
### [https://boonafide.herokuapp.com/](https://boonafide.herokuapp.com/)
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
To start the multi-container system using the following simple command:
```bash
$ docker-compose up
```

| App            | URL                      |
|:---------------|:-------------------------|
| Client App     | `http://localhost:3000`  |
| Backend Server | `http://localhost:3001`  |
| MongoDB        | `http://localhost:27017` |

###### Maintenance & Inspection
We can inspect running services using the following command:
```bash
$ docker-compose ps
```

To dump the logs of all the running services:
```bash
$ docker-compose logs
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

#### Environment variables
You have to create a `.env` file, where you must specify this variables:

| Key           | Description |
|:-------------|:-------------|
| DBURL | database URL (`mongodb://mongo:27017/test` with docker-compose) |
| CLOUDINARY_NAME | the name of your Cloudinary account. Used to build the public URL for the media assets. |
| CLOUDINARY_KEY | used together with the API secret to communicate with the Cloudinary API and sign requests. |
| CLOUDINARY_SECRET | used together with the API key to communicate with the Cloudinary API and sign requests. |

Cloudinary hosting [configuration link](https://cloudinary.com/documentation/solution_overview#account_and_api_setup).

## License

Boonafide is available under [MIT License](./LICENSE).
boonafide©2019 by [anæstrada](https://www.linkedin.com/in/aemartos/).

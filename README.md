# Spyfall

## Project Description
Spyfall is a social deduction game for 4+ players.
The original game was a boardgame. Since then, there have been several online iterations. The first version I ever played was spyfall.meteor.com back in 2014.


## Contributors
- Felix Wei

## Hosting
1. https://spyfall-flix.netlify.app/
2. https://spyfall-client-5jtz.onrender.com/


## Tech Stack
Frontend: vite-react - philosphy of choosing this over nextjs is that I'm using a single page that conditionally renders based on server data
Backend: nestjs + sockets


## Installation
1. Clone this repo
2. run npm install in both the client and server dir


## Usage
The monorepo is configured to be able to start both services from the root: `npm run start`

Client -> npm run dev
Server -> npm run start:dev
Shared folder builds to both


## Known Bugs & Limitations
-


## Future Features Planned
- Allow players to edit their username while in lobby
- Implement in game voting system for the Spy
- Add player icons
- Allow host to set a custom time limit


## License
- 

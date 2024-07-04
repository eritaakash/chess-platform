# Chess Platform 

A basic chess platform where you can play chess with your friend by generating a game link. 

### Demonstration

You can check the result yourself [here](https://ezchess.vercel.app/)

> ⁉ The piece move makes some delay not because of the code, but because of the speed of the host. The server is hosted on render's free plan.

### Tech Stack 

The server is built with Express & socket.io, and the frontend is built with Next.js, Sass and the following modules:

- `react-chessboard` for piece drag-and-drop functionality
- `chess.js (v0.13.4)` for piece move validation and more
- `socket.io-client` for realtime communication with server

### Working 

#### Game Creation System

![Node.js Chess Game Platform working]()

#### Game Session: Behind the Scenes

![Node.js Chess Game Platform Working]()

The above diagrams may not cover up the entire functionality, such as firing of `game:join` event from the client side.

### Features

- An invite-only chess platform
- 'Waiting for Opponent' screen until the invitee joins
- Realtime piece move updates for both the players 
- 'Win/Lose' screen once the game ends


### TODO

- Add 'Rematch' feature
- Make it beyond 'invite-only'
- User Login/Signup functionality
- Add security to the platform
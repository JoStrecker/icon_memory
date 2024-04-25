# Icon Memory
A Memory Game with Material Icons.
Made for HCI.

![](Icon.png)

## Install Dependencies
This Project requires node v20 with npm.

```bash
npm install
```

## Start Game in 'dev' mode

```bash
npm run dev
```

## Start Game in 'prod' mode
First build the application for production:

```bash
npm run build
```

Then run using the included Dockerfile:

```bash
docker run -p 3000:3000 --rm --name icon_memory_game $(docker build -q .)
```

The Game can then be played in a browser under http://localhost:3000.

## Stop the container

```bash
docker stop icon_memory_game
```

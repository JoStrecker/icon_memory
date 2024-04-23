# Icon Memory
A Memory Game with Material Icons.
Made for HCI.

![](Icon.png)

## Install Dependencies

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
docker run -p 3000:3000 $(docker build -q .)
```

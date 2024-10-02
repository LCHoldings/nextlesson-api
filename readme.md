# NextLesson API

This API is the middleman between the NextLesson App and the Skola24 API. Its purpose is to make it much easier to get the data from the Skola24 API and to make it more readable. Built using TypeScript and Express for speed and readability.

## Installation

### Preparation
1. Clone/Fork the repository
2. Run `npm i` to install all dependencies
3. Run `npm i -g nodemon` to install nodemon globally (if you haven't already)
4. Rename .env.example to .env

To run in development mode:
```bash
npm run dev
```

To run in production mode:
```bash
npm run build && node dist/src/index.js
```

### Usage
The API is built to be used with the [NextLesson App](https://github.com/LCHoldings/NextLesson). If you want to use it for your own project, please fork the project and host it on your own server or use something like [Netlify](https://netlify.com) or [Render](https://render.com/). The API is not meant to be used by anyone else than the NextLesson App since major changes will appear and other reasons.

### Documentation
The API documentation can be found [here](https://documenter.getpostman.com/view/30673392/2sAXqv6gjT). It might not always be up to date.

### Cache
The API uses a cache system to reduce the amount of requests to the Skola24 API. The cache is stored in memory and is reset every 5 minutes. This means that the data you get from the API is at most 5 minutes old.

When fetching for the first time, the API will most likely take a whole second to respond, but once it has cached, it should respond within 100ms depending on what call you make.
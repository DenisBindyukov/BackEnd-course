import express from 'express';
import bodyParser from 'body-parser';
import {videosRouter} from "./routs/videos-router";

const app = express();
const port = process.env.PORT || 5001;

const jsonParserMiddleware = bodyParser.json();

app.use(jsonParserMiddleware);

app.use('/videos', videosRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
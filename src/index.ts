import express from 'express';
import bodyParser from 'body-parser';
import {videosRouter} from "./routs/videos-router";
import {testingRouter} from "./routs/testing-alll-data";


const app = express();
const port = process.env.PORT || 5001;

const jsonParserMiddleware = bodyParser.json();

app.use(jsonParserMiddleware);

app.use('/videos', videosRouter);
app.use('/testing', testingRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
import express, {Response, Request, NextFunction} from 'express';
import bodyParser from 'body-parser';
import {blogsRouter} from "./routs/blogs-router";
import {testingRouter} from "./routs/testing-alll-data";
import {postsRouter} from "./routs/posts-router";

const app = express();
const port = process.env.PORT || 5002;

const jsonParserMiddleware = bodyParser.json();

app.use(jsonParserMiddleware);

app.use('/api/blogs', blogsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/testing', testingRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
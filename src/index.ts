import express, {Response, Request, NextFunction} from 'express';
import bodyParser from 'body-parser';
import {blogsRouter} from "./routs/blogs-router";
import {testingRouter} from "./routs/testing-alll-data";
import {postsRouter} from "./routs/posts-router";

const app = express();
const port = process.env.PORT || 5002;

const jsonParserMiddleware = bodyParser.json();

app.use(jsonParserMiddleware);

app.use('/blogs', blogsRouter);
app.use('/posts', postsRouter);
app.use('/testing/all-data', testingRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
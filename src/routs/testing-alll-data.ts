import {Request, Response, Router} from "express";
import {videos} from './videos-router'

export const testingRouter = Router({});

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    while (videos.length > 0) {
        videos.pop();
    }

    res.status(204).send()
});

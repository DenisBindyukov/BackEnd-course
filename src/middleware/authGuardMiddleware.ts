import {NextFunction, Request, Response} from "express";

interface RequestParams {
}

interface ResponseBody {
}

interface RequestBody {
}

interface RequestQuery {

}

const credentials = {
    login: 'admin',
    password: 'qwerty'
}

let data = `${credentials.login}:${credentials.password}`;
let buff = new Buffer(data);
let base64data = buff.toString('base64');

export const authGuardMiddleware = (req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).send()
        return;
    }

    if (authHeader === `Basic ${base64data}`) {
        next();
    } else {
        res.send(401);
        return;
    }
}
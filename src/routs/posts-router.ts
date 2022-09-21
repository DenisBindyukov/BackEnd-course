import {Request, Response, Router} from "express";

const todayDay = new Date().toISOString()

export const postsRouter = Router({});


export let videos = [
    {
        id: 0,
        title: "Redux",
        author: "Dinis",
        canBeDownloaded: false,
        minAgeRestriction: 18 as null | number,
        createdAt: todayDay,
        publicationDate: todayDay,
        availableResolutions: ['P144']
    }
];

interface ReqBodyType {
    title: string
    author: string
    canBeDownloaded: any
    minAgeRestriction: number
    publicationDate: any
    availableResolutions: string[]
}

postsRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(videos)
});

postsRouter.get('/:id', (req: Request, res: Response) => {
    const videoId = req.params.id;
    const video = videos.find((v) => v.id === +videoId);

    if (!video) {
        res.status(404).send()
        return
    }

    res.status(200).send(video)
});


postsRouter.post('/', (req: Request<{}, {}, ReqBodyType>, res: Response) => {
    const {title, author, canBeDownloaded, availableResolutions, minAgeRestriction} = req.body;
    let errors: any = {
        errorsMessages: []
    }

    if (!title || title.trim().length === 0 || title.trim().length > 40) {
        errors.errorsMessages.push({
            message: 'some error',
            field: "title"
        })
    }

    if (!author.trim()|| author.length > 20) {
        errors.errorsMessages.push({
            message: 'some error',
            field: "author"
        })
    }

    if (typeof canBeDownloaded === 'boolean') {
        errors.errorsMessages.push({
            message: 'some error',
            field: "canBeDownloaded"
        })
    }

    if (minAgeRestriction > 18) {
        errors.errorsMessages.push({
            message: 'some error',
            field: "minAgeRestriction"
        })
    }




    if (errors.errorsMessages.length) {
        res.status(400).send(errors)
        return;
    }


    function addDays(date: Date, days: number) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }


    const date = new Date();

    const newVideos = {
        id: +new Date().getTime(),
        title,
        author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: date.toISOString(),
        publicationDate: addDays(date, 1).toISOString(),
        availableResolutions: ['P144']
    }

    videos.push(newVideos)

    res.status(201).send(newVideos)
});

postsRouter.put('/:id', (req: Request<{ id: string }, {}, ReqBodyType>, res: Response) => {
    const videoId = req.params.id;
    const {title, author, canBeDownloaded, minAgeRestriction, publicationDate, availableResolutions} = req.body
    const video = videos.find((v) => v.id === +videoId);
    let errors: any = {
        errorsMessages: []
    }

    if (!video) {
        res.status(404).send()
        return
    }

    if (!title || !title.trim() || title.length > 40) {
        errors.errorsMessages.push({
            message: 'some error',
            field: "title"
        })
    }

    if (!author || !author.trim() || author.length > 20) {
        errors.errorsMessages.push({
            message: 'some error',
            field: "author"
        })
    }

    if (typeof canBeDownloaded !== 'boolean') {
        errors.errorsMessages.push({
            message: 'some error',
            field: "canBeDownloaded"
        })
    }

    if (minAgeRestriction > 18) {
        errors.errorsMessages.push({
            message: 'some error',
            field: "minAgeRestriction"
        })
    }

    if (typeof publicationDate !== "string") {
        errors.errorsMessages.push({
            message: 'some error',
            field: "publicationDate"
        })
    }

    if (errors.errorsMessages.length) {
        res.status(400).send(errors)
        return;
    }

    videos = videos.map((v) => v.id === +videoId ? {...v, ...req.body} : v);

    res.status(204).send()
});


postsRouter.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
    const videoId = req.params.id;
    const video = videos.find((v) => v.id === +videoId);
    if (!video) {
        res.status(404).send()
        return
    }

    const index = videos.findIndex((v) => v.id === +videoId);
    videos.splice(index, 1)

    res.status(204).send()
});

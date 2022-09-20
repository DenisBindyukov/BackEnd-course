import {Request, Response, Router} from "express";

const todayDay = new Date().toISOString()

export const videosRouter = Router({});

const arrayAvailableResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];

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

videosRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(videos)
});

videosRouter.get('/:id', (req: Request, res: Response) => {
    const videoId = req.params.id;
    const video = videos.find((v) => v.id === +videoId);

    if (!video) {
        res.status(404).send()
        return
    }

    res.status(200).send(video)
});


videosRouter.post('/', (req: Request<{}, {}, ReqBodyType>, res: Response) => {
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


    for (let i = 0; i < availableResolutions.length; i++) {
       if (!arrayAvailableResolutions.includes(availableResolutions[i])) {
           errors.errorsMessages.push({
               message: 'some error',
               field: "availableResolutions"
           })
           break;
       }
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

videosRouter.put('/:id', (req: Request<{ id: string }, {}, ReqBodyType>, res: Response) => {
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

    for (let i = 0; i < availableResolutions.length; i++) {
        if (!arrayAvailableResolutions.includes(availableResolutions[i])) {
            errors.errorsMessages.push({
                message: 'some error',
                field: "availableResolutions"
            })
            break;
        }
    }

    if (errors.errorsMessages.length) {
        res.status(400).send(errors)
        return;
    }

    videos = videos.map((v) => v.id === +videoId ? {...v, ...req.body} : v);

    res.status(204).send()
});


videosRouter.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
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

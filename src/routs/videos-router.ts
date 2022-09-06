import {Request, Response, Router} from "express";

export const videosRouter = Router({});

const videos = [
    {
        id: 0,
        title: "Redux",
        author: "Dinis",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2022-09-06T18:58:16.046Z",
        publicationDate: "2022-09-06T18:58:16.046Z",
        availableResolutions: ['P144']
    },
    {
        id: 1,
        title: "React",
        author: "Dinis",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2022-09-06T18:58:16.046Z",
        publicationDate: "2022-09-06T18:58:16.046Z",
        availableResolutions: ['P144']
    }
];

interface ReqBodyType {
    title: string
    author: string
    availableResolutions: string[]
}

videosRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(videos)
});


videosRouter.post('/', (req: Request<{}, {}, ReqBodyType>, res: Response) => {
    const {title, author, availableResolutions} = req.body;

    if (title.trim().length === 0 || title.trim().length > 40) {
        res.status(400).send({
            errorsMessages: [
                {
                    message: 'Max length title 40 symbols and  this is field necessarily',
                    field: "title"
                }
            ]
        })
        return
    }

    if (author.trim().length === 0 || author.trim().length > 20) {
        res.status(400).send({
            errorsMessages: [
                {
                    message: 'Max length title 20 symbols and  this is field necessarily',
                    field: "author"
                }
            ]
        })
        return
    }

    videos.push({
        id: new Date().getMilliseconds(),
        title,
        author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2022-09-06T18:58:16.046Z",
        publicationDate: "2022-09-06T18:58:16.046Z",
        availableResolutions: ['P144']
    },)

    res.status(201).send(videos[videos.length - 1])
});

videosRouter.put('/', (req: Request, res: Response) => {
    res.status(200).send(videos)
});
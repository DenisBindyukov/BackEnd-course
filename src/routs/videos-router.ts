import {Request, Response, Router} from "express";

export const videosRouter = Router({});

export let videos = [
    {
        id: '0',
        title: "Redux",
        author: "Dinis",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: new Date(),
        publicationDate: new Date(),
        availableResolutions: ['P144']
    },
    {
        id: '1',
        title: "React",
        author: "Dinis",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: new Date(),
        publicationDate: new Date(),
        availableResolutions: ['P144']
    }
];

interface ReqBodyType {
    title: string
    author: string
    availableResolutions: string[]
}

videosRouter.get('/', (req: Request, res: Response) => {
    console.log('render')
    res.status(200).send(videos)
});

videosRouter.get('/:id', (req: Request, res: Response) => {
    const videoId = req.params.id;
    const video = videos.find((v) => v.id === videoId);

    if (!video) {
        res.status(404).send()
        return
    }

    res.status(200).send(video)
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
        id: new Date().getTime().toString(),
        title,
        author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: new Date(),
        publicationDate: new Date(),
        availableResolutions: ['P144']
    },)

    res.status(201).send(videos[videos.length - 1])
});

videosRouter.put('/:id', (req: Request<{ id: string }, {}, ReqBodyType>, res: Response) => {
    const videoId = req.params.id;
    const {title, author} = req.body
    const video = videos.find((v) => v.id === videoId);

    if (!video) {
        res.status(404).send()
        return
    }

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

    videos = videos.map((v) => v.id === videoId ? {...v, ...req.body} : v);

    res.status(204).send()
});


videosRouter.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
    const videoId = req.params.id;
    const video = videos.find((v) => v.id === videoId);
    if (!video) {
        res.status(404).send()
        return
    }

    const index = videos.findIndex((v) => v.id === videoId);
    videos.splice(index, 1)

    res.status(204).send()
});

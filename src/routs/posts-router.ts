import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";

export const postsRouter = Router({});

export interface PostDtoType {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
}

postsRouter.get('/', (req: Request, res: Response) => {
    const posts = postsRepository.getPosts()
    res.status(200).send(posts)
});

postsRouter.get('/:id', (req: Request, res: Response) => {
    const post = postsRepository.getPost(req.params.id)

    if (post) {
        res.status(200).send(post)
        return
    } else {
        res.status(404).send()
        return;
    }


});

postsRouter.post('/', (req: Request<{}, {}, PostDtoType>, res: Response) => {
    const post = postsRepository.createPost(req.body)

    if (post) {
        res.status(201).send(post)
    } else {
        res.status(404).send()
    }

});

postsRouter.put('/:id', (req: Request<{ id: string }, {}, PostDtoType>, res: Response) => {
    const postUpdated = postsRepository.updatePost(req.params.id, req.body)

    if (postUpdated) {
        res.status(204).send()
        return
    } else {
        res.status(404).send()
        return;
    }

});


postsRouter.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
    const postDeleted = postsRepository.deletePost(req.params.id)

    if (postDeleted) {
        res.status(204).send()
        return
    } else {
        res.status(404).send()
    }
});

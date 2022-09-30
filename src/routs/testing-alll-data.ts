import {Request, Response, Router} from "express";
import {blogRepository} from '../repositories/blogs-repository'
import {postsRepository} from '../repositories/posts-repository'

export const testingRouter = Router({});

testingRouter.delete('', (req: Request, res: Response) => {
    const blogsDeleted = blogRepository.deleteAllItems();
    const postsDeleted = postsRepository.deleteAllItems();

    if (blogsDeleted && postsDeleted) {
        res.status(204).send()
    } else {
        throw new Error('Something went wrong')
    }

});

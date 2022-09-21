import {Request, Response, Router} from "express";
import {blogRepository} from "../repositories/blogs-repository";

export const blogsRouter = Router({});

export interface ReqBodyBlogType {
    name: string
    youtubeUrl: string
}

blogsRouter.get('/', (req: Request, res: Response) => {
    const blogs = blogRepository.getAllBlogs();
    res.status(200).send(blogs);
});

blogsRouter.get('/:id', (req: Request, res: Response) => {
    const blog = blogRepository.getBlogById(req.params.id);

    if (blog) {
        res.status(200).send(blog);
    } else {
        res.status(404).send();
    }
});


blogsRouter.post('/', (req: Request<{}, {}, ReqBodyBlogType>, res: Response) => {
    const newBlog = blogRepository.createBlog(req.body);
    res.status(201).send(newBlog);
});

blogsRouter.put('/:id', (req: Request<{ id: string }, {}, ReqBodyBlogType>, res: Response) => {
    const isUpdated = blogRepository.updateBlog(req.params.id, req.body);

    if (isUpdated) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }

});


blogsRouter.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
    const isDeleted = blogRepository.deleteBlog(req.params.id);
    if (isDeleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

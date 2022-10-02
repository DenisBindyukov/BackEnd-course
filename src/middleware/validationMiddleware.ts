import {NextFunction, Request, Response} from "express";
import {body, validationResult} from "express-validator";
import {blogRepository} from "../repositories/blogs-repository";

export const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errorsMessages: errors.array().map((e) => ({
                message: e.msg,
                field: e.param
            }))
        });
    } else {
        next()
    }
}

const regexp = new RegExp('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$');

export const blogValidationName = body('name', 'minimum number of characters 2, max should be 15').trim().isLength({min: 2, max: 15});
export const blogValidationYoutubeUrl = body('youtubeUrl', 'Invalid link ').trim().isLength({max: 100}).matches(regexp);
export const postValidationTitle = body('title', 'Invalid title field ').trim().isLength({min: 2, max: 30});
export const postValidationShortDescription = body('shortDescription', 'Invalid short description field ').trim().isLength({min: 1, max: 100});
export const postValidationContent = body('content', 'Invalid content field ').trim().isLength({min: 1, max: 1000});
export const blogIdValidation = body('blogId').custom((value) => {
    const blog =  blogRepository.getBlogById(value)
        if (!blog) {
           throw new Error('blog not found');
        }
        return true
})

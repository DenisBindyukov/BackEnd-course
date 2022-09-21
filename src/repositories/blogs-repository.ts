import {ReqBodyBlogType} from "../routs/blogs-router";

interface BlogType {
    id: string
    name: string
    youtubeUrl: string
}

export const defaultBlogId = new Date().toISOString();
export const defaultBlogName = 'IT-KAMASUTRA';

export let blogs: BlogType[] = [
    {
        id: defaultBlogId,
        name: defaultBlogName,
        youtubeUrl: 'https://www.youtube.com/c/ITKAMASUTRA'
    }
];


export const blogRepository = {

    getAllBlogs() {
        return blogs
    },
    createBlog(dto: ReqBodyBlogType) {
        const newBlog: BlogType = {
            id: new Date().toISOString(),
            name: dto.name,
            youtubeUrl: dto.youtubeUrl
        }

        blogs.push(newBlog);

        return newBlog;
    },
    getBlogById(id: string) {
        const blog = blogs.find(el => el.id === id);
        if (blog) {
            return blog;
        } else {
            return false
        }

    },
    updateBlog(id: string, dto: ReqBodyBlogType) {
        const blog = blogs.find((el) => el.id === id);

        if (blog) {
            blogs = blogs.map((el) => el.id === id ? {...el, ...dto} : el);
            return true
        } else {
            return false
        }
    },
    deleteBlog(id: string) {
        const index = blogs.findIndex((el) => el.id === id);

        if (index >= 0) {
            blogs.splice(index, 1);
            return true
        } else {
            return false
        }
    },
    deleteAllItems() {
        while (blogs.length > 0) {
            blogs.pop();
        }

        return true
    }
}
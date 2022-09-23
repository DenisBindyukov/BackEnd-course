import {blogRepository, defaultBlogId, defaultBlogName} from "./blogs-repository";
import {PostDtoType} from "../routs/posts-router";

export let posts = [
    {
        id: new Date().toISOString(),
        title: 'Redux',
        shortDescription: "some description",
        content: "RTK",
        blogId: defaultBlogId,
        blogName: defaultBlogName
    }
]

export const postsRepository = {
    getPosts() {
        return posts
    },

    createPost(dto: PostDtoType) {
        const blog = blogRepository.getBlogById(dto.blogId)

        if (blog) {
            const newPost = {
                id: new Date().toISOString(),
                title: dto.title,
                shortDescription: dto.shortDescription,
                content: dto.content,
                blogId: dto.blogId,
                blogName: blog.name
            }
            posts.push(newPost);
            return newPost;
        } else {
            return false
        }

    },
    getPost(postId: string) {
        const post = posts.find((el) => el.id === postId);

        if (post) {
            return post;
        } else {
            return false
        }
    },
    updatePost(id: string, dto: PostDtoType) {
        const post = posts.find((el) => el.id === id);

        if (post) {
            posts = posts.map(el => el.id === id ? {...el, ...dto} : el);
            return true
        } else {
            return false
        }

    },

    deletePost(id: string) {
        const post = posts.find(el => el.id === id)

        if (post) {
            posts = posts.filter(el => el.id !== id)
            return true
        } else {
            return false
        }
    },

    deleteAllItems() {
        while (posts.length > 0) {
            posts.pop();
        }

        return true
    }
}
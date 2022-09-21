import {defaultBlogId, defaultBlogName} from "./blogs-repository";

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

    deleteAllItems() {
        while (posts.length > 0) {
            posts.pop();
        }

        return true
    }
}
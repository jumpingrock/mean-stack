import { Post } from './post.model';

export class PostService {
    private posts: Post[] = [];

    getPosts() {
        return this.posts;
    }

    addPost(istitle: string, iscontent: string) {
        const post: Post = {title: istitle, content: iscontent};
        this.posts.push(post);

    }
}
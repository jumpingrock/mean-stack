import { Post } from './post.model';
import { Subject } from 'rxjs';

export class PostService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    getPosts() {
        return [...this.posts];
    }
    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }
    addPost(istitle: string, iscontent: string) {
        const post: Post = {title: istitle, content: iscontent};
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
    }
}
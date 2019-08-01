import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class PostService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();
    constructor(private http: HttpClient) {}

    getPosts() {
        this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
        .subscribe((res) => {
            this.posts = res.posts;
            this.postsUpdated.next([...this.posts])
        });
        
        // return [...this.posts];
    }
    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }
    addPost(istitle: string, iscontent: string) {
        const post: Post = {id: null, title: istitle, content: iscontent};
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
    }
}
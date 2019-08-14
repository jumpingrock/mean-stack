import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Injectable({providedIn: 'root'})

export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) {}

    getPosts() {
        this.http
        .get<{message: string, posts: any[]}>('http://localhost:3000/api/posts')
        .pipe(map((postData) => {
            return postData.posts.map(post => {
                return {
                    title: post.title,
                    content: post.content,
                    id: post._id
                };
            });
        }))
        .subscribe((transformedPosts) => {

            this.posts = transformedPosts;
            this.postsUpdated.next([...this.posts]);
        });
        // return [...this.posts];
    }
    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }
    getPost(id: string) {
        return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id);
    }

    addPost(istitle: string, iscontent: string) {
        const post: Post = {id: null, title: istitle, content: iscontent};
        this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
        .subscribe((responseData) => {
            console.log(responseData.message);
            const id = responseData.postId;
            post.id = id;
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
        });

    }
    updatePost(id: string, title: string, content: string) {
        const post: Post = {id: id, title: title, content: content};
        this.http.put("http://localhost:3000/api/posts/" + id, post)
        .subscribe(res => {
            const updatedPosts = [...this.posts];
            const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
            updatedPosts[oldPostIndex] = post;
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts])
        });
    }

    deletePost = (postId: string) => {
        console.log(postId);
        this.http.delete('http://localhost:3000/api/posts/' + postId)
        .subscribe(() => {
            console.log('Deleted!');
            const updatedPosts = this.posts.filter(post => post.id !== postId);
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    }
}
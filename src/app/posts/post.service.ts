import { Post } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { ConstantPool } from '@angular/compiler';
import { post } from 'selenium-webdriver/http';

@Injectable({providedIn: 'root'})

export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<{posts: Post[], postCount: number}>();

    constructor(private http: HttpClient, private router: Router) {}

    getPosts(postsPerPage: number, currentPage: number) {
        const queryParams = `?pagesize=${postsPerPage}&currentpage=${currentPage}`;
        this.http
        .get<{message: string, posts: any, maxPosts: number}>('http://localhost:3000/api/posts' + queryParams)
        .pipe(map((postData) => {
            return {
                maxPosts: postData.maxPosts,
                posts: postData.posts.map(post => {
                return {
                    title: post.title,
                    content: post.content,
                    id: post._id,
                    imagePath: post.imagePath,
                    creator: post.creator

                };
            })};
        }))
        .subscribe(transformedPostData => {
            // console.log(transformedPostData);
            this.posts = transformedPostData.posts;
            this.postsUpdated.next({
                posts: [...this.posts],
                postCount: transformedPostData.maxPosts
            });
        });
        // return [...this.posts];
    }
    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }
    getPost(id: string) {
        return this.http.get<{
            _id: string,
            title: string,
            content: string,
            imagePath: string,
            creator: string
        }>('http://localhost:3000/api/posts/' + id);
    }

    addPost(istitle: string, iscontent: string, image: File) {
        const postData = new FormData();
        postData.append('title', istitle);
        postData.append('content', iscontent);
        postData.append('image', image, istitle);
        // const post: Post = {id: null, title: istitle, content: iscontent};
        this.http.post<{ message: string, post: Post }>
        ('http://localhost:3000/api/posts', postData)
        .subscribe(responseData => {
            this.router.navigate(['/']);
        });

    }
    updatePost(id: string, title: string, content: string, image: File | string ) {
        let postData;
        if (typeof(image) === "object"){
             postData = new FormData();
            postData.append("id", id)
            postData.append("title", title);
            postData.append("content", content);
            postData.append("image", image, title);
        } else {
             postData = {
                id: id,
                title: title,
                content: content,
                imagePath: image,
                creator: null
            }
        }
        this.http.put("http://localhost:3000/api/posts/" + id, postData)
        .subscribe(res => {
            this.router.navigate(['/']);
        });
    }

    deletePost = (postId: string) => {
        console.log(postId);
        return this.http.delete('http://localhost:3000/api/posts/' + postId);
        // .subscribe(() => {
        //     console.log('Deleted!');
        //     const updatedPosts = this.posts.filter(post => post.id !== postId);
        //     this.posts = updatedPosts;
        //     this.postsUpdated.next({[...this.posts]});
        // });
    }
}
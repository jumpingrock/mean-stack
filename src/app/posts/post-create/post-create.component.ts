import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  newPost = 'NO CONTENT!';
  enteredValue = '';

  constructor() { }

  ngOnInit() {
  }
  onAddPost() {
    // console.dir(postInput);
    this.newPost = this.enteredValue;
  }
  // onAddPost(postInput: HTMLTextAreaElement) {
  //   // console.dir(postInput);
  //   this.newPost = postInput.value;
  // }
}

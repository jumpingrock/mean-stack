import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { fromEventPattern } from 'rxjs';
import {MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

import { PostListComponent } from './posts/post-list/post-list.component';
import { HeaderComponent } from './header/header.component';
import { PostsService } from './posts/post.service';




@NgModule({
  declarations: [ //your components
    AppComponent,
    PostsComponent,
    PostCreateComponent,

    PostListComponent,
    HeaderComponent

  ],
  imports: [ //for module you want to bring in
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule

  ],
  providers: [], //for services
  bootstrap: [AppComponent]
})
export class AppModule { }

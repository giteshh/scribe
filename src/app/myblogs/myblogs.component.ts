import {Component} from '@angular/core';
import firebase from "firebase/app";

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent {

  user: any = {};
  posts: any[] = [];

  constructor() {
    this.user = firebase.auth().currentUser;
    console.log(this.user)
    this.getPosts();
  }

  getPosts() {
    // get the list of posts

    firebase.firestore().collection("posts")
      .orderBy("created", "desc")
      .limit(100)
      .get().then((querySnapshot) => {

      console.log(querySnapshot.docs);
      this.posts = querySnapshot.docs;

    }).catch((err) => {
      console.log(err);
    })

  }

  onPostCreated() {
    // refresh the list of posts
    this.posts = [];
    this.getPosts();

  }

  onDelete() {
    // refresh the list of posts
    this.posts = [];
    this.getPosts();
  }

}

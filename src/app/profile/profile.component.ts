import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import firebase from "firebase/app";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any = {};
  posts: any[] = [];

  constructor(public activatedRoute: ActivatedRoute) {

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.getProfile(id);
    this.getUsersPosts(id);


    // this.activatedRoute.params.subscribe((routeParams) => {
    //   this.getProfile(routeParams.id);
    //   this.getUsersPosts(routeParams.id);
    // });

  }

  ngOnInit() {
  }

  getProfile(id: any){

    // firebase.firestore().settings({
    //   timestampsInSnapshots: true
    // })

    firebase.firestore().collection("users").doc(id).get().then((documentSnapshot) => {
      this.user = documentSnapshot.data();
      this.user.displayName = this.user.firstName + " " + this.user.lastName;
      this.user.id = documentSnapshot.id;
      this.user.hobbies = this.user.hobbies.split(",");
      console.log(this.user);

    }).catch((error) => {
      console.log(error);
    })

  }

  getUsersPosts(id: string | null){
    firebase.firestore().collection("posts")
      .where("owner","==", id).get().then((data)=>{

      this.posts = data.docs;

    })
  }

}

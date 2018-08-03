import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-addusers',
  templateUrl: './addusers.component.html',
  styleUrls: ['./addusers.component.css']
})
export class AddusersComponent implements OnInit {
  posts:any[];
  private url="https://jsonplaceholder.typicode.com/posts";
  constructor(public http:Http){
    http.get(this.url).subscribe((res)=>{
      console.log(res.json());
      this.posts=res.json();
    })
  }

  createPosts(input:HTMLInputElement){
    let post = {title : input.value}
    input.value="";
    this.http.post(this.url, JSON.stringify(post)).subscribe((res)=>{
      post['id']=res.json().id;
      this.posts.splice(0,0,post);
    })
  }
  updatePost(post){
    this.http.put(this.url +"/" + post.id, JSON.stringify(post)).subscribe(res=>{
      console.log(res.json());
    })
  }


  deletePost(post){
    this.http.delete(this.url + "/" + post.id).subscribe(res=>{
      let index = this.posts.indexOf(post);
      this.posts.splice(index,1);
    })
  }

  ngOnInit() {
  }

}

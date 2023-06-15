<template>
  <div id="main" class="bg-secondary mt-body">
   <div class="bg-secondary bg-gradient">
    <h1>{{ msg }}</h1>
    <div id="createpost" class="mb-sm-1 mb-1 me-sm-5 ms-sm-5 me-5 ms-5 row h-75">
      <div id="logo" class="rounded-start border-end-0 d-flex justify-content-center border col-2 col-sm-2 col-lg-2 col-xl-2 mt-0 mb-0 me-0 ms-0 mt-0 mt-sm-2 mb-sm-2 mt-xl-3 mb-xl-3 "> 
        <a class="navbar-brand d-flex justify-content-center" href="#">
        <img class="img-fluid" src="../assets/Groupomania-Logos/icon-left-font-monochrome-white.svg" alt="Grupomania">
       </a>
      </div>
      <div id="comment" class=" border-primary col-6 col-sm-8 ps-0 pe-0 col-lg-8 col-xl-8 mt-0 mb-0 me-0 ms-0 mt-0 mt-sm-2 mb-sm-2 mt-xl-3 mb-xl-3">
        <input type="text" class=" form-control w-100 h-100" id="comment1" placeholder="WRITE YOUR POST" v-model="comment" required>
      </div>
       <div id="post" v-on:click="post"  class="border-start-0 rounded-end d-flex align-items-center justify-content-center border col-2 col-sm-1 col-lg-1 col-xl-1 mt-0 mb-0 me-0 ms-0 mt-0 mt-sm-2 mb-sm-2 mt-xl-3 mb-xl-3 "> 
         <div class="border-primary">
           <a class="navbar-brand me-0 pt-0 pb-0 link-light" :id="'homepost'" href="#">
            Post
          </a>
        </div>
        
      </div>
      <div id="upload" class="d-flex align-items-center justify-content-center border-start-0 rounded-end border col-2 col-sm-1 col-lg-1 col-xl-1 mt-0 mb-0 me-0 ms-0 mt-0 mt-sm-2 mb-sm-2 mt-xl-3 mb-xl-3 "> 
         <div class="">
           <a class="navbar-brand me-0 pt-0 pb-0 w-100 h-100" href="#" @click="onUploadFile">
            <img src="../assets/Groupomania-Logos/clip3.svg" class="img-fluid" alt="files">
          </a>
          <input type="file" name="files" style="display: none" id="files" ref="fileInput" accept="image/*, video/*" @change="onFilePicked"/>
         </div>
        
      </div>
      <div id="uploaded" class="d-none col-12 mt-0 mb-0 me-0 ms-0 mt-0 mt-sm-2 mb-sm-2 mt-xl-3 mb-xl-3 "> 
        <div id="imageUploaded" class="col-12 w">
          
        </div>
      </div>
    </div>

        <div id="posts" class="me-5 ms-5 col">
          <All v-if="posts.length"  msg="" v-on:updatePosts="updateparent" :posts_shared="posts" :posts_tags="tags"/>
          <All v-if="!posts.length"  msg="Not post were found" v-on:updatePosts="updateparent" :posts_shared="posts" :posts_tags="tags"/>
       
        </div>
      </div>
    <p class="mt-5 mb-3 alert-danger" id="answer"></p>
  </div>
</template>


<script>

// @ is an alias to /src
//import Home from '@/components/Home.vue'
import All from  '@/components/Posts.vue'

import { mapState } from "vuex";
import Axios from 'axios';
export default {
  name: 'Dashboard',
  components: {
    //Home,
    All
  }, data() {
    return {
      username: "",
      password: "",
      comment:"",
      image: null,
      video: null,
      multimedia: null,
      posts: [],
      tags: [],
      replyresponse:null,
      user_tag:null,
      replytext: []
    };
  },
  props: {
    msg: String
  },
   computed: {
    ...mapState({
      user: (state) => state.user
    })
  },
     mounted(){
     // invocar los métodos
     this.dataPosts();
    },

  methods: {
    updateparent(post) {
        this.posts = post
    },
    commentcount(id){
      var cont = 0;

      var replys = this.replyresponse;
      if (replys != null){
        for (var i = 0 ; i < replys.length; i++ ){
          if (replys[i].idComment == id){
            cont++
          }

        }
        return cont;
      }else{
        return cont;
      }
    },
    commentdate(datecomment){
       var date = datecomment.split('.',1);


      var date1 = new Date(date);
     var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var datestring = date1.toLocaleDateString('en-US', options)+ " " +
    date1.getHours() + ":" + (date1.getMinutes()<10?'0':'') + date1.getMinutes();
      
      return datestring;
      },
dataPosts() {
  let url = `http://localhost:3000/api/comment/${this.user.id}`;

  Axios.get(url, {
    headers: {
      'Authorization': `Bearer ${this.user.token}`
    },
    params: {
      'userId': this.user.id
    }
  })
  .then(response => {
    let check = typeof JSON.parse(JSON.stringify(response.data.comments));
    if (check != 'Array') {
      this.posts = JSON.parse(JSON.stringify(response.data.comments));
      this.replyresponse = JSON.parse(JSON.stringify(response.data.reply));
      let check2 = typeof JSON.parse(JSON.stringify(response.data.user));
      if (check2 != 'Array') {
        this.user_tag = JSON.parse(JSON.stringify(response.data.user));
        this.tags = JSON.parse(JSON.stringify(response.data.user));
      }
    } else {
      this.posts = JSON.stringify(response.data.comments);
      this.replyresponse = JSON.parse(JSON.stringify(response.data.reply));
      this.user_tag = JSON.parse(JSON.stringify(response.data.user));
      this.tags = JSON.parse(JSON.stringify(response.data.user));
    }
  })
  .catch(error => {
    console.error(error);
  });
},


    addPost (user, post){
      let url = "http://localhost:3000/api/auth/add/";
        let data1 = {
          userId: user,
          postiD: post,
        }
         Axios.post(url,data1,{headers: {'Authorization': `Bearer:${this.user.token}`},params:{'userId': this.user.user}}).then(response => {
           if(response.status == 201){

             for ( var i = 0 ; i < this.posts.length ; i++){
              if(this.posts[i].idComment == post){
                this.posts[i].user_tag = true;
              }
              }
           }
          })
          .catch(error => { 
            console.error(error);
          });
    },
post() {
  const comment = document.getElementById('comment1').value;
  if (comment === '') {
    document.getElementById('comment1').placeholder = "WRITE YOUR POST";
    return;
  }

  const url = "http://localhost:3000/api/comment/";
  const data1 = {
    userId: this.user.id,
    comment: this.comment,
  };

  const formData = new FormData();
  const fileField = document.querySelector('input[type="file"]');
  formData.append("files", fileField.files[0]);
  formData.append("body", JSON.stringify(data1));

  const config = {
    headers: {
      'Authorization': `Bearer ${this.user.token}`,
    },
    params: {
      'userId': this.user.id,
    },
  };

  Axios.post(url, formData, config)
    .then(response => {
      this.clear();
      let answer = document.getElementById("answer");
      if (response.status === 201) {
        answer.classList.remove('alert-danger');
        answer.classList.add('alert-success');
        answer.innerHTML = "Post Created";
      } else {
        answer.classList.remove('alert-success');
        answer.classList.add('alert-danger');
        answer.innerHTML = "Something went wrong";
      }
      this.addPost(response.data.message.idUserComment, response.data.message.idComment);
      setTimeout(() => {
        this.dataPosts();
      }, 1000);
    })
    .catch(error => {
      console.error(error);
    });
},

  
    show (idComment) {
    var display = document.getElementById('show'+idComment);

    if(display.classList.contains('d-none')){
      display.classList.remove('d-none');
      display.classList.add('d-block');
    }else{
  
      display.classList.remove('d-block');
      display.classList.add('d-none');
    }
    
    },
reply(idComment) {
  const comment = document.getElementById(idComment).value;
  if (comment !== '') {
    const url = `http://localhost:3000/api/reply/${idComment}`;
    const data = {
      userId: this.user.id,
      reply: comment,
    };

    axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${this.user.token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        this.idcomment = idComment;
        this.getPostsReplies(this.idcomment);
        let answer = document.getElementById("answer");
        if (response.status === 201) {
          answer.classList.remove('alert-danger');
          answer.classList.add('alert-success');
          answer.innerHTML = "Reply created";
        } else {
          answer.classList.remove('alert-success');
          answer.classList.add('alert-danger');
          answer.innerHTML = "Something went wrong";
        }
        setTimeout(() => {
          this.clear();
        }, 1000);
      })
      .catch(error => {
        let answer = document.getElementById("answer");
        answer.classList.remove('alert-success');
        answer.classList.add('alert-danger');
        answer.innerHTML = error.response.data.message;
      });
  } else {
    document.getElementById(idComment).placeholder = "Please write something here!";
  }
},
    onUploadFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      let images = document.getElementById("imageUploaded");
      this.image =  this.$refs.fileInput.files[0];
      const files = event.target.files
      //let filename = files[0].name
      
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {

        this.imageUrl = fileReader.result;

         if(files[0].type === 'video/mp4'){   
            if (!document.getElementById("video") && !document.getElementById("image") ){
                createVideo(this.imageUrl)
            }else{
                 if(document.getElementById("image") ){
                const picture1 = document.getElementById('image');
                images.removeChild(picture1);
                }
                if(document.getElementById("video") ){
                const picture1 = document.getElementById('video');
                images.removeChild(picture1);
                }
                 createVideo(this.imageUrl) 
            }
         }else{
             if (!document.getElementById("video") &&  !document.getElementById("image") ){
                createImage(this.imageUrl)
             }else{
               if(document.getElementById("image") ){
                const picture1 = document.getElementById('image');
                images.removeChild(picture1);
                }
                if(document.getElementById("video") ){
                const picture1 = document.getElementById('video');
                images.removeChild(picture1);
                }
                 createImage(this.imageUrl) 
             }
           
          }
            
               
      })

      function createVideo(imageUrl){
        const div1 = document.createElement('video');
        div1.id = "video"
        div1.controls = "controls";
        div1.className = "img-fluid"
        images.appendChild(div1);
        const div2 = document.createElement('source');
        div2.ype ="video/mp4";
        div2.src = imageUrl;
        div1.appendChild(div2);
      }

      function createImage(imageUrl){
        const picture = document.createElement('img');
              picture.id = "image";
              picture.src = imageUrl;
              picture.className = "img-fluid";
              images.appendChild(picture);
      }
      
      fileReader.readAsDataURL(files[0])
      this.multimedia = files[0]; 
      const picture = document.getElementById('uploaded');
      picture.classList.replace('d-none', 'd-block');
        //Take the first selected file
        
    },
    clear () {
      let images = document.getElementById("imageUploaded");       
      let picture = document.getElementById('uploaded');
      let answer = document.getElementById("answer"); 
      if (document.getElementById("uploaded")){
      picture.classList.replace('d-block', 'd-none');
      }
      if (document.getElementById("video")){
        const picture1 = document.getElementById('video');
            images.removeChild(picture1);
      }else{
        if (document.getElementById("image")){
          const picture1 = document.getElementById('image');
            images.removeChild(picture1);
        }
        
      }
      answer.innerHTML = "",
      this.username = "",
      this.password = "",
      this.comment = "",
      this.image = null,
      this.video = null,
      this.multimedia = null,
      this.replytext = ""
    }
  },

}
</script>





<style lang="scss">
html {
    height: 100%;
}
body {
    height: 100%;
}
</style>
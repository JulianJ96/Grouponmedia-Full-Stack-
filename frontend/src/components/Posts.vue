<template>
  <div>
    <h1>{{ msg }}</h1>
    <div v-if="posts_shared" id="posts" class="pb-5 col-6 col-sm-8 ps-0 pe-0 col-lg-8 col-xl-8 offset-1 offset-sm-2 offset-lg-2 offset-xl-2 " >
      <p class="mt-5 mb-3 alert-danger" id="answer"></p>
      <div :class="postsdata.user_tag == true? 'background_read' : 'background_not_read'" v-for="postsdata in posts_shared" :key="postsdata.idComment" :id="'posts'+postsdata.idComment" class="border border-3 rounded col-12 mt-sm-3 mb-sm-3 mt-2 mb-2 me-xl-0 ms-xl-0">
         <div id="posts_information" class="d-inline-flex col-12 mt-sm-3">
            <div class="d-inline-flex flex-row text-start mb-0 col-12">
              <p class="flex-fill fs-4 fw-bolder">
              Posted by {{postsdata.firstname}} {{postsdata.lastname}} on {{commentdate(postsdata.myDate)}}
              </p> 
              <p :class="postsdata.user_tag == true? 'post_read' : 'post_not_read'" class="text-uppercase">
              </p>
            </div>
            <!--<div class="border border-primary text-start mb-0 col-3">
            
              <a  :id="postsdata.idComment+'read'">
                <img v-if="check(user_tag,postsdata.idComment) == false" src="../assets/images/icon.png" alt="" width="72" height="72">
              </a>
            </div>-->
            
          </div>
          <div id="comments" class="col-12 ms-3 mt-sm-3">
            <div id="comments" class="col-12 ms-3 me-sm-3">
              <p class="text-start ">
              {{postsdata.comment}}
              </p>  
            </div>
          </div>
          <div v-if="postsdata.video" id="postsmultimedia" class="col-12 w">
            <video class="img-fluid" controls>
                <source :src="require('../../../assets/'+postsdata.video)" type="video/mp4">
              </video> 
          </div>
          <div v-if="postsdata.image" id="postsimages" class="col-12">
            <img :src="require('../../../assets/'+postsdata.image)" class="img-fluid" :alt="postsdata.image">
          </div>
          <div v-if="postsdata.reply" id="replypost" class="col-12 mt-sm-3">
            <div id="replyposts" class="border border-primary col-12">
              <p class="text-start ">
              {{postsdata.reply}}
              </p>  
            </div>
          </div>
          <div id="comments_actions" class="col-12 d-flex mt-2 mb-2 me-2">
            <div id="comments" class="border-primary col-xl-12 d-flex flex-row">
              <a class="navbar-brand me-2 pt-0 pb-0" href="#">
                <img src="../assets/Groupomania-Logos/comment.webp"  class="img-fluid" alt="" width="25" height="25">
              </a>
              <a href="#" :id="'button'+postsdata.idComment" @click="show(postsdata)" class="navbar-brand me-2 pt-0 pb-0">
                {{postsdata.total_replies}} Comments
              </a>
               <a href="#" :id="'button'+postsdata.idComment" @click="reply(postsdata.idComment)" class="navbar-brand me-2 pt-0 pb-0">
                Reply
              </a>

              <input type="text" :id="postsdata.idComment" class=" form-control w-100 h-100" placeholder="WRITE YOUR REPLY" v-model="replytext[postsdata.idComment]" required>
           
            </div>
            <div :id="'show'+postsdata.idComment" class="d-none border border-primary col-10" >

                <div v-for="replys in postsdata.replies" :key="replys.id" class=" border border-primary col-12" >

                  <p  v-if="postsdata.idComment == replys.idComment"  class="border border-primary text-start col-12">
                    {{replys.reply}}
                </p>

                </div>
            </div>
           
          </div>
      </div> 
         
    </div>
    </div>

</template>

<script>

//import { store } from '../auth/store.js';
import { mapState } from 'vuex';
// import axios from 'axios';


export default {
    name: 'Posts',
        data(){
            return {
                username: "",
                password: "",
                comment: "",
                image: null,
                video: null,
                multimedia: null,
                replyresponse: null,
                user_tag: null,
                replytext: []
            };
        },
        props: {
            posts_shared: {
                type: Array,
                required: true
            },
            posts_tags: {
                type: Array,
                required: true
            },
            msg: String
        },
        computed: {
            ...mapState({
                user: (state) => state.user
            })
        },
        mounted(){
            if( this.posts_shared != null){
                var countComment = this.posts_shared.length;
                if(this.posts_tags != null){
                    var countTags = this.posts_tags.length;
                    var postsUnread = countComment = countTags;
                    this.$store.commit('unread', postsUnread);
                }else{
                    this.$store.commit('unread',countComment);
                }
            } else {
                this.$store.commit('unread', null);
            }
        },
          methods: {
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
    dataPosts(){    
      let url = "/comment/"+this.user.id;
       let answer = document.getElementById("answer");
        this.$http.get(url,{headers: {'Authorization': this.user.token},params:{'userId': this.user.id}}).then(response => {
           this.$emit("updatePosts", JSON.parse(JSON.stringify(response.data.comments)))
           
          //this.posts = JSON.parse(JSON.stringify(response.data.comments));
          this.replyresponse = JSON.parse(JSON.stringify(response.data.reply));
          this.user_tag = JSON.parse(JSON.stringify(response.data.user));
          })
          .catch(error => {
          answer.classList.remove('alert-success');
          answer.classList.add('alert-danger');
          answer.innerHTML = error.response.data.message;
          });
    },
    addPost (user, post){
      let url = "/auth/add";
        let data1 = {
          userId: user,
          postiD: post,
        }
           let answer = document.getElementById("answer");
         this.$http.post(url,data1,{headers: {'Authorization': this.user.token},params:{'userId': this.user.id}}).then(response => {
          if(response.status == 201){
          answer.classList.remove('alert-danger');
          answer.classList.add('alert-success');
          answer.innerHTML = "Post read"
           }else{
          answer.classList.remove('alert-success');
          answer.classList.add('alert-danger');
          answer.innerHTML = "Something went wrong"
          }
          setTimeout(() => {
          this.clear()
          },1000)
          })
          .catch(error => {
               if(error.status == 500){
                let answer = document.getElementById("answer");
                answer.classList.remove('alert-success');
                answer.classList.add('alert-danger');
                answer.innerHTML = error.response.data.message;
               }
          });
    },
    post () {    
     const comment = document.getElementById('comment1').value;
     if(comment != ''){
        let url = "/comment";
        let data1 = {
          userId: this.user.id,
          comment: this.comment,
        }
        const formData = new FormData();
        //Take the first selected file
        const fileField = document.querySelector('input[type="file"]')
        formData.append("files", fileField.files[0])
        formData.append("body", JSON.stringify(data1));
         let answer = document.getElementById("answer");
        this.$http.post(url,formData,{headers: {'Authorization': this.user.token},params:{'userId': this.user.id}}).then(response => {
          this.clear()
          if(response.status == 201){
          answer.classList.remove('alert-danger');
          answer.classList.add('alert-success');
          answer.innerHTML = "Post created"
          }else{
          answer.classList.remove('alert-success');
          answer.classList.add('alert-danger');
          answer.innerHTML = "Something went wrong"
          }
          })
          .catch(error => {
          answer.classList.remove('alert-success');
          answer.classList.add('alert-danger');
          answer.innerHTML = error.response.data.message;
          });
     }else{
       document.getElementById('comment1').placeholder = "Please write something down to post"
       
     }
    },
  
    show (postdata) {
      let unread = this.user.post_unread-1;
        this.$store.commit('unread',unread); 
        this.addPost(this.user.id,postdata.idComment)
        this.$store.commit('comment',postdata.idComment);
        this.$router.push({path:'/replies'})    
    },
    reply (idComment) {    
     const comment = document.getElementById(idComment).value;
     if(comment != ''){
        let url = "/Reply";
        let data1 = {
          userId: this.user.id,
          id: this.user.id,
          idComment: idComment,
          reply: comment
        }
        const formData = new FormData();
        formData.append("body", JSON.stringify(data1));
        let answer = document.getElementById("answer");
        this.$http.post(url,formData,{headers: {'Authorization': this.user.token},params:{'userId': this.user.id}}).then(response => {
          this.clear()
          if(response.status == 201){
          answer.classList.remove('alert-danger');
          answer.classList.add('alert-success');
          answer.innerHTML = "Reply created"
          }else{
          answer.classList.remove('alert-success');
          answer.classList.add('alert-danger');
          answer.innerHTML = "Something went wrong"
          }
          setTimeout(() => {
          this.dataPosts();
          },1000)
        }).catch(error => { 
          answer.classList.remove('alert-success');
          answer.classList.add('alert-danger');
          answer.innerHTML = error.response.data.message;
        });
     }else{
       document.getElementById(idComment).placeholder = "Please write something down to post"
       
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
        //Take the first selected file
        
    },
    clear () {
      let images = document.getElementById("imageUploaded");  
      let answer = document.getElementById("answer");      
      if (document.getElementById("video")){
        const picture1 = document.getElementById('video');
            images.removeChild(picture1);
      }else{
        if (document.getElementById("image")){
          const picture1 = document.getElementById('image');
            images.removeChild(picture1);
        } 
      }
      answer.innerHTML = ""
      this.username = "",
      this.password = "",
      this.comment = "",
      this.image = null,
      this.video = null,
      this.multimedia = null,
      this.replytext = []
    }
  },
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
html,
body {
  height: 100%;
}
body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}
.margin_half {
  margin-right: 25% !important;
  margin-left: 25% !important;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-floating:focus-within {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
 .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }
      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
    }
.background_read{
background-color:white;
}
.background_not_read{
background-color: #f1eeed;
  
}
p.post_read::before{
  content: "";
}
p.post_not_read::before{
  content: "";
}
</style>


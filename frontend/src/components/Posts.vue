<template>
  <div>
    <h1>{{ msg }}</h1>
    <div v-if="posts_shared" id="posts" class="pb-5 col-6 col-sm-8 ps-0 pe-0 col-lg-8 col-xl-8 offset-1 offset-sm-2 offset-lg-2 offset-xl-2">
      <p class="mt-5 mb-3 alert-danger" id="answer"></p>
      <div
        :class="postsdata.user_tag == true ? 'background_read' : 'background_not_read'"
        v-for="postsdata in posts_shared"
        :key="postsdata.idComment"
        :id="'posts' + postsdata.idComment"
        class="border border-3 rounded col-12 mt-sm-3 mb-sm-3 mt-2 mb-2 me-xl-0 ms-xl-0"
      >
        <div id="posts_information" class="d-inline-flex col-12 mt-sm-3">
          <div class="d-inline-flex flex-row text-start mb-0 col-12">
            <p class="flex-fill fs-4 fw-bolder">
              Posted by {{ postsdata.firstname }} {{ postsdata.lastname }} on {{ commentdate(postsdata.myDate) }}
            </p>
            <p :class="postsdata.user_tag == true ? 'post_read' : 'post_not_read'" class="text-uppercase"></p>
          </div>
        </div>
        <div id="comments" class="col-12 ms-3 mt-sm-3">
          <div id="comments" class="col-12 ms-3 me-sm-3">
            <p class="text-start ">{{ postsdata.comment }}</p>
          </div>
        </div>
        <div v-if="postsdata.video" id="postsmultimedia" class="col-12 w">
          <video class="img-fluid" controls>
            <source :src="require('../../../assets/' + postsdata.video)" type="video/mp4">
          </video>
        </div>
        <div v-if="postsdata.image" id="postsimages" class="col-12">
          <img :src="require('../../../assets/' + postsdata.image)" class="img-fluid" :alt="postsdata.image" />
        </div>
        <div v-if="postsdata.reply" id="replypost" class="col-12 mt-sm-3">
          <div id="replyposts" class="border border-primary col-12">
            <p class="text-start ">{{ postsdata.reply }}</p>
          </div>
        </div>
        <div id="comments_actions" class="col-12 d-flex mt-2 mb-2 me-2">
          <div id="comments" class="border-primary col-xl-12 d-flex flex-row">
            <a class="navbar-brand me-2 pt-0 pb-0" href="#">
              <img src="../assets/Groupomania-Logos/comment.webp" class="img-fluid" alt="" width="25" height="25" />
            </a>
            <a
              href="#"
              :id="'button' + postsdata.idComment"
              @click="show(postsdata)"
              class="navbar-brand me-2 pt-0 pb-0"
            >
              {{ postsdata.total_replies }} Comments
            </a>
            <a href="#" :id="'button' + postsdata.idComment" @click="reply(postsdata.idComment)" class="navbar-brand me-2 pt-0 pb-0">
              Reply
            </a>

            <input
              type="text"
              :id="'commentinput' + postsdata.idComment"
              class="d-none"
              v-model="newreply"
              :placeholder="'Reply to ' + postsdata.firstname"
              @keydown.enter="addReply(postsdata.idComment)"
            />

            <a
              href="#"
              :id="'cancel' + postsdata.idComment"
              class="navbar-brand me-2 pt-0 pb-0 d-none"
              @click="cancelReply(postsdata.idComment)"
            >
              Cancel
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import store from '../auth/store.js';
import { mapState } from 'vuex/dist/vuex.esm-bundler.js';

import axios from 'axios';

export default {
  name: 'Posts',
  data() {
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
  methods: {
    dataPosts() {
      const url = 'http://localhost:3000/api/comment/' + this.user.id;
      const answer = document.getElementById('answer');
      axios.get(url, {
        headers: {
          Authorization: this.user.token,
        },
        params: {
          userId: this.user.id,
        },
      })
      .then(response => {
        this.$emit('updatePosts', JSON.parse(JSON.stringify(response.data.comments)));
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
    addPost(user, post) {
      let url = "http://localhost:3000/api/auth/add";
      let data1 = {
        userId: user,
        postiD: post,
      };
      let answer = document.getElementById("answer");
      axios
        .post(url, data1, {
          headers: { Authorization: `Bearer ${this.user.token}` },
          params: { userId: this.user.id },
        })
        .then((response) => {
          if (response.status == 201) {
            answer.classList.remove("alert-danger");
            answer.classList.add("alert-success");
            answer.innerHTML = "Post read";
          } else {
            answer.classList.remove("alert-success");
            answer.classList.add("alert-danger");
            answer.innerHTML = "Something went wrong";
          }
          setTimeout(() => {
            this.clear();
          }, 1000);
        })
        .catch((error) => {
          if (error.status == 500) {
            let answer = document.getElementById("answer");
            answer.classList.remove("alert-success");
            answer.classList.add("alert-danger");
            answer.innerHTML = error.response.data.message;
          }
        });
    },
    post() {
        const comment = document.getElementById('comment1').value;
        if(comment != '') {
          const url = "http://localhost:3000/api/comment/";
          const data1 = {
            userId: this.user.id,
            comment: this.comment,
          };
          const formData = new FormData();
          const fileField = document.querySelector('input[type="file"]');
          formData.append("files", fileField.files[0]);
          formData.append("body", JSON.stringify(data1));
          const answer = document.getElementById("answer");
          axios.post(url, formData, {
            headers: {
              Authorization: `Bearer ${this.user.token}`,
            },
            params: {
              userId: this.user.id,
            }
          })
            .then(response => {
              this.clear();
              if(response.status == 201) {
                answer.classList.remove('alert-danger');
                answer.classList.add('alert-success');
                answer.innerHTML = "Post created";
              } else {
                answer.classList.remove('alert-success');
                answer.classList.add('alert-danger');
                answer.innerHTML = "Something went wrong";
              }
            })
            .catch(error => {
              answer.classList.remove('alert-success');
              answer.classList.add('alert-danger');
              answer.innerHTML = error.response.data.message;
            });
        } else {
          document.getElementById('comment1').placeholder = "Please write something down to post";
        }
      },

    commentdate(myDate) {
      const date = new Date(myDate);
      return date.toLocaleDateString();
    },
    show(postsdata) {
      const button = 'button' + postsdata.idComment;
      const commentinput = 'commentinput' + postsdata.idComment;
      const cancel = 'cancel' + postsdata.idComment;

      document.getElementById(button).classList.add('d-none');
      document.getElementById(commentinput).classList.remove('d-none');
      document.getElementById(cancel).classList.remove('d-none');

      this.addPost(this.user.id, postsdata.idComment);
      this.$store.commit('comment', postsdata.idComment);
      this.$router.push({
        path: '/reply',
        query: { commentId: postsdata.idComment } // Pass the comment ID as a query parameter
      });
    },
    reply(idComment) {
      const commentinput = 'commentinput' + idComment;
      const cancel = 'cancel' + idComment;

      // Get the value of the new reply
      const reply = this.newreply.trim();

      // Check if the reply is empty
      if (reply === '') {
        const answer = document.getElementById('answer');
        answer.innerHTML = 'Reply cannot be empty.';
        answer.style.display = 'block';
        return;
      }

      // TODO: Make the API request to add the reply
      const url = `http://localhost:3000/api/reply/${idComment}`; 
      const data = {
        reply: reply,
      };
      const storedToken = this.user.token; 
      const userId = this.user.id;

      axios
        .post(url, JSON.stringify(data), {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
          params: {
            'userId': userId,
          },
        })
        .then(response => {
          console.log(response);
          this.getPostsReplies(idComment);
          const answer = document.getElementById('answer');
          if (response && response.status === 201) {
            answer.classList.remove('alert-danger');
            answer.classList.add('alert-success');
            answer.innerHTML = 'Reply created';
          } else {
            answer.classList.remove('alert-danger');
            answer.classList.add('alert-success');
            answer.innerHTML = 'Something went wrong';
          }
          setTimeout(() => {
            this.clear();
          }, 1000);
        })
        .catch(error => {
          const answer = document.getElementById('answer');
          answer.classList.remove('alert-success');
          answer.classList.add('alert-danger');
          if (error.response && error.response.data && error.response.data.message) {
            answer.innerHTML = error.response.data.message;
          } else {
            answer.innerHTML = 'Something went wrong';
          }
        });

      // Hide the reply input and cancel button
      document.getElementById(commentinput).classList.add('d-none');
      document.getElementById(cancel).classList.add('d-none');

      // Show success message
      const answer = document.getElementById('answer');
      answer.innerHTML = 'Reply added successfully.';
      answer.style.display = 'block';
    },
      clear() {
        let images = document.getElementById("imageUploaded");
        let answer = document.getElementById("answer");

        if (images) {
          if (document.getElementById("video")) {
            const picture1 = document.getElementById("video");
            images.removeChild(picture1);
          } else {
            if (document.getElementById("image")) {
              const picture1 = document.getElementById("image");
              images.removeChild(picture1);
            }
          }
        }

        if (answer) {
          answer.innerHTML = "";
        }

        this.username = "";
        this.password = "";
        this.comment = "";
        this.image = null;
        this.video = null;
        this.multimedia = null;
        this.replytext = "";
        this.replyComment = "";
      },
  },
};

</script>

<style scoped>
.background_read {
  background-color: #e2f0f7;
}
.background_not_read {
  background-color: #ffffff;
}
.post_read {
  background-color: #48bfcd;
}
.post_not_read {
  background-color: #ff5757;
}
</style>
    
<template>
  <div id="mainr" class="bg-secondary bg-gradient mt-body">
    <div class="hello">
      <h1 class="h3 mb-3 fw-normal">You are logged in</h1>
      <div id="post_actions" class="mb-sm-1 mb-1 me-sm-5 ms-sm-5 me-5 ms-5 row h-75">
        <div id="logo" class="border rounded-start border-end-0 col-2 col-sm-2 col-lg-2 col-xl-2 mt-0 mb-0 me-0 ms-0 mt-0 mt-sm-2 mb-sm-2 mt-xl-3 mb-xl-3">
          <a class="navbar-brand me-0 pt-0 pb-0 w-100 h-100" href="#">
            <img src="../assets/Groupomania-Logos/icon.svg" class="img-fluid" alt="" width="25" height="25">
          </a>
        </div>
        <div id="comment" class="border border-start-0 border-end-0 col-6 col-sm-9 ps-0 pe-0 col-lg-9 col-xl-9 mt-0 mb-0 me-0 ms-0 mt-0 mt-sm-2 mb-sm-2 mt-xl-3 mb-xl-3">
          <input type="text" class="form-control w-100 h-100" id="reply" placeholder="WRITE YOUR REPLY" v-model="replyComment" required>
        </div>
        <div id="post" @click="reply(idcomment)" class="border rounded-end border-start-0 d-flex align-items-center justify-content-center border col-2 col-sm-1 col-lg-1 col-xl-1 mt-0 mb-0 me-0 ms-0 mt-0 mt-sm-2 mb-sm-2 mt-xl-3 mb-xl-3">
          <div class="link-light">
            <a class="navbar-brand me-0 pt-0 pb-0 link-light" href="#">
              Reply
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>"



<script>
import Replies from '../components/Replies.vue';
import { mapState } from "vuex";
import axios from 'axios';

export default {
  name: 'Dashboard',
  components: {
    Replies
  },
  data() {
    return {
      replyComment: "",
      idcomment: "",
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user
    })
  },
  mounted() {
    if (this.user && this.user.idComment) {
      this.getPostsReplies(this.user.idComment);
    }
  },
  methods: {
    getPostsReplies(idComment) {
      const url = `http://localhost:3000/api/comment/${idComment}`;
      const config = {
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
        params: {
          userId: this.user.id,
        },
      };

      axios.get(url, config)
        .then(response => {
          this.replyresponse = response.data;
          setTimeout(() => {
            this.clear();
          }, 1000);
        })
        .catch(error => {
          console.error(error);
        });
    },

    reply(idComment) {
      if (this.replyComment !== '') {
        const url = `http://localhost:3000/api/comment/${idComment}/reply`;
        const data = {
          reply: this.replyComment,
        };
        const config = {
          headers: {
            Authorization: `Bearer ${this.user.token}`,
            'Content-Type': 'application/json',
          },
        };
        axios.post(url, data, config)
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
            if (error.response && error.response.data && error.response.data.message) {
              answer.innerHTML = error.response.data.message;
            } else {
              answer.innerHTML = "Something went wrong";
            }
          });
      } else {
        let commentInput = document.getElementById("reply");
        commentInput.placeholder = "Please write something here!";
      }
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
      this.replyComment = "";
    }
  }
};
</script>

<style lang="scss">
html {
  height: 100%;
}

body {
  height: 100%;
}

#mainr {
  height: 100%;
  overflow: auto;
}

#hello {
  height: auto;
}
</style>
<template>
  <div>
    <button
      @click="showMessageForm = !showMessageForm"
      type="button"
      class="btn btn-outline-info mt-3"
    >MESSAGE FORM</button>

    <form v-if="showMessageForm" @submit.prevent="addMsg">
      <div v-if="error" class="alert alert-dismissible alert-warning my-3">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <h4 class="alert-heading">Error!</h4>
        <p class="mb-0">{{error}}!</p>
      </div>

      <div class="form-group">
        <label for="username">Username:</label>
        <input
          v-model="message.username"
          type="text"
          class="form-control"
          id="username"
          placeholder="Enter a username..."
          required
        />
      </div>
      <div class="form-group">
        <label for="subject">Subject:</label>
        <input
          v-model="message.subject"
          type="text"
          class="form-control"
          id="subject"
          placeholder="Enter a subject..."
          required
        />
      </div>
      <div class="form-group">
        <label for="message">Message:</label>
        <input
          v-model="message.message"
          type="text"
          class="form-control"
          id="message"
          placeholder="Enter your message..."
          required
        />
      </div>
      <div class="form-group">
        <label for="imgUrl">Image URL:</label>
        <input
          v-model="message.imgUrl"
          type="text"
          class="form-control"
          id="imgUrl"
          placeholder="Image URL..."
          required
        />
      </div>
      <button type="submit" class="btn btn-outline-primary">Add Your Message</button>
    </form>

    <hr />

    <div class="list-unstyled" v-for="message in reverseMsg" :key="message._id">
      <li class="media">
        <img v-if="message.imgUrl" :src="message.imgUrl" class="mr-3" :alt="message.subject" />

        <div class="media-body">
          <h4 class="mt-0 mb-1">{{message.username}}</h4>

          <h5 class="mt-0 mb-1">{{message.subject}}</h5>
          {{message.message}}
          <br />

          <small>{{message.created}}</small>
        </div>
      </li>

      <hr />
    </div>
  </div>
</template>

<script>
const URL = process.env.BACKEND_URL;

export default {
  name: 'home',
  data: () => ({
    showMessageForm: false,
    messages: [],
    message: {
      username: 'Anonymous',
      subject: '',
      message: '',
      imgUrl: '',
    },
    error: '',
  }),
  mounted() {
    fetch(URL)
      .then(res => res.json())
      .then((rez) => {
        this.messages = rez;
      });
  },
  computed: {
    reverseMsg() {
      return this.messages.slice().reverse();
    },
  },
  methods: {
    addMsg() {
      console.log(this.message);
      fetch(URL, {
        method: 'POST',
        body: JSON.stringify(this.message),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then(res => res.json())
        .then((rez) => {
          if (rez.details) {
            const err = rez.details.map(detail => detail.message).join(' ');
            this.error = err;
          } else {
            this.messages.push(rez);
          }
        });
    },
  },
};
</script>

<style>
hr {
  border: 1px solid white;
}

img {
  max-width: 300px;
  height: auto;
}

h4 {
  color: lime;
}

h5 {
  color: gold;
}
</style>

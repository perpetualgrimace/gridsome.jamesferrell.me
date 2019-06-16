<page-query>
  query Contact {
    d: contact(path: "/contact") {
      title
      headline
      content
    }
  }
</page-query>


<script>
  import { Fragment } from "vue-fragment";
  import SecondarySidebar from "~/components/SecondarySidebar";

  export default {
    components: {
      Fragment, SecondarySidebar
    },
    metaInfo: {
      title: "Contact"
    },
    data: function() {
      return {
        formData: {}
      }
    },
    methods: {
      encode(data) {
        return Object.keys(data)
          .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
          .join('&')
      },
      handleSubmit(e) {
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: this.encode({
            'form-name': e.target.getAttribute('name'),
            ...this.formData,
          }),
        })
        // TODO: success/error states
        .then(() => console.log(this.formData))
        .catch(error => console.log(error))
      }
    }
  }
</script>


<template>
  <Layout>

    <form
      name="contact"
      method="post"
      v-on:submit.prevent="handleSubmit"
      action="/success/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>
      <div class="sender-info">
        <div>
          <label for="name" class="label" >Your name</label>
          <input type="text" name="name" v-model="formData.name" />
        </div>
        <div>
          <label for="email">Your email</label>
          <input type="email" name="email" v-model="formData.email" />
        </div>
      </div>

      <div class="message-wrapper">
        <label for="message">Message</label>
        <textarea name="message" v-model="formData.message"></textarea>
      </div>

      <button type="submit">Submit form</button>
    </form>

    <template slot="sidebar">
      <SecondarySidebar :content="$page.d.content" />
    </template>
  </Layout>
</template>


<style lang="scss">
</style>

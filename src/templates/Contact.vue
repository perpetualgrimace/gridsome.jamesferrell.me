<page-query>
  query ($path: String!) {
    d: contact (path: $path) {
      title
      headline
      content
      submitText
    }
  }
</page-query>


<script>
  import { Fragment } from "vue-fragment";
  import SecondarySidebar from "~/components/SecondarySidebar";
  import Button from "~/components/Button";

  export default {
    components: {
      Fragment, SecondarySidebar, Button
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

<!-- TODO: the entire :damn: contaact form -->
<template>
  <Layout>

    <h1>{{ $page.d.title }}</h1>

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

      <Button type="submit" classes="epsilon u-margin-top-lg" :text="$page.d.submitText" />
    </form>

    <!-- TODO: instagram, facebook, linkedin -->
    <template slot="sidebar">
      <VueRemarkContent class="content secondary epsilon" />
    </template>
  </Layout>
</template>


<style lang="scss">
</style>

<page-query>
  query ($path: String!) {
    d: contact (path: $path) {
      title
      headline
      content
      labelName
      labelEmail
      labelText
      errorName
      errorEmail
      errorEmailInvalid
      errorText
      successHeading
      successText
      failHeading
      failText
      submitText
    }
  }
</page-query>


<script>
  import {Fragment} from "vue-fragment";
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
        formData: {},
        submitted: false,
        status: null
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
        .then(() => {
          this.submitted = true;
          this.status = "success";
        })
        .catch(error => {
          this.submitted = true;
          this.status = "fail";
          console.log(error);
        });
      }
    }
  }
</script>


<template>
  <Layout>

    <Fragment v-if="submitted === false">
      <h1 class="gamma">{{ $page.d.title }}</h1>

      <form
        class="contact-form g-columns u-margin-top-lg u-padding-top-xs"
        name="contact"
        method="post"
        v-on:submit.prevent="handleSubmit"
        action="/success/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <div class="g-columns">
          <!-- name -->
          <div class="g-col g-6 u-padding-top-off">
            <label for="name" class="label">
              {{ $page.d.labelName }}
            </label>
            <input type="text" name="name" id="name" v-model="formData.name" required autofocus />
          </div>
          <!-- email -->
          <div class="g-col g-6 u-padding-top-off">
            <label for="email">
              {{ $page.d.labelEmail }}
            </label>
            <input type="email" name="email" id="email" v-model="formData.email" required />
          </div>
        </div>

        <!-- text -->
        <div class="g-columns">
          <div class="g-col u-padding-top-off">
            <label for="text">
              {{ $page.d.labelText }}
            </label>
            <textarea class="contact-form-textarea" name="text" id="text" v-model="formData.text" required />
          </div>
        </div>

        <!-- netlify fields -->
        <input type="hidden" name="form-name" value="contact" />
        <label hidden>If you're a robot, please fill this out: <input name="bot-field" /></label>

        <!-- submit button -->
        <div class="g-columns">
          <div class="g-col u-padding-top-xs">
            <Button type="submit" classes="epsilon u-margin-top-off" :text="$page.d.submitText" />
          </div>
        </div>
      </form>
    </Fragment>

    <!-- message sent -->
    <div class="contact-message content" v-else-if="status === 'success'">
      <h1>{{ $page.d.successHeading }}</h1>
      <p>{{ $page.d.successText }}</p>
    </div>

    <!-- message not sent -->
    <div class="contact-message content" v-else-if="status === 'fail'">
      <h1>{{ $page.d.failHeading }}</h1>
      <p>{{ $page.d.failText }}</p>
    </div>

    <template slot="sidebar" v-if="!status">
      <VueRemarkContent class="content secondary epsilon" />
    </template>
  </Layout>
</template>


<style lang="scss">

  .contact-form {
    @media (min-width: $xl) {
      padding-right: $gutter * 2;
    }
  }

  .contact-form-textarea {
    height: calc(15vh + 10vw);
  };

  .contact-message {
    display: flex;
    flex: 1 0 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    max-width: 100%;
    width: 100%;
  }

  // labels
  label {
    display: block;
    padding-bottom: $gutter; // extend clickable area
    // compensate for padding
    margin-bottom: -0.75rem;
    color: $dark-1;

    &:hover, &:active {
      color: $brand-light;
    }

    // validation errors
    &.error {
      @include body-bold-font;
      position: absolute;
      color: $error-color;
      top: auto;
      padding-bottom: 0; // reset padding
      z-index: -1; // place behind fields
      // transitionable properties
      transform: none;
      opacity: 1;

      // default hidden state, toggled via js
      &.is-hidden {
        transform: translateY(-100%);
        opacity: 0;
      }
    }
  }
</style>

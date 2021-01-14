<page-query>
  query ($path: String!) {
    d: contact (path: $path) {
      title
      content
      labelName
      labelEmail
      labelText
      emptyName
      emptyEmail
      invalidEmail
      emptyText
      successHeading
      successText
      failHeading
      failText
      spamHeading
      spamText1
      spamText2
      submitText
    }
  }
</page-query>


<script>
  import {Fragment} from "vue-fragment";
  import {isEmail, spam} from "~/helpers.js";
  import Button from "~/components/Button";
  import ImageHero from "~/components/ImageHero";

  export default {
    components: {
      Fragment, Button, ImageHero
    },
    metaInfo: {
      title: "Contact"
    },
    data() {
      return {
        formData: {},
        submitted: false,
        status: null,
        hasMounted: false,
        validationError: null
      }
    },
    methods: {
      encode(data) {
        return Object.keys(data)
          .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
          .join('&')
      },
      handleSubmit(e) {
        const encodedEmail = this.encode({'form-name': e.target.getAttribute('name'), ...this.formData});

        // validation
        if (!this.formData.name || this.formData.name === "") {
          this.validationError = "emptyName";
          this.$refs.nameField.focus();
          return false;
        }
        else if (!this.formData.email || this.formData.email === "") {
          this.validationError = "emptyEmail";
          this.$refs.emailField.focus();
          return false;
        }
        else if (!isEmail(this.formData.email)) {
          this.validationError = "invalidEmail";
          this.$refs.emailField.focus();
          return false;
        }
        else if (!this.formData.text || this.formData.text === "") {
          this.validationError = "emptyText";
          this.$refs.textField.focus();
          return false;
        }

        // spam detection
        let spamCount = 0;
        spam.forEach(s => encodedEmail.includes(s.replace(/\s/g, "%20")) ? spamCount++ : null);

        if(spamCount >= 1) {
          this.submitted = true;
          this.status = "spam";
          return null;
        }

        // we're good, submit the form
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encodedEmail
        })
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
    },
    mounted() {
      // show the form
      this.hasMounted = true;

      // re-focus the name field once the app hydrates
      this.$nextTick(() => this.$refs.nameField.focus());
    }
  }
</script>


<template>
  <Layout singleColumn="true">
    <template slot="hero">
      <ImageHero :headline="$page.d.title" :overlapped="true" />
    </template>

    <Fragment v-if="submitted === false">
      <form
        class="contact-form u-padding-top-xs"
        :class="hasMounted ? 'is-visible' : 'is-hidden'"
        :tabindex="!hasMounted ? '-1' : null"
        name="contact"
        method="post"
        v-on:submit.prevent="handleSubmit"
        action="/success/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <div class="g-columns">
          <!-- name -->
          <div class="field g-col g-6 u-padding-top-off">
            <label for="name" class="label u-font-sm">
              {{ $page.d.labelName }}
            </label>
            <input
              class="contact-form-input"
              :class="validationError === 'emptyName' ? 'is-invalid' : ''"
              type="text"
              name="name"
              id="name"
              v-model="formData.name"
              ref="nameField"
            />
            <label class="contact-form-error" :class="validationError && validationError === 'emptyName' ? 'is-visible' : 'is-hidden'" for="name">
              {{ $page.d.emptyName }}
            </label>
          </div>
          <!-- email -->
          <div class="field g-col g-6 u-padding-top-off">
            <label for="email" class="label u-font-sm">
              {{ $page.d.labelEmail }}
            </label>
            <input
              class="contact-form-input"
              :class="validationError === 'emptyEmail' || validationError === 'invalidEmail' ? 'is-invalid' : ''"
              type="text"
              name="email"
              id="email"
              v-model="formData.email"
              ref="emailField"
            />
            <label class="contact-form-error" :class="validationError && validationError === 'emptyEmail' ? 'is-visible' : 'is-hidden'" for="email">
              {{ $page.d.emptyEmail }}
            </label>
            <label class="contact-form-error" :class="validationError && validationError === 'invalidEmail' ? 'is-visible' : 'is-hidden'" for="email">
              {{ $page.d.invalidEmail }}
            </label>
          </div>
        </div>

        <!-- text -->
        <div class="g-columns">
          <div class="field g-col u-padding-top-off">
            <label for="text" class="label u-font-sm">
              {{ $page.d.labelText }}
            </label>
            <textarea
              class="contact-form-textarea"
              :class="validationError === 'emptyText' ? 'is-invalid' : ''"
              name="text"
              id="text"
              v-model="formData.text"
              ref="textField"
            />
            <label class="contact-form-error" :class="validationError && validationError === 'emptyText' ? 'is-visible' : 'is-hidden'" for="text">
              {{ $page.d.emptyText }}
            </label>
          </div>
        </div>

        <!-- netlify fields -->
        <input type="hidden" name="form-name" value="contact" />
        <label hidden>If you're a robot, please fill this out: <input name="bot-field" /></label>

        <!-- submit button -->
        <div class="g-columns">
          <div class="g-col u-padding-top-xs">
            <Button type="submit" classes="u-font-sm u-margin-top-off" :text="$page.d.submitText" />
          </div>
        </div>
      </form>

      <!-- or, email me -->
      <VueRemarkContent class="content u-font-sm u-left-center u-margin-top-lg" />

    </Fragment>

    <!-- unfortunately, sir, it appears that you are a robot -->
    <transition name="transition-fade" appear v-else-if="status === 'spam'">
      <div class="contact-message content">
        <h1>{{ $page.d.spamHeading }}</h1>
        <p>{{ $page.d.spamText1 }}</p>
        <p>{{ $page.d.spamText2 }}</p>
      </div>
    </transition>

    <!-- message sent -->
    <transition name="transition-fade" appear v-else-if="status === 'success'">
      <div class="contact-message content">
        <h1>{{ $page.d.successHeading }}</h1>
        <p>{{ $page.d.successText }}</p>
      </div>
    </transition>

    <!-- message not sent -->
    <transition name="transition-fade" appear v-else-if="status === 'fail'">
      <div class="contact-message content">
        <h1>{{ $page.d.failHeading }}</h1>
        <p>{{ $page.d.failText }}</p>
      </div>
    </transition>
  </Layout>
</template>


<style lang="scss">

  .contact-form {
    padding: $gutter;
    @include box-shadow-lg;
    background-color: $white;
    border-radius: $radius-md;

    @media (min-width: $bp-md) {
      margin-top: -$hero-overlap;
    }

    &.is-hidden {
      opacity: 0;
      z-index: -1;
      pointer-events: none;
    }

    .g-col {
      z-index: 1;
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

    // validation errors
    &.contact-form-error {
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

  // invalid fields get a red border
  .contact-form .contact-form-input.is-invalid,
  .contact-form .contact-form-textarea.is-invalid {
    border-color: $error-color;

    & ~ .contact-form-error {
      color: $error-color;
    }
  }
</style>

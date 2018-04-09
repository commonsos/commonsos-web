<template>
  <div>
    <app-toolbar title="Messages">
      <v-btn slot="left" icon @click.prevent="closeModal()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
    </app-toolbar>

    <v-list three-line>
      <template v-for="(item, index) in messages">
        <v-list-tile avatar @click="">
          <v-list-tile-avatar>
            <avatar :userId="item.userId"/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{item.createdAt | moment('from')}}</v-list-tile-title>
            <v-list-tile-sub-title v-html="item.message"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
      <v-divider></v-divider>
    </v-list>

    <v-container>
      <v-layout row wrap>
        <v-flex>
          <form @submit.prevent="sendMessage()" fixed bottom>
            <v-text-field v-model="message" label="Message" type="text" auto-grow multi-line/>
            <v-btn type="submit" color="primary">Send</v-btn>
          </form>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
  import AppToolbar from '@/components/AppToolbar'
  import Avatar from '@/components/Avatar'

  export default {
    components: {
      AppToolbar, Avatar
    },
    props: ['closeModal'],
    data() {
      return {
        message: "",
        messages: [
          {message: 'Hello my friend', userId: 'worker', createdAt: '2018-04-07T20:51:00'},
          {message: 'Hi!', userId: 'elderly1', createdAt: '2018-04-09T21:51:00'},
          {message: 'Good to see you', userId: 'elderly1', createdAt: '2018-04-09T22:01:00'},
          ]
      }
    },
    methods: {
      sendMessage() {
        this.messages.push({message: this.message, createdAt: new Date(), userId: 'worker'})
        this.message = ""
        this.showReply()
      },
      showReply() {
        console.log("scrolling to", this.$refs.reply)
        this.$vuetify.goTo(this.$refs.reply, {
          duration: 300,
          offset: 0,
          easing: 'easeInOutCubic'
        })
      }
    },
  }
</script>
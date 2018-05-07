<template>
    <panel title='stream' class="ml-2">
      <div v-if="this.$cookie.get('stream'+this.title)!=null">
        <div
      v-for="news in livefeed" 
      :key="news.id"> 
      {{news.title}} -- {{news.publishedAt}}
        </div>
</div>
<div v-else>
  <div v-for="sport in sports" :key="sport.name">
     <v-btn @click="createCookie(sport.name)"> 
    {{sport.name}}
     </v-btn>
</div>
</div>
    </panel>
</template>
<script>
import StreamService from "@/services/StreamService";
export default {
  components: {},
  data() {
    return {
      sports: [
        {
          name: "health"
        },
        {
          name: "medicine"
        },
        {
          name: "science"
        },
        {
          name: "sports"
        },
        {
          name: "technology"
        },
        {
          name: "general"
        }
      ],
      cookie: this.$cookie.get("stream" + this.title),
      livefeed: null,
      timer: ""
    };
  },
  created: function() {
    this.loadData();
    this.timer = setInterval(this.loadData, 10000);
  },
  methods: {
    navigateTo(link) {
      this.$router.push(link);
    },
    async loadData() {
      this.livefeed = (await StreamService.getFeed({
        stream: this.title
      })).data.articles;
    },

    async createCookie(x) {
      await StreamService.post({
        stream: this.title,
        sport: x
      });
      this.$router.go(this.$router.currentRoute);
    }
  },
  ready: function() {
    this.loadData();
    setInterval(
      function() {
        this.loadData();
      }.bind(this),
      1
    );
  },
  props: ["title"],
  async mounted() {
    //do a request to the backend for all the projects
    //always .data, thats how ti returns data.
    this.livefeed = (await StreamService.getFeed({
      stream: this.title
    })).data.articles;
  }
};
</script>
<!--scoped means only works in this vue template, not global, @click when the button
fires a click event, it does the method associated.-->
<style scoped>

</style>   
  <!-- calls the end point, pass it email and password, wait for a response, and opnce we get
the response we print out the data.-->

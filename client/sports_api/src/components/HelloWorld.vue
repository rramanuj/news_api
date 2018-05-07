<template>

<v-layout column>
<v-flex xs-12>

    <div class="hello">
    <h1>News of the World</h1>
    <h2>Free news.</h2>
        <v-btn @click="deleteCookies()"> 
    Reset Streams
     </v-btn>
    </div>
</v-flex>
<v-layout fluid>

  <v-flex xs-2 pt-2>
      <Panel title="1"/>
</v-flex>
  <v-flex xs-2 pt-2>
      <Panel title="2"/>
</v-flex>
  <v-flex xs-2 pt-2>
      <Panel title="3"/>
</v-flex>
  <v-flex xs-2 pt-2>
      <Panel title="4"/>
</v-flex>
  <v-flex xs-2 pt-2>
      <Panel title="5"/>
</v-flex>
  <v-flex xs-2 pt-2>
      <Panel title="6"/>
</v-flex>
  </v-layout>
</v-layout>
</template>
<script>
import Panel from "./Panel";

export default {
  name: "HelloWorld",
  components: {
    Panel //i want to be able to access the panel.
  },
  data() {
    return {
      msg: "Welcome to StreamSports!"
    };
  },
  methods: {
    async deleteCookies() {
      this.$cookie.delete("stream1");
      this.$cookie.delete("stream2");
      this.$cookie.delete("stream3");
      this.$cookie.delete("stream4");
      this.$cookie.delete("stream5");
      this.$cookie.delete("stream6");
      this.$router.go(this.$router.currentRoute);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
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
</style>

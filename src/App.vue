<template>
  <main-header></main-header>
  <router-view>

  </router-view>
</template>

<script>
import MainHeader from './components/MainHeader.vue';
import {mapActions} from 'vuex';
  export default {
    name: 'App',
    components:{
      MainHeader
    }, 
    created(){
      this.tryLoginAction();
    },
    methods:{
      ...mapActions(['tryLoginAction'])
    }
  }
</script>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

  * {
    box-sizing: border-box;
  }

  html {
    font-family: "Roboto", sans-serif;
  }

  body {
    margin: 0;
  }
  input,
  textarea {
      width: 100%;
      padding: 10px 15px;
      margin: 10px 0;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #f9f9f9;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
      outline: none;
      resize: none;
  }

  input:hover, textarea:hover {
      border-color: #000;
  }

  input:focus,
  textarea:focus {
    border-color: #4CAF50; /* Green for focus */
    box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
    background-color: #fff;
  }
</style>

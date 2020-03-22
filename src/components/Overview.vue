<template>
  <div class="hero">
    <div>
      <h1 class="display-3">Your Boat</h1>
      <img alt="Vue logo" src="../assets/logo.png">
      <p class="lead">This site is using vue.js</p>
    </div>
  </div>
</template>

<style>
  .hero {
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("../assets/boat-bg.jpg") no-repeat center top;
    background-size: cover;
    height:100vh;
    text-align: center;
  }
  .hero .lead {
    margin-top: 7rem;
    font-weight: 200;
    font-size: 1.5rem;
    color: white;
  }
</style>
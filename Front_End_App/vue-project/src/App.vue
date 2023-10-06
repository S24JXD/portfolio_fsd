<template>
  <div class="p-3 mb-2 bg-dark text-white ">
    <nav  class="navbar navbar-light bg-dark">
      <form class="form-inline ">

      <router-link href="#" class="text-info " to="/"><button class="btn btn-outline-info" type="button">Home</button> </router-link>

      <router-link href="#" class="text-info" to="/Login"><button class="btn btn-outline-info" type="button">Login</button></router-link>
    </form>
    </nav>
    <router-view />
  </div>





</template>
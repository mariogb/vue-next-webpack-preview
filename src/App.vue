<template>
  <img src="./logo.png" />
  <h1>Hello Vue 3!</h1>
  <button @click="inc">Clicked {{ count }} times.</button>
  <div>
    <router-link to="/welcome">Welcome</router-link>|
    <router-link to="/about">About</router-link>
  </div>
  <div>
    <auth-lon />
  </div>
  <div class="auth_part" lang="aaa" title="Autenticado">
    <div v-if="isAuth">
      <a-b-c-lon />
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";

import { authStore } from "./store/auth-store";
import AuthLon from "./components/AuthLon.vue";
import ABCLon from "./components/ABCLon.vue";

export default {
  components: { AuthLon, ABCLon },
  setup() {
    const count = ref(0);
    const inc = () => {
      count.value++;
    };

    return {
      count,
      inc,
      authLonState: authStore.getState(),
      isAuth: computed(() => {
        return authStore.isAuth();
      })
    };
  }
};
</script>

<style scoped>
img {
  width: 200px;
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>

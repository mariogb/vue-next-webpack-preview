<template>
  <div>
    <div v-if="isAuth!==true">
      <input type="text" name="username" v-model="username" />
      <input type="password" name="password" v-model="password" />
      <button @click="doLogin()">[Login]</button>
      <p class="login_error">{{loginError}}</p>

      <div>
        <input type="text" v-model="server2" />
        <button @click="putUrlLogin()">putUrlLogin</button>
      </div>
    </div>
    <button v-if="isAuth===true" @click="doLogout()">[Logout]</button>

    <a v-bind:href="'https://'+server2" target="_nww">https://{{server2}}</a>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { authStore } from "../store/auth-store";

export default {
  setup() {
    const username = ref("admin");
    const password = ref("1234");
    const server2 = ref(authStore.urlLogin());
    const doLogin = () => {
      authStore.doLogin(username.value, password.value);
    };

    const doLogout = () => {
      authStore.doLogout();
    };

    //const isAuth2 = computed(()=> this.state.access_token!==null )

    const putUrlLogin = () => {
      authStore.putUrlLogin(server2.value);
    };

    return {
      username,
      password,
      doLogin,
      doLogout,
      isAuth: computed(() => authStore.isAuth()),
      loginError: computed(() => authStore.getState().error),
      urlLogin: computed(() => authStore.urlLogin()),
      server2,
      putUrlLogin
      // putUrlLogin:authStore.putUrlLogin
    };
  }
};
</script>
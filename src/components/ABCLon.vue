<template>
  <div class="abc">
    <span>ABC</span>
   
     <template v-for="(dc,dcn) in mdcModel.mapa">
         <li :key="'mm_'+dcn">{{dcn}}</li>
     </template>

  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue"
import { authStore } from "../store/auth-store"
import { dcModelStore } from "../store/dcmodel-store"

export default {
  setup() {

    console.log("running setup of abcLon")  

    onMounted(() => {
      console.log("Component mounted!");
       dcModelStore.loadMasterModel() 

    });

    return {
      a: 1,
      //mdcModel: computed(() => dcModelStore.getState().mapa)
       mdcModel:dcModelStore.getState()
    };
  }
};
</script>
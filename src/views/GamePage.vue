<script>
import axios from 'axios';
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      user: [],
      isPopoutOpen: false,
      isPopoutRegister: false,
      name: '',
      password: '',
      wallet: '',
      isError: false,
      errortext: '',
    };
  },

  computed: mapGetters(["users"]),

  mounted() {

  },

  methods: {
    async login(evt) {
      evt.preventDefault();
      const user = await this.$store.dispatch('login', {
        name: this.name,
        password: this.password
      });
      if (user) {
        this.$router.push('/game');
      }
    },

    async tokenplus(evt){ 
    evt.preventDefault();
        this.users.user.sstoken += 1
        await axios.post('/user/token', {
            userId: this.users.user._id,
            sstoken: this.users.user.sstoken
        })
    }
  },
}
</script>

<template>
        <div class="bg-stone-950 w-full h-[100%] mx-auto">
            <p class="center text-2xl mx-auto text-center relative py-12">Hello, {{ this.users.user.name }}</p>
            <form @submit="tokenplus">
            <p class="center text-center text-5xl py-[10vh]">{{ this.users.user.sstoken }}</p>
            <button class="btntwoo mx-auto animate-spin" type="submit">
                <img src="../assets/sscoins.png" class="">
            </button>
            <ul class="flex btntwoo my-[10%]">
                <li class="mx-2"><button class="mt-4 content-center border-4 border-white w-[10vh] h-[40px] rounded-2xl hover:border-1 hoverborder-cyan-50 hover:border-2 text-center items-center mx-auto">Buffs</button></li>
                <li class="mx-2"><button class="mt-4 content-center border-4 border-white w-[10vh] h-[40px] rounded-2xl hover:border-1 hoverborder-cyan-50 hover:border-2 text-center items-center mx-auto">Trade</button></li>
                <li class="mx-2"><button class="mt-4 content-center border-4 border-white w-[10vh] h-[40px] rounded-2xl hover:border-1 hoverborder-cyan-50 hover:border-2 text-center items-center mx-auto">Donate</button></li>
            </ul>
        </form>
        </div>
</template>

<style>
html {
    overflow: hidden;
    color: white;
    font-family: 'Montserrat';
    overflow-y: hidden;
    overflow-x: hidden;
}

.popout1 {
    position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
}

.popout-content1 {
    background-color: #151515;
  padding: 20px;
  width: 40vh;
  display: inline-block;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.btntwoo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-control {
    width: 98%;
    margin-top: 40px;
    height: 5vh;
    background-color: #404040;
    color: white;
    border-radius: 0.5vh;
    border: none;
    padding-left: 10px;
}

.form-control :active {
    border: none;
}
</style>

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
      usertg: [],
      tgUserData: [],
      bitcoinPrice: 0,
    };
  },

  computed: mapGetters(["users"]),

  mounted() {
    this.getUser();
    this.tguserlogin();
  },

  methods: {
    onClose() {
      window.Telegram.WebApp.close();
    },

    async getUser() {
      this.usertg = window.Telegram.WebApp.initDataUnsafe.user
    },
    
    async tguserlogin() {
      const response = await axios.post('/tguser/tglogin', {
      tgid: this.usertg.id
  })

  this.user = response.data;
  this.tgUserData = response.data;
    },

    async getBitcoinPrice() {
    try {
      const response = await axios.get('/bitcoin-price');
      this.bitcoinPrice = response.data.price;
    } catch (error) {
      console.error(`Ошибка при получении цены Bitcoin: ${error}`);
    }
  },
  
    async tokenplus(evt) {
      evt.preventDefault();

      this.tgUserData.tgUserData.sscoins += 1
      
      await axios.post('/tguser/token', {
        tgid: this.tgUserData.tgUserData.tgid,
        sscoins: this.tgUserData.tgUserData.sscoins
      })
    }
  }
}
</script>

<template>
        <div class="bg-stone-950 w-full h-[1080px] mx-auto">
            <p class="center text-2xl mx-auto text-center relative py-3">Hello, {{ this.usertg.username }}</p>
            <form @submit="tokenplus">
               <li class="mx-2"><p class="mt-4 content-center border-4 border-white w-[10vh] h-[40px] rounded-2xl hover:border-1 hoverborder-cyan-50 hover:border-2 text-center items-center mx-auto" @click="onClose">Bitcoin price {{ this.bitcoinPrice }}</button></p>
            <p class="center text-center text-5xl py-[10vh]">{{this.tgUserData.tgUserData.sscoins}}</p>
            <button class="btntwoo mx-auto animate-spin" type="submit">
                <img src="../assets/sscoins.png" class="">
            </button>
            <ul class="flex btntwoo my-[10%]">
                <li class="mx-2"><p class="mt-4 content-center border-4 border-white w-[10vh] h-[40px] rounded-2xl hover:border-1 hoverborder-cyan-50 hover:border-2 text-center items-center mx-auto" @click="onClose">Bitcoin price {{ this.bitcoinPrice }}</button></p>
                <li class="mx-2"><button class="mt-4 content-center border-4 border-white w-[10vh] h-[40px] rounded-2xl hover:border-1 hoverborder-cyan-50 hover:border-2 text-center items-center mx-auto" @click="onClose">Trade</button></li>
                <li class="mx-2"><button class="mt-4 content-center border-4 border-white w-[10vh] h-[40px] rounded-2xl hover:border-1 hoverborder-cyan-50 hover:border-2 text-center items-center mx-auto" @click="onClose">Donate</button></li>
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

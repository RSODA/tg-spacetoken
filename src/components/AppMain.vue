<script>
import axios from 'axios';

export default {
  data() {
    return {
      isPopoutOpen: false,
      isPopoutRegister: false,
      name: '',
      password: '',
      wallet: '',
      isError: false,
      errortext: '',
    };
  },

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
  },
}
</script>

<template>
        <div class="bg-stone-950 w-full h-[1080px] mx-auto">
            <div class="popout1">
                <div class="popout-content1">
                    <p class="center text-2xl font-bold text-center" >Вход в аккаунт</p>
                    <form @submit="login">
    <input class="form-control" v-model="name" placeholder="Имя пользователя">
    <input class="form-control" v-model="password" placeholder="Пароль" type="password">
    <div v-if="isError" class="error">
        {{ this.errortext }}
    </div>
    <button class="btntwoo mt-4 content-center border-4 border-white w-1/3 h-[40px] rounded-2xl hover:border-1 hoverborder-cyan-50 hover:border-2 text-center items-center mx-auto" type="submit">
      Войти
    </button>
  </form>
                </div>
            </div>
        </div>
</template>

<style>
html {
    overflow: hidden;
    color: white;
    font-family: 'Montserrat';
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
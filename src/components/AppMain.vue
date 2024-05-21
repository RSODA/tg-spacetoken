<script>
import axios from 'axios';

export default {
  data() {
    return {
      server: [],
      isPopoutOpen: false,
      isPopoutRegister: false,
      name: '',
      password: '',
      wallet: '',
      isError: false,
      errortext: '',
      bitcoinPrice: 0
    };
  },

  mounted() {
    this.loadServer();
    this.getBitcoinPrice();
  },

  methods: {
    async loadServer() {
        let response = await axios.get('/server/all');
        this.server = response.data;
    },
    play() {
        this.isPopoutOpen = true;
    },

    async getBitcoinPrice() {
    try {
      const response = await axios.get('/bitcoin-price');
      this.bitcoinPrice = response.data.price;
    } catch (error) {
      console.error(`Ошибка при получении цены Bitcoin: ${error}`);
    }
  },

    registers() {
        this.isPopoutLogin = false;
        this.isPopoutRegister = true;
    },
    logins() {
        this.isPopoutRegister = false;
        this.isPopoutLogin = true;
    },
    async login(evt) {
      evt.preventDefault();
      const user = await this.$store.dispatch('login', {
        name: this.name,
        password: this.password
      });
      if (user) {
        this.$router.push('/market');
      }
    },
    async register(evt) {
      evt.preventDefault();
      const user = await this.$store.dispatch('register', {
        name: this.name,
        password: this.password,
        wallet: this.wallet
      });
      if (user) {
        this.$router.push('/market');
      }
    }

  },
}
</script>



<template>
<header>
    <div class="container mx-auto">
    <div class="main w-1/2 xl:w-1/2">
        <h1 class="text-5xl lg:text-7xl">SPACE SHEEP</h1>
        <span class="text-3xl xl:text-4xl">Сервера minecraft, где каждый сможет найти <br>что-то для себя: классическая спокойная Vanilla, интересная и захватывающая Forge. Мы знаем, что нужно для комфортной игры на сервере.</span>
        <div class="twobtn">
            <p>Цена Bitcoin: {{ this.bitcoinPrice }}</p>
            <button class="btnone">Начать играть</button>
            <button class="btntwo ml-5 lg:ml-10">Помощь</button>
        </div>
    </div>
    <button class="defbtn xl:w-96 md:w-48" @click="registers">Вход</button>
    <div v-if="isPopoutRegister" class="popout1">
                <div class="popout-content1">
                    <form @submit="login">
    <input class="form-control" v-model="name" placeholder="Имя пользователя">
    <input class="form-control" v-model="password" placeholder="Пароль" type="password">
    <div v-if="isError" class="error">
        {{ this.errortext }}
    </div>
    <p class="loginsp">Нету аккаунта<button @click="logins" class="logins">зарегистрировться</button></p>
    <button class="btntwoo" type="submit">
      Войти
    </button>
  </form>
                </div>
            </div>
            <div v-if="isPopoutLogin" class="popout1">
                <div class="popout-content1" v-for="server in server" :key="server._id">
                    <form @submit="register">
    <input class="form-control" v-model="name" placeholder="Имя пользователя(Желательно указывайте игровой ник)">
    <input class="form-control" v-model="password" placeholder="Пароль" type="password">
    <input class="form-control" v-model="wallet" placeholder="Номер кошелька 4-цифры" type="number">
    <div v-if="isError" class="error">
        Имя пользователя или кошелька занято попробуйте другой
    </div>
    <p class="loginsp">Есть аккаунт<button @click="registers" class="logins">войти в аккант?</button></p>
    <button class="btntwoo" type="submit">
      Войти
    </button>
  </form>
                </div>
            </div>
            </div>
</header>
<main>
    <h1>Наши сервера</h1>
    <div class="servers">
        <div class="vanilla">
            <h2>Vanilla</h2>
        </div>
        <div class="forge">
            <h2>Forge</h2>
            <ul class="cardProduct" v-for="server in server" :key="server._id">
                <li class="descriptions">{{ server.descriptions }}</li>
            </ul>
            <button class="btnplay" @click="play()">Начать играть</button>
            <div v-if="isPopoutOpen" class="popout">
                <div class="popout-content" v-for="server in server" :key="server._id">
                    <div class="otstup">
                    <h3>FORGE</h3>
                    <span class="full">{{ server.fulldescriptions }}</span>
                    <br>
                    <br>
                    <span class="full">ip: {{ server.ip }}</span>
                    <button class="btndng">Закрыть</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</main>
<footer>
    <span>SpaceSheep© 2022</span>
    <div class="social">
    <a href="https://vk.com/spacesheepcraft" class="vk"><img src="../assets/image 1.png"></a>
    <a href="" class="discord"><img src="../assets/image 2.png"></a>
</div>
</footer>
</template>

<style>
html {
    margin-top: -10px;
    margin-left: -10px;
}

header {
    background: url(../assets/back.jpg);
    width: 100%;
    height: 103vh;
    background-size: cover;
    background-repeat: no-repeat;
    flex-direction: row;
}

.loginsp {
    font-size: 16px;
    font-family: 'Montserrat';
    font-weight: 500;
    color: rgba(255, 255, 255, 0.45);
}

.logins {
    font-size: 16px;
    font-family: 'Montserrat';
    font-weight: 500;
    color: rgba(255, 255, 255, 1.0);
    border: none;
    background-color: rgba(255, 255, 255, 0.0);
    cursor: pointer;
    position: relative;
}

.logins::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    width: 100%;
    background-color: rgba(255, 255, 255, 1.0);
    transition: width 0.4s ease-in-out;
}

.logins:hover::after {
    width: 0;
}

.full {
    font-family: 'Montserrat';
    font-size: 3vh;
    font-weight: 500;
    margin-top: -4vh;
}

.otstup {
    width: 85%;
    margin-left: 10%;
}

.error {
    color: red;
    font-family: 'Montserrat';
    font-size: 11px;
    font-weight: 600;
    margin-top: 10px;
}

.main {
    width: 93vh;
    height: 55vh;
    margin-left: 5%;
    margin-top: 11%;
    color: aliceblue;
    position: absolute;
    z-index: 1;
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
  width: 20%;
  display: inline-block;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
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




h3 {
    font-size: 7vh;
    margin-top: 0vh;
    font-family: 'Montserrat';
    color: white;
}

.main h1 {
    font-family: "Montserrat", sans-serif;
    font-weight: 800;
    margin: 12px;
    margin-left: 0px;
    margin-top: 5vh;
    padding-top: -2vh;
    width: 93vh;
}

.popout {
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
  overflow: hidden;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}


.popout-content {
  background-color: #151515;
  padding: 20px;
  width: 88vh;
  height: 46vh;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.btnplay {
    width: 99.5%;
    height: 10%;
    margin-left: 3px;
    margin-top: 30%;
    border-radius: 0 0px 16px 16px;
    border: none;
    color: white;
    font-size: 2vh;
    font-family: 'Montserrat';
    cursor: pointer;
    background-color: #151515;
}

.twobtn {
    margin-top: 20px
}

.defbtn {
    position: absolute;
    height: 13vh;
    margin-top: 28vh;
    border-radius: 16px;
    margin-left: 65%;
    border: none;
    background-color: rgba(0, 0, 0, 0.81);
    color: white;
    font-size: 5vh;
    font-weight: 900;
    font-family: 'Montserrat';
    cursor: pointer;
}

.btnone {
    border: none;
    width: 22vh;
    height: 7vh;
    border-radius: 8px;
    background-color: white;
    color: black;
    font-family: 'Montserrat';
    font-weight: 800;
    font-size: 2vh;
    cursor: pointer;
}

.btntwo {
    margin-left: 6vh;
    border: none;
    width: 22vh;
    height: 7vh;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.00);
    border: 1px solid white;
    color: white;
    font-family: 'Montserrat';
    font-weight: 800;
    font-size: 2vh;
    cursor: pointer;
}

.btntwoo {
    margin-left: auto;
    border: none;
    width: 14vh;
    height: 5vh;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.00);
    border: 1px solid white;
    color: white;
    font-family: 'Montserrat';
    font-weight: 800;
    font-size: 2vh;
    cursor: pointer;
    margin-left: 30%;
    margin-top: 0%;
}

.vanilla {
    width: 60vh;
    height: 40vh;
    margin-left: 0%;
    background-color: black;
    border-radius: 16px;
}

li {
    text-decoration: none;
    list-style-type: none;
}

.descriptions {
    font-size: 3vh;
    font-family: 'Montserrat';
    color: white;
    margin-top: 23%;
    padding-left: 1.7vh;
}

.servers {
    width: 100%;
    margin-top: 10%;
    position: absolute;
    justify-content: center;
    display: flex;
}

.forge {
    width: 60vh;
    height: 40vh;
    margin-left: 5%;
    border-radius: 16px;
}



.main span {
    font-family: "Montserrat", sans-serif;
    font-weight: 200;
    margin-top: 0vh;
    line-height: 1.5;
}

main {
    width: 100%;
    height: 94vh;
    background-color: #202020;
    margin-top: -1vh;
}

main h1 {
    position: absolute;
    top: 108%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 7vh;
    font-weight: 800;
    text-align: center;
    font-family: 'Montserrat';
    color: white;
}
main h2 {
    position: absolute;
    padding-left: 17%;
    padding-top: 2%;
    transform: translate(-50%, -50%);
    font-size: 7vh;
    font-weight: 800;
    font-family: 'Montserrat';
    color: white;
}

main span {
    color: white;
}

.vanilla {
    background-image: url(../assets/Rectangle2.png);
}

.forge {
    background-image: url(../assets/Rectangle1.png);
}

footer {
    width: 100%;
    height: 28vh;
    background-color: #0C0C0C;
    position: absolute;
}

footer span {
    position: absolute;
    color: #D5D5D5;
    font-family: 'Montserrat';
    font-weight: 800;
    font-size: 3vh;
    margin-top: 2%;
    margin-left: 8%;
}

.social {
    margin-top: 5%;
    margin-left: 8%;
}

.social a {
    text-decoration: none;
    text-transform: none;
    list-style-type: none;
    color: black;
}

.vk {
    width: 14vh;
    height: 8vh;
}

.discord {
    margin-left: 20px;
}
</style>

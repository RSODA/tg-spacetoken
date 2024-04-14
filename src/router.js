import { createRouter, createWebHistory } from 'vue-router';
import AppMain from './components/AppMain.vue';
import store from './app/store.js';
import Game from './views/GamePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppMain,
    },
    {
      path: '/game',
      name: 'game',
      component: Game,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
if (to.matched.some(record => record.meta.requiresAuth)) {
  if (!store.state.user) {
    next('/'); 
  } else {
    next(); 
  }
} else {
  next(); 
}
});

export default router;

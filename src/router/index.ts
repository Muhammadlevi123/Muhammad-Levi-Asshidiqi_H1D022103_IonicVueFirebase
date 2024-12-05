import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/adm/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import { useAuthStore } from '@/stores/auth';
import ProfilePage from '@/views/ProfilePage.vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import AddForm from '@/views/adm/AddForm.vue';
import EditForm from '@/views/adm/EditForm.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      isAuth: false,
    },
  },
  {
    path: '/adm/home',
    name: 'home',
    component: HomePage,
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
    meta: {
      isAuth: true,
    },
  },

  {
    path: "/adm/home/addform",
    name: "addform",
    component: AddForm,
  },
  {
    path: "/adm/home/editform",
    name: "editform",
    component: EditForm,
  }

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.user === null) {
    await new Promise<void>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, () => {
        resolve();
        unsubscribe();
      });
    });
  }

  if (to.path === '/login' && authStore.isAuth) {
    next('/home');
  } else if (to.meta.isAuth && !authStore.isAuth) {
    next('/login');
  } else {
    next();
  }
});

export default router;

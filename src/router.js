import {createRouter, createWebHistory} from 'vue-router';
import CoachesList from './components/pages/CoachesList.vue';
import NotFound from './components/pages/NotFound.vue';
import store from './store/index.js';

const CoachDetails = ()=>import('./components/pages/CoachDetails.vue');
const CoachRegistration = ()=>import('./components/pages/CoachRegistration.vue');
const ContactCoach = ()=>import('./components/pages/ContactCoach.vue');
const RequestsList = ()=>import('./components/pages/RequestsList.vue');
const UserAuth = ()=>import('./components/pages/UserAuth.vue');

const router = createRouter({
   
    history: createWebHistory(),
    routes : [
        { path: '/coaches', component: CoachesList, alias: '/' },
        { path: '/coaches/:id', component: CoachDetails, 
            props: true,
            children:[
            { path: 'contact/', component: ContactCoach}, // /coaches/c1/contact
        ] },
        { path: '/requests', component: RequestsList, meta: {requiresAuth: true} },
        { path: '/register', component: CoachRegistration, meta: {requiresAuth: true}},
        { path: '/auth', component: UserAuth, meta: {requiresUnauth: true} },
        { path: '/:notFound(.*)', component: NotFound }
        
      ]
  })

  router.beforeEach(function(to, _, next){
    if (to.meta.requiresAuth && !store.getters.isAuthenticated){
        next('/auth');
    }else if (to.meta.requiresUnauth && store.getters.isAuthenticated){
        next('/coaches');
    }else{
        next();
    }
  });
  export default router;
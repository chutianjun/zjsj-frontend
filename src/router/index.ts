import { createRouter, createWebHistory } from 'vue-router'
import OpportunityList from '../views/OpportunityList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'opportunities', component: OpportunityList },
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import OpportunityList from '../views/OpportunityList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'opportunities', component: OpportunityList },
    {
      path: '/csce4/project_analysis_dashboard',
      name: 'projectAnalysisDashboard',
      component: () => import('../views/csce4/ProjectAnalysisDashboard.vue'),
    },
  ],
})

export default router

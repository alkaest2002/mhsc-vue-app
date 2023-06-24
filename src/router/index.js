import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { routerBeforeEach } from '../composables/router'
import pageNotFound from '@/views/PageNotFound.vue'

// init router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    {
      path: '/:catchAll(.*)',
      name: 'route-not-found',
      component: pageNotFound
    }
  ]
})

// router 'before each' middleware
router.beforeEach(routerBeforeEach)

export default router

import HomeView from '@/views/HomeView.vue'
import { useChecklistStore } from '@/stores/checklist.store'

const disclaimerGuard = () => {
  const { disclaimer } = useChecklistStore()
  if (!disclaimer) return { name: 'start' }
  return true
}

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/start',
    name: 'start',
    component: () => import('@/views/StartView.vue')
  },
  {
    path: '/bio',
    name: 'bio',
    component: () => import('@/views/BioView.vue'),
    beforeEnter: disclaimerGuard
  },
  {
    path: '/checklist',
    name: 'checklist',
    component: () => import('@/views/ChecklistView.vue'),
    beforeEnter: disclaimerGuard
  },
  {
    path: '/qrcode',
    name: 'qrcode',
    component: () => import('@/views/QRCodeView.vue'),
    beforeEnter: disclaimerGuard
  }
]

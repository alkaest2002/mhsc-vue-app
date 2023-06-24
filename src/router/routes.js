import StartView from '@/views/StartView.vue'
import { useChecklistStore } from '@/stores/checklist.store'

const disclaimerGuard = () => {
  const { disclaimer } = useChecklistStore()
  if (!disclaimer) return { name: 'start' }
  return true
}

export const workersRoutes = [
  {
    path: '/',
    name: 'start',
    component: StartView
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('@/views/InfoView.vue')
  },
  {
    path: '/disclaimer',
    name: 'disclaimer',
    component: () => import('@/views/DisclaimerView.vue')
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
    path: '/generate-qrcode',
    name: 'qrcode',
    component: () => import('@/views/QRCodeView.vue'),
    beforeEnter: disclaimerGuard
  }
]

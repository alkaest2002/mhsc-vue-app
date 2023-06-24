import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app.store'
import { useChecklistStore } from '@/stores/checklist.store'
import StartView from '@/views/StartView.vue'

// disclaimer guard
const disclaimerGuard = () => {
  const checklistStore = useChecklistStore()
  const { disclaimer } = storeToRefs(checklistStore)
  if (!disclaimer.value) return { name: 'start' }
  return true
}

// define routes
export const routes = [
  {
    path: '/',
    name: 'start',
    component: StartView
  },
  {
    path: '/ame',
    name: 'ame',
    beforeEnter: () => {
      const appStore = useAppStore()
      const { userIsAME } = storeToRefs(appStore)
      userIsAME.value = true
      return { name: 'start' }
    },
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
    name: 'qrcode-generate',
    component: () => import('@/views/QRCodeGenerateView.vue'),
    beforeEnter: disclaimerGuard
  },
  {
    path: '/scan-qrcode',
    name: 'qrcode-scan',
    component: () => import('@/views/QRCodeScanView.vue'),
  }
]

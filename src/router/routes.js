import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app.store'
import { useChecklistStore } from '@/stores/checklist.store'
import { useReportStore } from '@/stores/report.store'
import StartView from '@/views/StartView.vue'

// disclaimer guard
const disclaimerGuard = () => {
  const checklistStore = useChecklistStore()
  const { disclaimer } = storeToRefs(checklistStore)
  if (!disclaimer.value) return { name: 'disclaimer' }
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
    path: '/role/:role',
    name: 'role',
    beforeEnter: (to) => {
      const appStore = useAppStore()
      const { userIsAME } = storeToRefs(appStore)
      userIsAME.value = to.params?.role?.toLowerCase() === 'ame'
      return { name: 'start' }
    }
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
    component: () => import('@/views/QRCodeScanView.vue')
  },
  {
    path: '/review-report',
    name: 'review-report',
    component: () => import('@/views/ReviewReport.vue'),
    beforeEnter: () => {
      const { reportData } = storeToRefs(useReportStore())
      if (reportData.value === null) return { name: 'qrcode-scan' }
      return true
    }
  }
]

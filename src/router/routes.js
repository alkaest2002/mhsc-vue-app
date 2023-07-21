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

// report guard
const reportGuard = () => {
  const { reportData } = useReportStore()
  if (reportData == '') return { name: 'qrcode-scan-start' }
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
    path: '/qrcode-generate',
    name: 'qrcode-generate',
    component: () => import('@/views/QRCodeGenerateView.vue'),
    beforeEnter: disclaimerGuard
  },
  {
    path: '/qrcode-scan',
    name: 'qrcode-scan',
    component: () => import('@/views/QRCodeScanView.vue'),
    redirect: { name: 'qrcode-scan-start' },
    children: [
      {
        path: 'start',
        name: 'qrcode-scan-start',
        component: () => import('@/views/QRCodeScanView__start.vue')
      },
      {
        path: 'scan',
        name: 'qrcode-scan-scan',
        component: () => import('@/views/QRCodeScanView__scan.vue'),
        beforeEnter: (_, { name }) => {
          console.log(name)
          if (!name) return { name: 'qrcode-scan-start' }
        }
      },
      {
        path: 'review',
        name: 'qrcode-scan-review',
        component: () => import('@/views/QRCodeScanView__review.vue'),
        beforeEnter: reportGuard
      },
      {
        path: 'end',
        name: 'qrcode-scan-end',
        component: () => import('@/views/QRCodeScanView__end.vue'),
        beforeEnter: reportGuard
      }
    ]
  }
]

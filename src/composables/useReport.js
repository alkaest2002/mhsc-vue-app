/* eslint-disable no-unused-vars */
import { createApp, h } from 'vue'
import ReportTemplate from '@/components/report/ReportTemplate.vue'
import ReportBase from '@/components/report/ReportBase.html?raw'

const { report: { showReport } } = window.appSettings

export const renderReport = (checklist, report, reportData) => {
  // create temporary div
  const el = document.createElement('div')
  // create report on the fly
  const reportApp = createApp({
    name: 'ReportFragment',
    render: () => h(ReportTemplate, { checklist, report, reportData })
  })
  // create report fragment
  const reportHtmlFragment = reportApp.mount(el).$el.outerHTML
  // return rendered report
  return ReportBase.replace('#fragment#', reportHtmlFragment)
}

const showReportOnScreen = (report) => {
   // create new blob
   const blob = new Blob([report], { type: 'text/html' })
   // create fake link
   const link = document.createElement('a')
   // add href attribute to fake link
   link.href = URL.createObjectURL(blob)
   // add attribute
   link.target = '_blank'
   // click fake link
   link.click()
   // revoke object url
   URL.revokeObjectURL(link.href)
   // remove fake link
   link.remove()
}

export const getReport = (report, isLoading) => {
  // start spinner
  isLoading.value = true
  if (showReport) showReportOnScreen(report)
  // stop spinner
  isLoading.value = false
}

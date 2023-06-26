/* eslint-disable no-unused-vars */
import { createApp, h } from 'vue'
import ReportTemplate from '@/components/report/ReportTemplate.vue'
import ReportBase from "@/components/report/ReportBase.html?raw";

export const renderReport = (checklist, report, reportData) => {
  // create temporary div
  const el = document.createElement('div')
  // create report on the fly
  const reportApp = createApp({
    name: "ReportFragment",
    render: () => h(ReportTemplate, { checklist, report, reportData }),
  });
  // create report fragment
  const reportHtmlFragment = reportApp.mount(el).$el.outerHTML
  // return rendered report
  return ReportBase.replace("#fragment#", reportHtmlFragment);
}

export const downloadReport = (report, isLoading) => {
  // start spinner
  isLoading.value = true
  // create new blob
  const blob = new Blob([report], { type: 'text/html' })
  // create fake link
  const link = document.createElement('a')
  // add href attribute to fake link
  link.href = URL.createObjectURL(blob)
  // add download attribute to fake link
  link.download = 'report.html'
  // click fake link
  link.click()
  // revoke object url
  URL.revokeObjectURL(link.href)
  // remove fake link
  link.remove()
  // stop spinner
  isLoading.value = false
}

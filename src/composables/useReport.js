/* eslint-disable no-unused-vars */
import { createApp, h } from 'vue'
import { storeToRefs } from 'pinia'
import ReportTemplate from '@/components/report/ReportTemplate.vue'
import ReportBase from '@/components/report/ReportBase.html?raw'
import { useReportStore } from '@/stores/report.store'

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

const showReport = (report, directDownload) => {
  // create new blob
  const blob = new Blob([report], { type: 'text/html' })
  // create fake link
  const link = document.createElement('a')
  // add href attribute to fake link
  link.href = URL.createObjectURL(blob)
  // add attribute
  link.target = '_blank'
  // if direct download
  if (directDownload) {
    // add download attribute
    link.download = "report.html"
  }
  // click fake link
  link.click()
  // revoke object url
  URL.revokeObjectURL(link.href)
  // remove fake link
  link.remove()
}

function closePrint() {
  // remove fake iframe
  document.body.removeChild(this.__container__)
}

function setPrint() {
  this.contentWindow.__container__ = this
  this.contentWindow.onbeforeunload = closePrint
  this.contentWindow.onafterprint = closePrint
  this.contentWindow.focus()
  this.contentWindow.print()
}

function printReport(report) {
  // create fake iframe element
  const hideFrame = document.createElement('iframe')
  // on load content fn
  hideFrame.onload = setPrint
  // styling fake iframe
  hideFrame.style.position = 'fixed'
  hideFrame.style.right = '0'
  hideFrame.style.bottom = '0'
  hideFrame.style.width = '0'
  hideFrame.style.height = '0'
  hideFrame.style.border = '0'
  // set content of fake iframe
  hideFrame.srcdoc = report
  // append fake iframe to body
  document.body.appendChild(hideFrame)
}

export const getReport = (reportDoc, isLoading) => {
  // access pinia appStore props
  const { typeOfReport } = storeToRefs(useReportStore())
  // start spinner
  isLoading.value = true
  // report type is screen
  if (typeOfReport.value === 'screen') showReport(reportDoc, false)
   // report type is download
  if (typeOfReport.value === 'download') showReport(reportDoc, true)
   // report type is print
  if (typeOfReport.value === 'print') printReport(reportDoc)
  // stop spinner
  isLoading.value = false
}

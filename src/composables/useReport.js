/* eslint-disable no-unused-vars */
import { createApp, h } from 'vue'
import ReportTemplate from '@/components/report/ReportTemplate.vue'
import ReportBase from '@/components/report/ReportBase.html?raw'

const appSettings =  window.appSettings
const showReport = appSettings?.report?.showReportBeforePrint

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

export const getReport = (report, isLoading) => {
  // start spinner
  isLoading.value = true
  // if report should be shown before printing
  if (showReport) {
    //show report
    showReportOnScreen(report)
  } else {
    // print report directly
    printReport(report)
  }
  // stop spinner
  isLoading.value = false
}

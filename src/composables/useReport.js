/* eslint-disable no-unused-vars */
import { createApp, h } from 'vue'
import { storeToRefs } from 'pinia'
import ReportTemplate from '@/components/report/ReportTemplate.vue'
import ReportBase from '@/components/report/ReportBase.html?raw'
import { useReportStore } from '@/stores/report.store'

export const checkReport = (reportData) => {
  // convert string to array
  const data = reportData.split(';')
  // init variables
  const surname = data[0]
  const name = data[1]
  const dob = data[2]
  const items = data.slice(3)
  const date = new Date().toISOString().slice(0, 10)
  // init flags
  const flags = Array.from({ length: items.length }, () => false)
  // check flags
  flags[0] = items[0] > 0 || items[0] == -1
  flags[1] = items[1] > 0 || items[1] == -1
  flags[2] = items[2] > 0 || items[2] == -1
  flags[3] = items[3] > 0 || items[3] == -1
  flags[4] = items[4] > 0 || items[4] == -1
  flags[5] = items[5] > 0 || items[5] == -1
  flags[6] = items[6] > 0 || items[6] == -1
  flags[7] = items[7] > 0 || items[7] == -1
  flags[8] = items[8] > 0 || items[8] == -1
  flags[9] = items[9] > 0 || items[9] == -1
  flags[10] = items[10] > 3 || items[10] == -1
  flags[11] = items[11] > 2 || items[11] == -1
  flags[12] = items[12] > 3 || items[12] == -1
  flags[13] = items[13] > 0 || items[13] == -1
  flags[14] = items[14] > 0 || items[14] == -1
  flags[15] = items[15] > 0 || items[15] == -1
  flags[16] = items[16] > 0 || items[16] == -1
  flags[17] = items[17] > 0 || items[17] == -1
  flags[18] = items[18] > 0 || items[18] == -1
  flags[19] = items[19] > 0 || items[19] == -1
  flags[20] = items[20] < 7 || items[20] == -1
  // return data
  return { surname, name, dob, items, date, flags }
}

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
    link.download = 'report.html'
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

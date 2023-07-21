/* eslint-disable no-unused-vars */
import { createApp, h } from 'vue'
import ReportTemplate from '@/components/report/ReportTemplate.vue'
import ReportBase from '@/components/report/ReportBase.html?raw'

export const checkQRCode = (qrcodeData) => {
  // validation pattern
  const pat =
    /([A-Za-z' ]+;){2}(\d{2}){1,2}[-/]\d{2}[-/](\d{2}){1,2};([012];){10}([0123];){5}([01];){5}\d\d?/gm
  // return outcome
  return qrcodeData !== null && qrcodeData.match(pat)?.length > 0
}

export const processAndFlagReport = (reportData) => {
  // convert string to array
  const data = reportData.split(';')
  // init variables
  const surname = data[0]
  const name = data[1]
  const birthWhen = data[2]
  const answers = data.slice(3)
  const date = new Date().toISOString().slice(0, 10)
  // init flags
  const flags = Array.from({ length: 21 }, () => false)
  // check flags
  flags[0] = answers[0] > 0 || answers[0] == -1
  flags[1] = answers[1] > 0 || answers[1] == -1
  flags[2] = answers[2] > 0 || answers[2] == -1
  flags[3] = answers[3] > 0 || answers[3] == -1
  flags[4] = answers[4] > 0 || answers[4] == -1
  flags[5] = answers[5] > 0 || answers[5] == -1
  flags[6] = answers[6] > 0 || answers[6] == -1
  flags[7] = answers[7] > 0 || answers[7] == -1
  flags[8] = answers[8] > 0 || answers[8] == -1
  flags[9] = answers[9] > 0 || answers[9] == -1
  flags[10] = answers[10] > 3 || answers[10] == -1
  flags[11] = answers[11] > 2 || answers[11] == -1
  flags[12] = answers[12] > 3 || answers[12] == -1
  flags[13] = answers[13] > 0 || answers[13] == -1
  flags[14] = answers[14] > 0 || answers[14] == -1
  flags[15] = answers[15] > 0 || answers[15] == -1
  flags[16] = answers[16] > 0 || answers[16] == -1
  flags[17] = answers[17] > 0 || answers[17] == -1
  flags[18] = answers[18] > 0 || answers[18] == -1
  flags[19] = answers[19] > 0 || answers[19] == -1
  flags[20] = answers[20] < 7 || answers[20] == -1
  // return data
  return { surname, name, birthWhen, answers, date, flags }
}

export const renderReport = (checklist, report, reportData, highlightPositiveItems) => {
  // create temporary div
  const el = document.createElement('div')
  // create report on the fly
  const reportApp = createApp({
    name: 'ReportFragment',
    render: () =>
      h(ReportTemplate, {
        checklist,
        report,
        highlightPositiveItems,
        ...processAndFlagReport(reportData)
      })
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

export const getReport = (typeOfReport, renderedReport, isLoading) => {
  // start spinner
  isLoading.value = true
  // report type is screen
  if (typeOfReport.value === 'screen') showReport(renderedReport.value, false)
  // report type is download
  if (typeOfReport.value === 'download') showReport(renderedReport.value, true)
  // report type is print
  if (typeOfReport.value === 'print') printReport(renderedReport.value)
  // stop spinner
  isLoading.value = false
}

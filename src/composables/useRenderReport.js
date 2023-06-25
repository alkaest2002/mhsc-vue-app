/* eslint-disable no-unused-vars */

export const renderReport = (reportTemplate, reportData, checklistJSON) => {
  console.log(reportTemplate, reportData, checklistJSON)
  return reportTemplate
}

export const downloadReport = (report, isLoading) => {
  // start spinner
  isLoading.value = true
  // create new blob
  const blob = new Blob([report], { type: 'palin/txt' })
  // create fake link
  const link = document.createElement('a')
  // add href attribute to fake link
  link.href = URL.createObjectURL(blob)
  // add download attribute to fake link
  link.download = 'report.rtf'
  // click fake link
  link.click()
  // revoke object url
  URL.revokeObjectURL(link.href)
  // remove fake link
  link.remove()
  // stop spinner
  isLoading.value = false
}

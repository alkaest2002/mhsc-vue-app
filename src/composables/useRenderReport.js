/* eslint-disable no-unused-vars */

const padString = (stringToPad, padLenght=17, padChar = ' ') => 
  stringToPad.padEnd(padLenght, padChar).slice(0, padLenght)

export const renderReport = (reportTemplate, reportData, checklistJSON) => {
  // Possibile placeholders
  // ###surname###
  // ###name###
  // ###dob###
  // #####ITM 0 ###### ... #####ITM 20 ######
  // ###date###

  // convert string to array
  const data = reportData.split(";")

  // init data
  const surname = data[0]
  const name = data[1]
  const dob = data[2]
  const items = data.slice(3)
  const date = new Date().toISOString().slice(0, 10)

  // clone report template
  let renderedTemplate = reportTemplate

  // replace report placeholders with data
  renderedTemplate = renderedTemplate
    .replace(/###surname###/, surname)
    .replace(/###name###/, name)
    .replace(/###dob###/, dob)
    .replace(/###date###/, date)

  items.forEach((item, index) => {
    const reg = new RegExp(`#####ITM ${index}\\s?######`)
    const options = checklistJSON[index]['itemOptions']
    const selectedOption = item == -1 
      ? padString(options.slice(item)[0]['label']) 
      : padString(options[item]['label'])
    renderedTemplate = renderedTemplate.replace(reg, selectedOption)
  });
  // return rendered template
  return renderedTemplate
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

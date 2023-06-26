<script setup>
/* eslint-disable no-unused-vars, vue/no-setup-props-destructure */

// define props
const props = defineProps({
  checklist: {
    type: Object,
    required: true
  },
  report: {
    type: Object,
    required: true
  },
  reportData: {
    type: String,
    required: true
  }
})
// convert string to array
const data = props.reportData.split(';')
// init data
const surname = data[0]
const name = data[1]
const dob = data[2]
const items = data.slice(3)
const date = new Date().toISOString().slice(0, 10)
</script>

<template>
  <div>
    <h1>{{ report.title }}</h1>
    <table>
      <tr>
        <td>{{ report.bio.surname }}</td><td>{{ surname }}</td>
      </tr>
      <tr>
        <td>{{ report.bio.name }}</td><td>{{ name }}</td>
      </tr>
      <tr>
        <td>{{ report.bio.dob }}</td><td>{{ dob }}</td>
      </tr>
    </table>
    <div>
      {{ items }}
    </div>
    <div>
      {{  date }}
    </div>
  </div>
</template>
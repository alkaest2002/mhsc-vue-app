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
    <section>
      <h1>{{ report.title }}</h1>
    </section>
    <section>
      <h2>{{ report.bioTable.title.toUpperCase() }}</h2>
      <table id="report-bio-table">
        <tr>
          <td>{{ report.bioTable.surname }}</td>
          <td>{{ surname }}</td>
        </tr>
        <tr>
          <td>{{ report.bioTable.name }}</td>
          <td>{{ name }}</td>
        </tr>
        <tr>
          <td>{{ report.bioTable.dob }}</td>
          <td>{{ dob }}</td>
        </tr>
      </table>
    </section>
    <section>
      <h2>{{ report.itemsTable.title.toUpperCase() }}</h2>
      <table id="report-items-table">
        <tr v-for="(item, index) of items" :key="index">
          <td>{{ checklist[index].itemOptions[item].label }}</td>
          <td>{{ checklist[index].itemText }}</td>
        </tr>
      </table>
    </section>
    <section>
      <h2>{{ report.workerTable.title.toUpperCase() }}</h2>
      <table id="report-worker-table">
        <tr>
          <td colspan="2">
            {{ report.workerTable.disclaimer }}
          </td>
        </tr>
        <tr>
          <td>{{ report.workerTable.date }} {{ date }}</td>
          <td>{{ report.workerTable.signature }}</td>
        </tr>
      </table>
    </section>
    <section>
      <h2>{{ report.ameTable.title.toUpperCase() }}</h2>
      <table id="report-ame-table">
        <tr>
          <td>
            <div>
              <div>
                {{ report.ameTable.referral.text }}
              </div>
              <div>
                <span>&#9711; {{ report.ameTable.referral.no }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>&#9711; {{ report.ameTable.referral.yes }}</span>
              </div>
            </div>
          </td>
          <td></td>
          <td>
            {{ report.ameTable.signature }}
          </td>
        </tr>
      </table>
    </section>
  </div>
</template>
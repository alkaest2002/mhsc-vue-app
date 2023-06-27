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

const flags = Array.from({length: 21}, () => false)

flags[0] = items[0] > 0
flags[1] = items[1] > 0
flags[2] = items[2] > 0
flags[3] = items[3] > 0
flags[4] = items[4] > 0
flags[5] = items[5] > 0
flags[6] = items[6] > 0
flags[7] = items[7] > 0
flags[8] = items[8] > 0
flags[9] = items[9] > 0
flags[10] = items[10] > 3
flags[11] = items[11] > 2
flags[12] = items[12] > 3
flags[13] = items[13] > 0
flags[14] = items[14] > 0
flags[15] = items[15] > 0
flags[16] = items[16] > 0
flags[17] = items[17] > 0
flags[18] = items[18] > 0
flags[19] = items[19] > 0
flags[20] = items[20] < 7
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
          <td :class="{'emphasis': flags[index]}">{{ flags[index] ? "→" : "" }}</td>
          <td :class="{'emphasis': flags[index]}">{{ checklist[index].itemOptions[item].label }}</td>
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
              {{ report.ameTable.referral.text }}
            </div>
            <p>
              <span>&#9711; {{ report.ameTable.referral.no }}</span
              >&nbsp;&nbsp;&nbsp;&nbsp;
              <span>&#9711; {{ report.ameTable.referral.yes }}</span>
            </p>
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

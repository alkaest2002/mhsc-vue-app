<script setup>
/* eslint-disable no-unused-vars */
import { storeToRefs } from 'pinia'
import { useReportStore } from '@/stores/report.store'
import { checkReport } from '@/composables/useReport'

const { highlightPositiveItems } = storeToRefs(useReportStore())

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

const { surname, name, dob, items, date, flags } = checkReport(props.reportData)
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
          <td :class="{ emphasis: flags[index] && highlightPositiveItems }">
            {{ flags[index] ? '▶' : '' }}
          </td>
          <td :class="{ emphasis: flags[index] && highlightPositiveItems }">
            {{ checklist[index].itemOptions[item].label }}
          </td>
          <td :class="{ emphasis: flags[index] && highlightPositiveItems }">
            {{ checklist[index].itemText }}
          </td>
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

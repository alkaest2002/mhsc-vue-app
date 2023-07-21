<script setup>
/* eslint-disable no-unused-vars */

// define props
const props = defineProps({
  checklist: {
    type: Array,
    required: true
  },
  report: {
    type: Object,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  birthWhen: {
    type: String,
    required: true
  },
  answers: {
    type: Array,
    required: true
  },
  flags: {
    type: Array,
    required: true
  },
  highlightPositiveItems: {
    type: Boolean,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})
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
          <td>{{ birthWhen }}</td>
        </tr>
      </table>
    </section>
    <section>
      <h2>{{ report.itemsTable.title.toUpperCase() }}</h2>
      <table id="report-items-table">
        <tr v-for="(answer, index) of answers" :key="index">
          <td :class="{ emphasis: flags[index] && highlightPositiveItems }">
            {{ flags[index] ? '▶' : '' }}
          </td>
          <td :class="{ emphasis: flags[index] && highlightPositiveItems }">
            {{ checklist[index].itemOptions[answer].label }}
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

<template>
  <div class="calendar">
    <div class="header" style="display: flex;cursor: pointer;">
      <button @click="previousMonth">&lt;</button>
      <h2>{{ currentMonth }}月</h2>
      <button @click="nextMonth">&gt;</button>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="day in days" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, index) in calendar" :key="index">
          <td v-for="date in week" :key="date.value" :class="{ today: isToday(date), selected: isSelected(date) }"
            @click="selectDate(date)">
            {{ date.value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      currentDate: new Date(),
      selectedDate: null,
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      calendar: [],
      currentMonth: '',
    };
  },
  watch: {
    // currentDate(val){
    //   console.log(this.currentDate.getMonth()+1);
    // }
  },
  mounted(){
    this.currentMonth = this.currentDate.getMonth() + 1
    this.init();
  },
  computed: {
    // currentMonth(){
    //   // return this.currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    //   return this.currentDate.getMonth() +1;
    // },
  },
  methods: {
    previousMonth(){
      // this.currentMonth = this.currentDate.getMonth() - 1;
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.currentMonth = this.currentDate.getMonth() + 1
      console.log(this.currentDate.getMonth()+1)
      this.init();
    },
    nextMonth(){
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.currentMonth = this.currentDate.getMonth() + 1
      console.log(this.currentDate.getMonth() + 1)
      this.init()
    },
    isToday(date){
      const today = new Date();
      return date.date.toDateString() === today.toDateString();
    },
    isSelected(date){
      return this.selectedDate && date.date.toDateString() === this.selectedDate.toDateString();
    },
    selectDate(date){
      this.selectedDate = date.date;
      console.log(this.selectedDate);
      // this.$emit('selected', this.selectedDate);
    },
    init(){
      this.calendar = [];
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);
      const startDate = new Date(firstDayOfMonth);
      startDate.setDate(startDate.getDate() - startDate.getDay());

      // const calendar = [];
      while (startDate <= lastDayOfMonth)
      {
        const week = [];
        for (let i = 0; i < 7; i++)
        {
          const date = new Date(startDate);
          week.push({ value: date.getDate(), date: date });
          startDate.setDate(startDate.getDate() + 1);
        }
        this.calendar.push(week);
      }
      // return calendar;
    }
  }
};
</script>

<style scoped>/* 添加你想要的样式 */
.calendar {
  /* 样式代码 */
}

/* 更多样式 */</style>

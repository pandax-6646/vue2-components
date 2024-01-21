<template>
  <div class>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid' // 月视图插件(按需安装)
import timeGridPlugin from '@fullcalendar/timegrid' // 周视图和日视图插件(按需安装)
import interactionPlugin from '@fullcalendar/interaction' // 接口插件(按需安装)
import listPlugin from '@fullcalendar/list' // 日程视图插件(按需安装)

export default {
  name: 'Index',
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin], // 引入的插件，比如fullcalendar/daygrid，fullcalendar/timegrid引入后才可显示月，周，日
        initialView: 'timeGridWeek', // 默认为那个视图（月：dayGridMonth，周：timeGridWeek，日：timeGridDay）
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        firstDay: 1, // 设置一周中显示的第一天是哪天，周日是0，周一是1，类推
        locale: 'zh-cn', // 切换语言，当前为中文
        eventColor: '#FFA34E', // 全部日历日程背景色
        initialDate: new Date(), // 自定义设置背景颜色时一定要初始化日期时间
        // aspectRatio: 1.65, // 设置日历单元格宽度与高度的比例。
        // displayEventTime: false, // 是否显示时间
        slotDuration: '01:00:00', // 显示时隙的频率
        allDaySlot: false,
        height: 'auto',
        buttonText: {
          today: '今天',
          month: '月',
          week: '周',
          day: '日'
        },
        slotLabelFormat: {
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
          hour12: false // 设置时间为24小时
        },
        events: [
          {
            title: '一个测试日程',
            start: '2023-01-22 12:00',
            end: '2023-01-23 13:00',
            editable: true,
            color: '#2EB09A'
          }
        ], // 日程
        businessHours: {
          daysOfWeek: [1, 2, 3, 4], // Monday - Thursday
          startTime: '10:00', // a start time (10am in this example)
          endTime: '18:00' // an end time (6pm in this example)
        }, // 强调日历上的特定时间段。默认为周一至周五，上午9点至下午5点。
        selectConstraint: {
          daysOfWeek: [1, 2, 3, 4], // Monday - Thursday
          startTime: '10:00', // a start time (10am in this example)
          endTime: '18:00' // an end time (6pm in this example)
        }, // 限制用户选择特定的时间窗口。
        // 事件
        eventClick: this.eventClick, // 点击日历日程事件
        // eventDrop: eventDrop, // 拖动日历日程事件
        // eventResize: eventResize, // 修改日历日程大小事件
        select: this.handleDateSelect, // 选中日历格事件
        // eventDidMount: this.eventDidMount, // 安装提示事件
        // loading: loading, // 视图数据加载中、加载完成触发（用于配合显示/隐藏加载指示器。）
        // selectAllow: selectAllow, //编程控制用户可以选择的地方，返回true则表示可选择，false表示不可选择
        // eventMouseEnter: eventMouseEnter, // 鼠标滑过
        editable: true, // 是否可以进行（拖动、缩放）修改
        eventStartEditable: true, // Event日程开始时间可以改变，默认true，如果是false其实就是指日程块不能随意拖动，只能上下拉伸改变他的endTime
        eventDurationEditable: true, // Event日程的开始结束时间距离是否可以改变，默认true，如果是false则表示开始结束时间范围不能拉伸，只能拖拽
        selectable: true, // 是否可以选中日历格
        selectMinDistance: 0, // 选中日历格的最小距离
        dayMaxEvents: true,
        weekends: true, // 是否在任何日历视图中包括周六/周日列。
        navLinks: false, // 确定日名和周名是否可单击
        slotEventOverlap: false // 相同时间段的多个日程视觉上是否允许重叠，默认true允许
      }
    }
  },
  methods: {
    handleDateSelect(selectInfo) {
      const calendarApi = selectInfo.view.calendar
      calendarApi.unselect() // clear date selection
      calendarApi.addEvent({
        id: Math.floor(1000 + Math.random() * 9000).toString(),
        title: '新增一个日程',
        start: selectInfo.startStr,
        end: selectInfo.endStr
      })
    },
    changeLimit() {
      const calendarApi = this.$refs['myCalendar'].getApi()
      // false 也可改为一个对象为其他时间段
      calendarApi.setOption('businessHours', false)
      calendarApi.setOption('selectConstraint', false)
    }
  }
}
</script>

<style scoped lang="scss">
</style>

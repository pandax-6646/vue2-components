<template>
  <div class="app-container board">
    <draggable-list :key="1" :list="list1" :group="group" class="kanban todo" header-text="Todo" />
    <draggable-list
      :key="2"
      :list="list2"
      :group="group"
      class="kanban working"
      header-text="Working"
    />
    <draggable-list :key="3" :list="list3" :group="group" class="kanban done" header-text="Done" />
  </div>
</template>

<script>
import DraggableList from './components/DraggableList'
export default {
  name: 'DragList',
  components: {
    DraggableList
  },
  data() {
    return {
      group: 'mission',
      list1: [
        { name: 'Mission', id: 1 },
        { name: 'Mission', id: 2 },
        { name: 'Mission', id: 3 },
        { name: 'Mission', id: 4 }
      ],
      list2: [
        { name: 'Mission', id: 5 },
        { name: 'Mission', id: 6 },
        { name: 'Mission', id: 7 }
      ],
      list3: [
        { name: 'Mission', id: 8 },
        { name: 'Mission', id: 9 },
        { name: 'Mission', id: 10 }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.board {
  width: 1000px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.kanban {
  &.todo {
    /deep/.board-column-header {
      background: #4a9ff9;
    }
  }
  &.working {
    /deep/.board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    /deep/.board-column-header {
      background: #2ac06d;
    }
  }
}
</style>

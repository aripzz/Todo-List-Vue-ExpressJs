<template>
  <div id="app">
    <TodoList />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import TodoList from './components/TodoList.vue';
import "./assets/style.css";


export default defineComponent({
  components: {
    TodoList,
  },
});
</script>

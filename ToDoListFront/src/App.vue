<template>
<div>
  <title>To Do List</title>
  <ToDoList></ToDoList>
  </div>
</template>

<script>
import ToDoList from "./components/ToDoList.vue";
export default {
  name: "App",
  data() {
    return {
      entries: [],
    };
  },
  components: {
    ToDoList: ToDoList,
  },
  computed: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
body {
  background: linear-gradient(270deg, #ffffff, #e8ffe4, #ffdfdf, #ffecec);
  background-size: 800% 800%;

  animation: background-animation 45s ease infinite;
}
@keyframes background-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>

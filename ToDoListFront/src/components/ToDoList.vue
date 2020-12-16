<template>
  <div id="app">
    <div class="containerHeader">
      <div class="itemsHeader">
        <img src="@/assets/key.png">
        </div>
      <div class="itemsHeader">
        <img src="@/assets/to-do-list.png" />
      </div>

      <div class="itemsHeaderInfo">
        <img src="@/assets/loupe.png" />
      </div>
      <div class="itemsHeader">
        <img src="@/assets/time.png" />
      </div>
      <div class="itemsHeader">
        <img src="@/assets/settings.png" />
      </div>
    </div>
    <ToDoItem :entries="entries"></ToDoItem>
    <CreateToDoItem></CreateToDoItem>
  </div>
</template>


<script>
import ToDoItem from "./ToDoItem.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import CreateToDoItem from "./CreateToDoItem";

export default {
  data() {
    return {
      menuIsVisible: false,

      activityInput: "",
      detailsInput: "",
      
      
    };
  },
  name: "ToDoList",
  components: {
    ToDoItem,
    CreateToDoItem,
  },
  props: {},
  setup() {
    
    const store = useStore();
    store.dispatch('getArrayFromApi');
    const entries = computed(() => store.state.entries);
    
    

   
    return { entries };
  },
  
  methods: {},
  
  
};
</script>



<style>
button {
  outline: 0;
}
input {
  border-radius: 25px 25px 25px 25px;
  text-align: center;

  background: linear-gradient(270deg, #ffffff, #e8ffe4, #ffdfdf, #ffecec);
  background-size: 800% 800%;

  animation: background-animation 45s ease infinite;
}

.submitButton button {
  background: linear-gradient(270deg, #ffffff, #e8ffe4, #ffdfdf, #ffecec);
  background-size: 800% 800%;
  animation: background-animation 45s ease infinite;
  border-radius: 25px 25px 25px 25px;
  border: solid;
  outline: none;
  color: rgb(0, 0, 0);
  text-align: center;
  font-size: 20px;
  width: 150px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 10px;
  padding: 10px;
  margin-top: 20px;
  outline: none;
}
.submitButton img {
  width: 50px;
  height: 50px;
}
.submitButton input {
  padding: 10px;
}

.greenButton button {
  background: #91ff9a;
  background: linear-gradient(270deg, #d5f7cf, #a1e895, #a1e895, #1e5515);
  background-size: 800% 800%;

  animation: background-animation-td 25s ease infinite;
  border: 1;
  border-color: rgb(0, 0, 0);
  border-radius: 21px;
  box-shadow: 0px 1px 20px hsla(110, 100%, 78%, 0.741);
  cursor: pointer;
  color: black;
  height: 42.3px;
  margin: 0;
  margin-top: 0px;
  transition: 0.5s;
  width: 153px;
}
.greenButton button:hover {
  box-shadow: 0px 0px 50px #00ff00;
}
.redButton button {
  background: linear-gradient(270deg, #d5f7cf, #ff0000, #f37575, #fc9d9d);
  background-size: 800% 800%;

  animation: background-animation-td 25s ease infinite;
  border: 1;
  border-color: rgb(0, 0, 0);
  border-radius: 21px;
  box-shadow: 0px 1px 20px hsla(0, 82%, 56%, 0.741);
  cursor: pointer;
  color: black;
  height: 42.3px;
  margin: 0 auto;
  margin-top: 0px;
  transition: 0.25s;
  width: 153px;
}
.redButton button:hover {
  box-shadow: 0px 0px 50px #ff0000;
}

h1 {
  font-size: 50px;
}
.containerHeader {
  display: flex;
  margin: 0px;
}
.containerHeader img {
  padding: 20px;
}

.itemsHeader {
  flex: 1;
  order: 5;
  border: solid;
}
.itemsHeader:first-child {
  border-radius: 25px 0px 0px 0px;
  border-right:0;
}
.itemsHeaderInfo {
  flex: 1;
  order: 5;
  border: solid;
  border-left: 0;
  border-right: 0;
}
.itemsHeaderInfo img {
  width: 50px;
  height: 50px;
}
.itemsHeader:last-child {
  border-radius: 0px 25px 0px 0px;
  border-left: 0;
}
.itemsHeader img {
  width: 50px;
  height: 50px;
}
.containerData {
  display: flex;
  margin: 0px;
  border-collapse: collapse;
}
.itemsData {
  flex: 1;
  order: 1;
  width: 50px;
  text-align: center;
  border-collapse: collapse;
  border: solid;
  justify-content: flex-start;
  flex-basis: 10px;
  flex-row: row wrap;
  border-right: 0;
  border-top: 0;
}
.itemsData:last-child {
  border-top: 0;
  display: flex;
  border-right: solid;
}
.itemsData img {
  width: 25px;
  height: 25px;
}

.redBackground {
  background: linear-gradient(270deg, #d5f7cf, #ff0000, #f37575, #fc9d9d);
  background-size: 800% 800%;

  animation: background-animation-td 25s ease infinite;
}
.greenBackground {
  background: #91ff9a;
  background: linear-gradient(270deg, #d5f7cf, #a1e895, #a1e895, #1e5515);
  background-size: 800% 800%;

  animation: background-animation-td 25s ease infinite;
}
@keyframes background-animation-td {
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


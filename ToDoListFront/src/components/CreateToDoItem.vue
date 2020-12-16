<template>
  <div class="submitButton">
    <button v-on:click="openMenu">
      <span><img src="@/assets/add.png" /></span>
    </button>
  </div>
  <form
    v-show="menuIsVisible"
    @submit.prevent="
      insertEntry(this.activityInput, this.detailsInput);
      this.menuIsVisible = false;
    "
  >
    <input
      v-model="activityInput"
      required
      type="text"
      placeholder="New activity"
    />
    <input v-model="detailsInput" type="text" placeholder="New details" />
    <button type="submit">New Entry</button>
  </form>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "CreateToDoList",
  data() {
    return {
      menuIsVisible: false,
      activityInput: "",
      detailsInput: "",
    };
  }
  ,
  setup() {
    const store = useStore();

    function insertEntry(activityInput, detailsInput) {
      store.commit("insertEntry", { activityInput, detailsInput });
    }
  

    return { insertEntry};
  },
  methods: {
    openMenu() {
      this.menuIsVisible = !this.menuIsVisible;
    },
  },
};
</script>

<style scoped>
button {
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
</style>


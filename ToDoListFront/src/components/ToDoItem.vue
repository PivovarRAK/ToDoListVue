<template>
<div>
  <div
    data-test="todo-item"
    class="containerData"
    v-for="entry in entries"
    v-bind:key="entry.id"
    :class="entry.status ? 'greenBackground' : 'redBackground'"
  >
  <div class="itemsData">
    {{entry.id}}
    </div>
    <div class="itemsData">
      {{ entry.name}}
    </div>
    <div class="itemsData">
      {{ entry.details }}
    </div>
    <div class="itemsData">
      {{ entry.timestamp }}
    </div>
    <div class="itemsData">
      <div :class="entry.status ? 'greenButton' : 'redButton'">
        <button id="openEdit" v-on:click="editEntry(entry)">
          <span><img src="@/assets/edit.png" /></span>
        </button>
        <form
          v-if="entry.editFieldIsVisible"
          @submit.prevent="submitEdit(entry, this.editActivity, this.editDetails, entry.status); editEntry(entry);"
        >
          <input
            required
            placeholder="Edit your activity"
            v-model="editActivity"
            id="editActivity"
            type="text"
          />
          <input
            required
            v-model="editDetails"
            placeholder="Edit your details"
            id="editDetails"
            type="text"
          />
          <button id="submitButton" type="submit">Confirm edit</button>
        </form>

        <button id="deleteButton" @click="deleteEntry(entry, entry.id)">
          <span><img src="@/assets/trash.png" /></span>
        </button>
        <button v-on:click="changeStatus(entry);done(entry)">
          <span
            ><img v-if="!entry.status" src="@/assets/tick.png" />
            <img v-else src="@/assets/cancel.png"
          /></span>
        </button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

import { useStore } from "vuex";
export default {
  data() {
    return {
      entry: Object,
       editActivity: "",
       editDetails: "",
    };
  }, 
  props: {
    entries: Array,
  },
  setup() {
    const store = useStore();

  return { store };
  },
  methods: {
    done(entry) {
      entry.status = !entry.status;

    },
    //opens Edit Menu
    editEntry(entry) {
      entry.editFieldIsVisible = !entry.editFieldIsVisible;
      this.editActivity = "";
      this.editDetails = "";
    },
    deleteEntry(entry){
      this.store.dispatch("deleteEntry", entry);
      console.log("method deleteEntry");
    }, 
    submitEdit(entry, editActivity, editDetails, status){
      this.store.dispatch("editEntry", {entry, editActivity, editDetails, status});
    },
    changeStatus(entry){
      this.store.dispatch("changeStatus", entry);
    },
  },
  mounted() {
  },
};

</script>
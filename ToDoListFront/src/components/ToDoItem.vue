<template>
  <div
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
        <button v-on:click="editEntry(entry)">
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
          <button type="submit">Confirm edit</button>
        </form>

        <button @click="deleteEntry(entry, entry.id)">
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

    function deleteEntry(entry) {
      store.dispatch("deleteEntry", entry);
    }
    function submitEdit(entry, editActivity, editDetails, status){
      store.commit("editEntry", {entry, editActivity, editDetails, status});
    }
    function changeStatus(entry){
      store.commit("changeStatus", entry);
    }

  return { deleteEntry, submitEdit, changeStatus};
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
    
  },
  mounted() {
  },
};

</script>
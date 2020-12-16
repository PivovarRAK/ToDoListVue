import { createStore } from "vuex";

const actions = {
  async getArrayFromApi(context){
    const response = await fetch("https://localhost:5001/api/todoitems/");
    const data = await response.json();
    context.commit("insertEntries", data)
  },
  async deleteEntry(context, entry) {
    const response = await fetch("https://localhost:5001/api/todoitems/" + String(entry.id), {
      method: "DELETE",
    })
    if (response.ok) {
      context.commit("deleteEntry", entry)
    } else {
      window.alert("Delete entry failed")
    }
  }
};

const state = {
  entries: [],
};


const mutations = {
  deleteEntry(state, entry) {
    state.entries.splice(state.entries.indexOf(entry),1);
  }, 

changeStatus(state, entry){
    const data = {id:entry.id, Name:entry.name, Details:entry.details, Timestamp: entry.timestamp, Status: !entry.status};
    fetch("https://localhost:5001/api/todoitems/" + String(entry.id),{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(data),
      })
  },
  
  editEntry(state, {entry, editActivity, editDetails, status}){
      entry.name = editActivity;
      entry.details = editDetails;
      entry.status = status;
      const data = {id:entry.id,Name:entry.name, Details: entry.details, Status: entry.status, Timestamp: entry.timestamp};

      fetch("https://localhost:5001/api/todoitems/" + String(entry.id),{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(data),
      })
    },

     insertEntries(state, entries){
       state.entries = state.entries.concat(entries.map(result => {
         return {id : result.id, name: result.name, details: result.details, time: result.timestamp, status: result.status}
       }))
      },


  insertEntry(state, { activityInput, detailsInput }) {
    state.entries.push({
      id: "" ,
      name: activityInput,
      details: detailsInput,
      timestamp: new Date().toLocaleString(),
      status: false,
    });


    const data = {Name:activityInput, Details:detailsInput, Status:false, Timestamp: new Date().toLocaleString()};
    fetch("https://localhost:5001/api/todoitems", {
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(data),
    }).then(response => response.json());
    
  },
  
};

export default createStore({
  state,
  mutations,
  actions,
});

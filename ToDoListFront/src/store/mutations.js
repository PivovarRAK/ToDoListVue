
export default{
deleteEntry(state, entry) {
    state.entries.splice(state.entries.indexOf(entry),1);
  }, 

  editEntry(state, {entry, editActivity, editDetails, status}){
      entry.name = editActivity;
      entry.details = editDetails;
      entry.status = status;
    },

     insertEntries(state, entries){
       state.entries = state.entries.concat(entries.map(result => {
         return {id : result.id, name: result.name, details: result.details, timestamp: result.timestamp, status: result.status}
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
  },
}
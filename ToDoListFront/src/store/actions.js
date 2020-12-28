
export default{
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
  },
  changeStatus(context, entry){
    const data = {id:entry.id, Name:entry.name, Details:entry.details, Timestamp: entry.timestamp, Status: !entry.status};
    fetch("https://localhost:5001/api/todoitems/" + String(entry.id),{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(data),
      })
  },
  editEntry(context, {entry, editActivity, editDetails, status}){
    const data = {id:entry.id,Name:editActivity, Details: editDetails, Status: status, Timestamp: entry.timestamp};

    fetch("https://localhost:5001/api/todoitems/" + String(entry.id),{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(data),
    })
    context.commit("editEntry",{entry,editActivity,editDetails,status});
  },
  insertEntry(context,{activityInput,detailsInput}){
    const data = {Name:activityInput, Details:detailsInput, Status:false, Timestamp: new Date().toLocaleString()};
    fetch("https://localhost:5001/api/todoitems", {
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(data),
    }).then(response => response.json());

    context.commit("insertEntry",{activityInput,detailsInput});
  }
}
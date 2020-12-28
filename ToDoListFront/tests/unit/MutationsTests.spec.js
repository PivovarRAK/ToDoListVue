import Mutations from "@/store/mutations.js";




describe("CreateToDoItem", () => {
  it("sets new item on mutation insertEntry", () => {
    //arrange
    const state = {
    entries : [],
    }
    //act
    Mutations.insertEntry(state, "TestActivity","TestDetails");
    //assert
    expect(state.entries.length).toBe(1);

  })
},

  it("edit given entry on mutation editEntry", async () => {
    //arrange

    /*shallowMount(ToDoItem,
      {
        propsData:{
          entries : [{
            id:"",
            name:"TestActivity",
            details:"TestDetails",
            status: true,
          },
          {
            id:"",
            name:"TestActivity2",
            details:"TestDetails2",
            status:false
          }],
        }
      });*/

      var entry = {
        id:"",
        name:"TestActivity",
        details:"TestDetails",
        status:true,
      }
      function editEntry(editActivity,editDetails, status){
      entry.name = editActivity;
      entry.details = editDetails;
      entry.status = status;
    }
  
    //act
  
    //Mutations.editEntry(this, "EditedTestActivity", "EditedTestDetails", true);
    editEntry("EditedTestActivity", "EditedTestDetails", true);

    //assert
    expect(entry.name).toMatch("EditedTestActivity");
    
  }),

  it("deletes given entry in entries array", () => {
    //arrange
    const state = {
      entries : [{
        id:"",
        name:"TestActivity",
        details:"TestDetails",
        status:true
      }],
      }

    //act
    Mutations.deleteEntry(state, this);

    //assert
    expect(state.entries.length).toBe(0);
  })
)






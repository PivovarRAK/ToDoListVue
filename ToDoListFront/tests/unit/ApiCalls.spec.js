import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import {createStore, Vuex} from "vuex";
import CreateToDoItem from "@/components/CreateToDoItem.vue";
import ToDoItem from "@/components/ToDoItem.vue";
import ToDoList from "@/components/ToDoList.vue";
import { createToDoListStore } from "@/store/vuexstore"
import fetchMock from "fetch-mock-jest"



describe("vuexstore.js", ()=>{




    it("API POST call on action 'InsertEntry'", async() => {
        //arrange
        const store = createToDoListStore();

        fetchMock.post("https://localhost:5001/api/todoitems",[{id:1,name:"NewEntry", details:"NewDetails"}])
        const wrapper = shallowMount(ToDoItem, {
            global:{
                Plugins: [createToDoListStore()],
            }
        })
        //act
        store.dispatch("insertEntry", {activityInput: "NewEntry", detailsInput:"NewDetails"});
        
        //assert
        expect(store.state.entries).toEqual([{
            id:"",
            name:"NewEntry",
            details:"NewDetails",
            status:false,
            timestamp: new Date().toLocaleString()
        }]);
        //fetchMock.reset();
    }),
    it("API GET call on startup", async() =>{
        //arrange
        const store = createToDoListStore();
        fetchMock.get("https://localhost:5001/api/todoitems/",[{id:1,name:"NewEntry", details:"NewDetails", status:true, timestamp:"12/12/12"}])
        //act
        store.dispatch("getArrayFromApi");
        //assert
        expect(store.state.entries).toHaveLength(1);
        fetchMock.reset();

    }),
    it("API PUT call on action 'editEntry'", async() => {
        //arrange
        const store = createToDoListStore();
        fetchMock.put("https://localhost:5001/api/todoitems/2",[{id:1,name:"NeeeewEntry", details:"NewDetails", status:false, timestamp:"12/12/12"}])
        const wrapper = shallowMount(ToDoItem, {
            global:{
                Plugins: [createToDoListStore()]
            },
            state:{
                entries:[{}]
            }
        })  
        var entry = {
            id:2,
            name:"NewEntry",
            details:"NewDetails",
            status:false,
            timestamp: new Date().toLocaleString(),
        }

        //act
        store.dispatch("editEntry",{entry: entry, editActivity:"EditedActivity", editDetails:"EditedDetails", status:false})
      
        //assert
        expect(entry).toEqual({
            id:2,
            name:"EditedActivity",
            details:"EditedDetails",
            timestamp:entry.timestamp,
            status:entry.status
        });

    }),

    it("API DELETE call on action 'deleteEntry'", async() => {
        //arrange
        const store = createToDoListStore();
        fetchMock.delete("https://localhost:5001/api/todoitems/",200);
        const wrapper = shallowMount(ToDoItem, {
            global:{
                Plugins: [createToDoListStore()]
            },
            state:{
                entries:[{}]
            }
        })  
        var entry = {
            id:1,
            name:"NewEntry",
            details:"NewDetails",
            status:false,
            timestamp: new Date().toLocaleString(),
        }


        //act
        expect(store.state.entries).toHaveLength(2);
        store.commit("deleteEntry", {entry:entry})

        //assert
       expect(store.state.entries).toHaveLength(1);

    })
})
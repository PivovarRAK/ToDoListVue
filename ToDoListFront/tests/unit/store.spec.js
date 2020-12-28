import { createToDoListStore } from "@/store/vuexstore"
import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import ToDoList from "@/components/ToDoList.vue";
import { createApp } from "vue"
import fetchMock from "fetch-mock-jest"

describe.only("store", () => {
    it("works", () => {
        const store = createToDoListStore()
    })
    it("adds todo entry", () => {
        const store = createToDoListStore()
        store.commit("insertEntry", { activityInput: "entry name", detailsInput: "entry details"  })
        expect(store.state.entries).toEqual([
            {
                id: "",
                name: "entry name",
                details: "entry details",
                timestamp: new Date().toLocaleString(),
                status: false,
        }])
    })
    it("renders something", async () => {
        fetchMock.mock("https://localhost:5001/api/todoitems/", [{ id: 1, name: "ENTRY NAME", details: "ENTRY DETAILS" }])
        const wrapper = mount(ToDoList, {
            global: {
                plugins: [createToDoListStore()]
            }
        })
        const entries = await wrapper.findAll("[data-test='todo-item']")
        expect(entries).toHaveLength(1)
    })
})

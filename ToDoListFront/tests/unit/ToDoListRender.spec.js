import { createStore } from "vuex"
import { mount } from "@vue/test-utils"
import ToDoList from "@/components/ToDoList.vue";



function MockStore() {
    const store = createStore();
    return mount(ToDoList,{
        global:{
            plugins:[store],
            actions:{
                getArrayFromApi(){

                },
            }
        }
    })
}

describe("ToDoList", () => {
    it("Testing rendering of the header", async () => {
        //arrange
        const wrapper = MockStore();
        //act
        //assert

        expect(wrapper.html()).toContain("containerHeader");
    }),

    it("Testing rendering of the itemsHeader", async () => {
        //arrange
        const wrapper = MockStore();
        //act
        //assert
        expect(wrapper.html()).toContain("itemsHeader");
    }),

    it("Testing rendering of components div", async () => {
        //arrange
        const wrapper = MockStore();
        //act
        //assert
        expect(wrapper.html()).toContain("components");
    })
})
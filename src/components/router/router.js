import Vue from "vue";
import Router from "vue-router";
import Note from "../note/note";
import Todo from "../todo-list/todo-list";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "todo",
      component: Todo,
      props: true
    },
    {
      path: "/note",
      name: "note",
      component: Note,
      props: true
    }
  ]
});

export default router;

<template>
  <div id="app">
    <h1>Заметки</h1>

    <Main
      v-on:delete-note="deleteNote"
      v-on:create-note="createNote"
      v-on:confirmation="confirmation"
      v-on:confirmation-task="confirmationTask"
      v-on:save-data="saveData"
      v-on:cancel="cancel"
      v-on:get-data="getData"
      :okCheck="okCheck"
      :data="notes"
      :okCheckTask="okCheckTask"
    />
  </div>
</template>

<script>
import Main from "./components/main.vue";
import { cloneDeep } from "lodash";

export default {
  name: "App",
  components: {
    Main
  },
  created: function() {
    this.getData();
  },
  methods: {
    saveData(data, id) {
      this.notes[id] = cloneDeep(data);
      var json = JSON.stringify(this.notes);
      localStorage.setItem("notes", json);
    },
    getData() {
      if (
        !localStorage.getItem("notes") ||
        localStorage.getItem("notes") == 1
      ) {
        this.notes = [
          {
            name: "Пустая заметка",
            id: "0",
            todos: [
              { name: "Первая задача", completed: false },
              { name: "Вторая задача", completed: true },
              { name: "Третья задача", completed: false }
            ]
          }
        ];

      } else {
        var json = JSON.parse(localStorage.getItem("notes"));
        this.notes = json;
      }
    },
    confirmation() {
      this.okCheck = true;
    },
    confirmationTask() {
      this.okCheckTask = true;
    },
    cancel() {
      this.okCheck = false;
    },
    deleteNote(id) {
      this.notes.splice(id, 1);
      this.saveData();
    },
    createNote(name) {
      this.notes.unshift({
        name: name,
        id: this.notes.length,
        todos: []
      });
      this.saveData();
    }
  },
  data() {
    return {
      notes: [],
      okCheck: false,
      okCheckTask: false
    };
  }
};
</script>
<style>
#app {
  width: 100%;
}
h1 {
  margin-bottom: 0;
  text-align: center;
}
.popup {
  width: 100%;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  position: fixed;
  top: 0px;
  left: 0px;
}
.popup .popup-content {
  text-align: center;
  font-size: 20px;
  margin: 40px auto 0px auto;
  width: 300px;
  height: 100%px;
  padding: 10px;
  background-color: #c5c5c5;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #000;
  display: flex;
  flex-direction: column;
}
.popup-content button {
  width: 100%;
}
</style>

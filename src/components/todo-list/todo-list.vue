<template>
  <div id="todo_list">
    <template v-if="okCheck" :id="this.id">
      <div class="popup">
        <div class="popup-content">
          <span>Подтвердите свое действие</span>
          <button v-on:click="cancel">Отмена</button>
          <button v-on:click="confirmed(id)">Ок</button>
        </div>
      </div>
    </template>
    <div class="new_note">
      <input
        class="new_note_input"
        placeholder="Новая заметка"
        maxlength="20"
        cols="20"
        v-model="newNoteInput"
      >
      <router-link
        :to="{name:`note`,params:{note_data:data[0], note_id:'0'} } "
        v-on:delete-note="deleteNote"
        v-on:confirmation="confirmation"
        v-on:save-data="saveData"
        v-on:cancel="cancel"
        :okCheck="okCheck"
        :note_id="id"
      >
        <div v-if="newNoteInput">
          <button class="new_note_button" v-on:click="createNote(newNoteInput)">Создать заметку</button>
        </div>
      </router-link>
    </div>

    <div class="note" v-for="(item,id) in data" :key="id">
      <div class="note_title">{{item.name}}</div>
      <ul>
        <li v-for="(todo,index) in item.todos.slice(0,3)" :key="index">
          <div class="note_task">
            <div v-bind:class="{note_task_completed:todo.completed}" class="note_task_checkbox"></div>
            <div class="note_task_title">{{todo.name}}</div>
          </div>
        </li>
      </ul>
      <div>
        <button class="note_button" v-on:click="confirmation(id)">Удалить заметку</button>
        <router-link
          :to="{name:`note`,params:{note_data:item, note_id:id} } "
          v-on:delete-note="deleteNote"
          v-on:confirmation="confirmation"
          v-on:save-data="saveData"
          v-on:cancel="cancel"
          :okCheck="okCheck"
          :note_id="id"
        >
          <button class="note_button">Редактировать заметку</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "todo-list",
  data() {
    return {
      newNoteInput: "",
      id: ""
    };
  },

  props: ["data", "okCheck"],
  methods: {
    saveData(data, id) {
      this.$emit("save-data", data, id);
    },
    confirmation(id) {
      this.$emit("confirmation");

      this.id = id;
    },
    confirmed(id) {
      this.deleteNote(id);
      this.cancel();
    },
    cancel() {
      this.$emit("cancel");
    },
    deleteNote(id) {
      this.$emit("delete-note", id);
    },
    createNote(name) {
      this.$emit("create-note", name);
      this.newNoteInput = "";
    }
  },
  watch: {
    newNoteInput: function() {
      // this.newNoteInput=newNoteInput
    }
  }
};
</script>

<style scopped>
.new_note {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.new_note_input {
  background-color: rgba(0, 0, 0, 0);
  width: 250px;
  height: 30px;
  text-align: center;
  font-size: 15px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.new_note_button {
  width: 100%;
  text-align: center;
  margin: 2px;
  height: 30px;
  margin-top: 20px;
}
.note_task {
  display: flex;
  border-bottom: 1px solid black;
  margin-bottom: 15px;
  padding: 5px;
}
.note_task_title {
  margin-left: 5px;
  text-transform: capitalize;
  padding-top: 2px;
}
.note_task_checkbox {
  display: inline-block;
  height: 20px;
  width: 20px;
  border: 0px solid black;
  background-color: rgb(211, 211, 211);
  border-radius: 50%;
}
.note_task_completed {
  background-color: rgb(72, 218, 104);
}
#todo_list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.note_title {
  text-align: center;
  margin-bottom: 5px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  text-transform: capitalize;
  border-bottom:3px solid black;
}
.note_button {
  width: 100%;
  text-align: center;
  margin: 2px;
  height: 30px;
}
li {
  list-style: none;
}
.note {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  border: 1px solid black;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  width: 300px;
}
</style>

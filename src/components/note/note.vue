<template>
  <div id="edit">
    <template v-if="okCheck">
      <div class="popup">
        <div class="popup-content">
          Подтвердите свое действие
          <button v-on:click="cancel">Отмена</button>

          <router-link  :to="{name:'todo'}">
            <button
              v-if="confirmStatus==='delete'"
              v-on:click="confirmedDelete(this.task_id)"
            >Удалить</button>
            <button v-if="confirmStatus==='cancel'" v-on:click="cancel">Ок</button>
          </router-link>
        </div>
      </div>
    </template>

    <div v-if="note_data">
      <input
        type="text"
        maxlength="15"
        cols="20"
        scroll="no"
        class="note_title"
        v-model="inputData.name"
      >
      <div class="newtask">
        <input class="newtask_input" v-model="inputData.newTaskInput" placeholder="Новая задача">
        <button class="edit_button" v-on:click="createTask(inputData.newTaskInput)">
          <img alt="delete" src="../../assets/plus.png">
        </button>
      </div>
      <ul>
        <li v-for="(item,task_id) in inputData.todos" :key="task_id">
          <div class="todo">
            <input class="todo_checkbox" type="checkbox" v-model="item.completed">
            <input class="todo_title" type="text" v-model="item.name">
            <button class="edit_button" v-on:click="deleteTask(task_id)">
              <img alt="delete" src="../../assets/bin.png">
            </button>
          </div>
        </li>
      </ul>

      <div class="buttons">
        <button class="edit_button" v-on:click="undo">
          <img class="edit_button" alt="undo" src="../../assets/back.png">
        </button>
        <button class="edit_button" v-on:click="redo">
          <img alt="redo" src="../../assets/arrow.png">
        </button>
        <button class="edit_button" v-on:click="confirmation('delete')">
          <img alt="delete" src="../../assets/bin.png">
        </button>
        <router-link :to="{name:'todo'}">
          <button class="edit_button" v-on:click="saveData">
            <img alt="save" src="../../assets/save.png">
          </button>
        </router-link>
        <button class="edit_button" v-on:click="confirmation('cancel')">
          <img alt="cancel" src="../../assets/cancel.png">
        </button>
      </div>
    </div>
    <div v-else>Тут нечего редактировать
      <router-link :to="{name:'todo'}">
        <button>Назад</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
export default {
  name: "note",
  props: ["note_data", "note_id", "okCheck"],

  data() {
    return {
      inputData: {},
      task_id: "",
      finalData: {},
      confirmStatus: 0
    };
  },
  mounted: function() {
    this.finalData = cloneDeep(this.note_data);
    this.inputData = this.finalData;
  },
  methods: {
    undo() {
      this.inputData = this.note_data;
    },
    redo() {
      this.inputData = this.finalData;
    },
    saveData() {
      this.$emit("save-data", this.inputData, this.note_id);
    },
    confirmation(confirm) {
      this.$emit("confirmation");

      this.confirmStatus = confirm;
    },
    confirmedDelete() {
      this.deleteNote();
      this.cancel();
    },
    cancel() {
      this.$emit("cancel");
    },
    createTask(name) {
      if (name) {
        this.inputData.todos.unshift({
          name: name,
          completed: false
        });
        this.inputData.newTaskInput = "";
      }
    },
    deleteTask(task_id) {
      this.inputData.todos.splice(task_id, 1);
    },
    deleteNote() {
      this.$emit("delete-note", this.note_id);
    }
  }
};
</script>
<style scoped>
#edit {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.newtask {
  width: 300px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
}
.newtask_input {
  height: 30px;
}
.buttons {
  width: 150px;
  margin: 0 auto;
  display: flex;
  padding-top: 10px;
  justify-content: space-between;
}
.todo {
  width: 250px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.todo_title {
  border: none;
  border-bottom: 1px solid black;
  margin-left: 15px;
  margin-right: 15px;
}
.todo_checkbox {
  width: 25px;
  height: 25px;
}
img {
  height: 20px;
  width: 20px;
}
.edit_button {
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.note_title {
  border: none;
  text-align: center;
  max-width: 300px;
  font-size: 30px;
}
.note_title:focus {
  border: none;
}
</style >


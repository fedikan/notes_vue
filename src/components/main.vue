<template>
  <div class="main-wrapper">
    <router-view
      v-on:delete-note="deleteNote"
      v-on:create-note="createNote"
      v-on:confirmation="confirmation"
      v-on:cancel="cancel"
      v-on:save-data="saveData"
      :okCheck="okCheck"
      :data="data"
    ></router-view>
  </div>
</template>

<script>
export default {
  name: "main-wrapper",
  props: ["data", "okCheck"],
  beforeCreate: function() {
    this.$emit("get-data");
  },
  methods: {
    saveData(data, id) {
      this.$emit("save-data", data, id);
    },
    confirmation() {
      this.$emit("confirmation");
    },
    cancel() {
      this.$emit("cancel");
    },
    deleteNote(name) {
      this.$emit("delete-note", name);
    },
    createNote(name) {
      this.$emit("create-note", name);
    }
  }
};
</script>
<style>
.main-wrapper {
  border: 1px solid black;
  border-radius: 20px;
  margin: 0 auto;
  margin-top:0;
  width: 340px;
  padding: 20px;
  margin-top: 20px;
}
</style>

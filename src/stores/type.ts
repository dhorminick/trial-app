import { ref } from "vue";
import { defineStore } from "pinia";

export const typeStore = defineStore("typeManager", () => {
  const type = ref("recruiter");

  function switchType(newType: string) {
    type.value = newType;
  }

  return {
    type,
    switchType,
  };
});

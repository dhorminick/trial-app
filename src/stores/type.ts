import { ref } from "vue";
import { defineStore } from "pinia";

export const typeStore = defineStore(
  "typeManager",
  () => {
    const type = ref("talent");
    const color = ref("#EB5757");

    function switchType(newType: string) {
      type.value = newType;
      color.value = newType === "recruiter" ? "#EAA505" : "#EB5757";
    }

    return {
      type,
      color,
      switchType,
    };
  },
  {
    persist: true,
  }
);

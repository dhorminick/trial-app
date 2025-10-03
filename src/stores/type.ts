import { ref } from "vue";
import { defineStore } from "pinia";

export const typeStore = defineStore(
  "typeManager",
  () => {
    const type = ref("recruiter");
    const color = ref("#EAA505");

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

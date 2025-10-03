import { ref } from "vue";
import { defineStore } from "pinia";

export const authManager = defineStore(
  "authManager",
  () => {
    const stage = ref("email");
    const user = ref({
      email: "test@test.com",
      verified: false,
      password: "",
      confirmed: false,
    });

    function setStage(newType: string) {
      stage.value = newType;
    }

    function setEmail(email: string) {
      user.value.email = email;
    }

    function setVerified(status: boolean) {
      user.value.verified = status;
    }

    function setPassword(pass: string) {
      user.value.password = pass;
    }

    function isDone(status: boolean) {
      user.value.confirmed = status;
    }

    return {
      stage,
      user,
      setEmail,
      setPassword,
      setStage,
      setVerified,
      isDone,
    };
  },
  {
    persist: true,
  }
);

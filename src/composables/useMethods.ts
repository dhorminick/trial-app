import useAuthManager from "@/composables/useAuth";
import useApi from "@/composables/useApi";

export default function () {
  const authManager = useAuthManager();
  const api = useApi();

  interface User {
    email: string;
    password?: string;
    userType: string | "talent" | "recruiter";
  }

  async function preRegister(email: string) {
    try {
      const response = await api.post(
        "/auth/pre-register",
        JSON.stringify({
          contact: email,
        })
      );

      if (response.status === 201) {
        authManager.setEmail(email);
      }
      return { ...response.data, status: response.status };
    } catch (error) {
      return { message: `Error - ${error}`, status: 400 };
    }
  }

  async function verifyOTP(data: { email: string; otp: string }) {
    try {
      const response = await api.post(
        "/auth/verify-otp",
        JSON.stringify({
          contact: data.email,
          otp: data.otp,
        })
      );

      return { ...response.data, status: response.status };
    } catch (error) {
      return { message: `Error - ${error}`, status: 400 };
    }
  }

  async function resendOTP(email: string) {
    try {
      const response = await api.post(
        "/auth/resend-otp",
        JSON.stringify({
          contact: email,
        })
      );

      return { ...response.data, status: response.status };
    } catch (error) {
      return { message: `Error - ${error}`, status: 400 };
    }
  }

  async function verifyUser(data: User) {
    try {
      const response = await api.post(
        "/auth/register",
        JSON.stringify({
          contact: data.email,
          password: data.password,
          userType: data.userType,
        })
      );

      return { ...response.data, status: response.status };
    } catch (error) {
      return { message: `Error - ${error}`, status: 400 };
    }
  }

  return {
    preRegister,
    verifyOTP,
    resendOTP,
    verifyUser,
  };
}

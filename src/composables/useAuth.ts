import { authManager } from "@/stores/auth";

export default function useAuthManager() {
  const store = authManager();
  return store;
}

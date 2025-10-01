import { typeStore } from "@/stores/type";

export default function useType() {
  const store = typeStore();
  return store;
}

import { ref } from "vue";

const toasts = ref([]);
let nextId = 1;

export function useToast() {
  function addToast(type, message, duration = 3500) {
    const id = nextId++;
    const toast = { id, type, message };
    toasts.value.push(toast);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }

  function removeToast(id) {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }

  return {
    toasts,
    removeToast,
    success: (msg, dur) => addToast("success", msg, dur),
    error: (msg, dur) => addToast("error", msg, dur),
    info: (msg, dur) => addToast("info", msg, dur),
    warning: (msg, dur) => addToast("warning", msg, dur),
  };
}

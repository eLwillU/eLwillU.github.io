import { d as vmIsDestroyed } from "./QBtn.7eb97a4e.js";
import { B as onDeactivated, u as onBeforeUnmount, g as getCurrentInstance } from "./index.74229698.js";
function useTimeout() {
  let timer = null;
  const vm = getCurrentInstance();
  function removeTimeout() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }
  onDeactivated(removeTimeout);
  onBeforeUnmount(removeTimeout);
  return {
    removeTimeout,
    registerTimeout(fn, delay) {
      removeTimeout();
      if (vmIsDestroyed(vm) === false) {
        timer = setTimeout(() => {
          timer = null;
          fn();
        }, delay);
      }
    }
  };
}
export { useTimeout as u };

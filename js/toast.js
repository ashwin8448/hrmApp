import { confirmBox, toast } from "./elements.js";

export const toastHandler = (message) => {
  toast.classList.add("open");
  toast.innerHTML = message;
  setTimeout(() => {
    toast.classList.remove("open");
  }, 3000);
};


import { confirmBox, toast } from "./elements.js";

export const toastHandler = (message) => {
  toast.classList.add("open");
  toast.innerHTML = message;
  setTimeout(() => {
    toast.classList.remove("open");
  }, 3000);
};

// export const confirmHandler = (heading, message) => {
//   confirmBox.classList.add("open");
//   confirmBox.children[1].innerHTML = heading;
//   confirmBox.children[2].innerHTML = message;
//   confirmBox.addEventListener("click", (e) => {
//     if (
//       e.target.tagName === "BUTTON" ||
//       e.target.parentElement.tagName === "BUTTON"
//     ) {
//       if (e.target.value === "yes") {
//         console.log("yes");
//       }
//       console.log("no");
//     }
//   });
// };

import { atom } from "recoil";

export const authState = atom({
  key: "authState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

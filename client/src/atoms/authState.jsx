import { atom } from "recoil";

export const authState = atom({
  key: "authState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const landingState = atom({
  key: "landingState", // unique ID (with respect to other atoms/selectors)
  default: "login", // default value (aka initial value)
});

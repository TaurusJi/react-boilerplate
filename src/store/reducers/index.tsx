// import { INIT_LIST_VALUE } from "../types/app";

export interface DefaultState {
  inputValue: string;
  list: string[];
}

const defaultState: DefaultState = {
  inputValue: "hello world",
  list: ["test1", "test2"]
};

export default (state = defaultState) => {
  return state;
};

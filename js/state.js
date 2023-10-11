export let state = {
  sortBy: "id",
  filterBy: {},
  sortFlag: 1,
};

export function setState(key, value) {
  state.sortFlag = state.sortBy == value ? state.sortFlag * -1 : 1;
  state[key] = value;
}

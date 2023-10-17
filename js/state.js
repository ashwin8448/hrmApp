export let state = {
  sortBy: "id",
  filterBy: { skills: [], id: [], search: [] },
  sortFlag: 1,
  lastId: "1003",
};

export const setState = (key, value) => {
  state.sortFlag = state.sortBy == value ? state.sortFlag * -1 : 1;
  state[key] = value;
};

export const setSortIcon = (sortIcon) => {
  state.sortFlag == 1
    ? (sortIcon.style.transform = `rotateX(0deg)`)
    : (sortIcon.style.transform = `rotateX(180deg)`);
};

export let idToDelete;
export const setIdToDelete = (id) => {
  idToDelete = id;
};

export const getId = () => {
  state.lastId = String(Number(state.lastId) + 1);
  return state.lastId;
};

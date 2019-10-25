export function set(property) {
  return (state, payload) => {
    state[property] = payload;
  };
}

export function toggle(property) {
  return (state) => { (state[property] = !state[property]); };
}

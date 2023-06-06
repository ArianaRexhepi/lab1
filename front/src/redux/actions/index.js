import { SET_USER } from './types'

const setUser = (user) => {
  return {
    type: SET_USER,
    user: user
  };
};

export { setUser };
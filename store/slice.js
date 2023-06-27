import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: {},
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {addTodo} = todosSlice.actions;

export default todosSlice.reducer;

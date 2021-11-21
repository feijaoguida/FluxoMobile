import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = [];

export const addUser = createAction("ADD_USER");
export const addToken = createAction("ADD_TOKEN");
export const addExpiration = createAction("ADD_EXPIRATION");

export default createReducer(INITIAL_STATE, {
  [addUser.type]: (state, action) => [...state, action.payload],
  [addToken.type]: (state, action) => [...state, action.payload],
  [addExpiration.type]: (state, action) => [...state, action.payload],
});

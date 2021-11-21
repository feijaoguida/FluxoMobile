import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = [];

export const addBanco = createAction("ADD_BANCO");
export const addBancos = createAction("ADD_BANCOS");

export default createReducer(INITIAL_STATE, {
  [addBanco.type]: (state, action) => [...state, action.payload],
  [addBancos.type]: (state, action) => [...action.payload],
});

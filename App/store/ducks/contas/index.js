import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  contas: [],
  conta: null,
};

export const getContas = createAction("GET_CONTA");
export const addContas = createAction("ADD_CONTAS");

export default createReducer(INITIAL_STATE, {
  [getContas]: (state, action) => ({
    ...state,
    conta: findConta(state, action.payload),
  }),
  [addContas]: (state, action) => ({ ...state, contas: action.payload }),
});

function findConta(state, id) {
  return state.contas.find((item) => item.id === id.id);
}

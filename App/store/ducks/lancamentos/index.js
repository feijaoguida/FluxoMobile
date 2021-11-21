import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  lancamentos: [],
  lancamentoSelecionado: {},
};

export const addLancamento = createAction("ADD_LANCAMENTO");
export const addLancamentos = createAction("ADD_LANCAMENTOS");
export const storeLancamento = createAction("STORE_LANCAMENTO");

export default createReducer(INITIAL_STATE, {
  [addLancamentos]: (state, action) => ({
    ...state,
    lancamentos: action.payload,
  }),
  [storeLancamento]: (state, action) => ({
    ...state,
    lancamentoSelecionado: action.payload,
  }),
});

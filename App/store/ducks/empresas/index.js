import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  empresas: [],
  empresa: null,
};

export const getEmpresa = createAction("GET_EMPRESA");
export const addEmpresas = createAction("ADD_EMPRESAS");

export default createReducer(INITIAL_STATE, {
  [getEmpresa]: (state, action) => ({
    ...state,
    empresa: findEmpresa(state, action.payload),
  }),
  [addEmpresas]: (state, action) => ({ ...state, empresas: action.payload }),
});

function findEmpresa(state, id) {
  return state.empresas.find((item) => item.id === id.id);
}

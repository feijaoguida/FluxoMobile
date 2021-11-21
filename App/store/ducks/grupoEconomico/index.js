import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  gruposEconomicos: [],
  grupoEconomico: null,
};

export const addGrupoEconomicos = createAction("ADD_GRUPOS");
export const getGrupoSelecionado = createAction("SELECT_GRUPO");

export default createReducer(INITIAL_STATE, {
  [addGrupoEconomicos]: (state, action) => ({
    ...state,
    gruposEconomicos: action.payload,
  }),
  [getGrupoSelecionado]: (state, action) => ({
    ...state,
    grupoEconomico: findGrupo(state, action.payload),
  }),
});

function findGrupo(state, id) {
  return state.gruposEconomicos.find((item) => item.id === id.id);
}

import { addLancamentos } from "../../ducks/lancamentos";
import api from "../../../services/api";

export const getLancamentos = (empresa_id, data_inicio = "", data_fim = "") => {
  let url = `/empresa/${empresa_id}/lancamento?`;

  return async (dispatch) => {
    let lancamentos = await api(`${url}${data_inicio}${data_fim}`, {
      headers: { "Content-Type": "application/json" },
      type: "GET",
    });
    if (lancamentos) {
      dispatch(addLancamentos(lancamentos));
    }
    return lancamentos;
  };
};

import { addContas } from "../../ducks/contas";
import api from "../../../services/api";

export const getContas = (empresa_id) => {
  return async (dispatch) => {
    let contas = await api(`/contas/${empresa_id}`, {
      headers: { "Content-Type": "application/json" },
      type: "GET",
    });
    if (contas) {
      dispatch(addContas(contas));
    }
    return contas;
  };
};

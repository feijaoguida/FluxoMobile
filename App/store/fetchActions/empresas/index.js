import { addEmpresas } from "../../ducks/empresas";
import api from "../../../services/api";

export const getEmpresas = (GE) => {
  return async (dispatch) => {
    let empresas = await api(`/empresas/${GE}`, {
      headers: { "Content-Type": "application/json" },
      type: "GET",
    });
    if (empresas) {
      dispatch(addEmpresas(empresas));
    }
    return empresas;
  };
};

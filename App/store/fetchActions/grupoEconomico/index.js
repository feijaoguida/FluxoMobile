import { addGrupoEconomicos } from "../../ducks/grupoEconomico";
import api from "../../../services/api";

export const getGrupoEconomico = () => {
  return async (dispatch) => {
    let grupoEconomico = await api(`/grupoeconomico`, {
      headers: { "Content-Type": "application/json" },
      type: "GET",
    });

    if (grupoEconomico) {
      dispatch(addGrupoEconomicos(grupoEconomico));
    }
    return grupoEconomico;
  };
};

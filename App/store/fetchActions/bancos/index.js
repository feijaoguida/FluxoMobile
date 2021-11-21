import { addBancos } from "../../ducks/bancos";
import api from "../../../services/api";

export const getBancos = (empresa_id) => {
  return async (dispatch) => {
    let bancos = await api(`/empresa/${empresa_id}/bancos`, {
      headers: { "Content-Type": "application/json" },
      type: "GET",
    });
    if (bancos) {
      dispatch(addBancos(bancos));
    }
    return bancos;
  };
};

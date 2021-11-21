import { configureStore } from "@reduxjs/toolkit";

import rootToken from "./ducks/auth";
import rootUser from "./ducks/auth";
import rootExpiration from "./ducks/auth";
import rootLancamentos from "./ducks/lancamentos";
import rootBancos from "./ducks/bancos";
import rootEmpresas from "./ducks/empresas";
import rootGrupoEconomico from "./ducks/grupoEconomico";
import rootContas from "./ducks/contas";

export default configureStore({
  reducer: {
    user: rootUser,
    token: rootToken,
    expiration: rootExpiration,

    lancamentos: rootLancamentos,

    bancos: rootBancos,

    empresas: rootEmpresas,

    grupoEconomico: rootGrupoEconomico,

    contas: rootContas,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

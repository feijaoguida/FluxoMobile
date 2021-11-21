import moment from "moment";

export function convertData(data) {
  // converte data para ISO
  if (data) {
    return data.toISOString().slice(0, 10);
  }
  return "";
}

export function readdata(d) {
  if (!d) return null;
  d = d.split("-").map(parseFloat);
  return new Date(d[0], d[1] - 1, d[2]);
}

export function fdata(v) {
  if (v) {
    return moment(v).format("DD/MM/YYYY");
  }
  return "- -/- -/- - - -";
}

/* export function conta(id, contas) {
  if (contas) {
    for (let c of contas) {
      if (c.id == id) {
        return c;
      }
    }
    return { nome: "", numero: "" };
  }
} */

/* export function clabel(contaGerencial, allContas) {
  let label = contaGerencial.nome;

  if (contaGerencial.pai) {
    let c = conta(contaGerencial.pai, allContas);
    console.log(c);
    label = `${clabel(c)} > ${label}`;
  }

  return label;
} */

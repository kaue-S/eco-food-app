function formataPreco(preco) {
  let precoFormatado = preco.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return precoFormatado;
}

/* i = variavel para guardar valores no 
reduce */
function somarValores(preco) {
  let soma = preco.reduce((i, itepreco) => {
    i + itepreco.valor, 0;
  });

  return soma;
}

export { formataPreco, somarValores };

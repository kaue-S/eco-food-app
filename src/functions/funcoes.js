function formataPreco(preco) {
  let precoFormatado = preco.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return precoFormatado;
}

export { formataPreco };

/* Criando um array de objetos de produtos fake */
const arrayProdutos = [
  {
    id: 1,
    nome: "Morango",
    preco: 2.25,
    quantidade: 10,
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmbQ-Wow9xHOqs0lTuSQ7KfOxkd386tIFZuadiQ4Bvag&s",
    filtro: "fruta",
    mercado_id: 1,
    tabelaNutricional: {
      calorias: {
        nome: " Calorias (valor energético)",
        quantidade: "46.95 kcal",
        vd: "2.35%",
      },
      carboidratos_liquidos: {
        nome: "Carboidratos líquidos",
        quantidade: "8.55 g",
        vd: "-",
      },
      carboidratos: {
        nome: "Carboidratos",
        quantidade: "8.55 g",
        vd: "2.85%",
      },
      proteinas: {
        nome: "Proteínas",
        quantidade: "1.16 g",
        vd: "0.39%",
      },
      gorduras_totais: {
        nome: "Gorduras totais",
        quantidade: "1.01 g",
        vd: "1.83%",
      },
      gorduras_saturadas: {
        nome: "Gorduras saturadas",
        quantidade: "0.63 g",
        vd: "2.86%",
      },
      fibra_alimentar: {
        nome: "Fibra alimentar",
        quantidade: "0.00 g",
        vd: "0.00%",
      },
      sodio: {
        nome: "Sódio",
        quantidade: "14.10 mg",
        vd: "0.59%",
      },
    },
    descricao: "Glutém, aveia, trigo, cevada,protéina do leite",
    destaque: "não",
  },
  {
    id: 2,
    nome: "Banana",
    preco: 2.25,
    quantidade: 5,
    foto: "https://upload.wikimedia.org/wikipedia/commons/3/31/Banana_Icon.png",
    filtro: "fruta",
    mercado_id: 2,
    tabelaNutricional: {
      calorias: {
        nome: " Calorias (valor energético)",
        quantidade: "46.95 kcal",
        vd: "2.35%",
      },
      carboidratos_liquidos: {
        nome: "Carboidratos líquidos",
        quantidade: "8.55 g",
        vd: "-",
      },
      carboidratos: {
        nome: "Carboidratos",
        quantidade: "8.55 g",
        vd: "2.85%",
      },
      proteinas: {
        nome: "Proteínas",
        quantidade: "1.16 g",
        vd: "0.39%",
      },
      gorduras_totais: {
        nome: "Gorduras totais",
        quantidade: "1.01 g",
        vd: "1.83%",
      },
      gorduras_saturadas: {
        nome: "Gorduras saturadas",
        quantidade: "0.63 g",
        vd: "2.86%",
      },
      fibra_alimentar: {
        nome: "Fibra alimentar",
        quantidade: "0.00 g",
        vd: "0.00%",
      },
      sodio: {
        nome: "Sódio",
        quantidade: "14.10 mg",
        vd: "0.59%",
      },
    },
    descricao: "Glutém, aveia, trigo, cevada,protéina do leite",
    destaque: "não",
  },
  {
    id: 3,
    nome: "Leite",
    preco: 2.25,
    quantidade: 7,
    foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGd6tezGGe0bq4ViF3E0Z2yNJsvWpk3hRQz-fZvIpkvw&s",
    filtro: "laticinio",
    mercado_id: 3,
    tabelaNutricional: {
      calorias: {
        nome: " Calorias (valor energético)",
        quantidade: "46.95 kcal",
        vd: "2.35%",
      },
      carboidratos_liquidos: {
        nome: "Carboidratos líquidos",
        quantidade: "8.55 g",
        vd: "-",
      },
      carboidratos: {
        nome: "Carboidratos",
        quantidade: "8.55 g",
        vd: "2.85%",
      },
      proteinas: {
        nome: "Proteínas",
        quantidade: "1.16 g",
        vd: "0.39%",
      },
      gorduras_totais: {
        nome: "Gorduras totais",
        quantidade: "1.01 g",
        vd: "1.83%",
      },
      gorduras_saturadas: {
        nome: "Gorduras saturadas",
        quantidade: "0.63 g",
        vd: "2.86%",
      },
      fibra_alimentar: {
        nome: "Fibra alimentar",
        quantidade: "0.00 g",
        vd: "0.00%",
      },
      sodio: {
        nome: "Sódio",
        quantidade: "14.10 mg",
        vd: "0.59%",
      },
    },
    descricao: "Glutém, aveia, trigo, cevada,protéina do leite",
    destaque: "sim",
  },
  {
    id: 4,
    nome: "Goiaba",
    preco: 2.5,
    quantidade: 3,
    foto: "https://upload.wikimedia.org/wikipedia/commons/8/81/Goiaba-fruta.jpg",
    filtro: "fruta",
    mercado_id: 4,
    tabelaNutricional: {
      calorias: {
        nome: " Calorias (valor energético)",
        quantidade: "46.95 kcal",
        vd: "2.35%",
      },
      carboidratos_liquidos: {
        nome: "Carboidratos líquidos",
        quantidade: "8.55 g",
        vd: "-",
      },
      carboidratos: {
        nome: "Carboidratos",
        quantidade: "8.55 g",
        vd: "2.85%",
      },
      proteinas: {
        nome: "Proteínas",
        quantidade: "1.16 g",
        vd: "0.39%",
      },
      gorduras_totais: {
        nome: "Gorduras totais",
        quantidade: "1.01 g",
        vd: "1.83%",
      },
      gorduras_saturadas: {
        nome: "Gorduras saturadas",
        quantidade: "0.63 g",
        vd: "2.86%",
      },
      fibra_alimentar: {
        nome: "Fibra alimentar",
        quantidade: "0.00 g",
        vd: "0.00%",
      },
      sodio: {
        nome: "Sódio",
        quantidade: "14.10 mg",
        vd: "0.59%",
      },
    },
    descricao: "agrotóxicos",
    destaque: "sim",
  },
]; // fim do array de objetos produtos

export default arrayProdutos;

const inputName = document.getElementById("inputName");
const inputPrice = document.getElementById("price");
const inputType = document.getElementById("type");
const inputCategories = document.getElementById("categories");
const inputDate = document.getElementById("date");
const btnRegister = document.getElementById("register");
const listOfRegister = document.getElementById("listOfRegister");
const totalBalance = document.getElementById("totalBalance");
const filterSelect = document.getElementById("filterSelect");

let registerList = [];
let idCount = 1;

function newRegister() {
  if (inputName.value === "") {
    alert("Informe uma descrição");
    return;
  } else if (inputPrice.value === "") {
    alert("Informe um valor");
    return;
  }

  const register = {
    price: Number(inputPrice.value),
    id: idCount,
    type: inputType.value,
    categorie: inputCategories.value,
    description: inputName.value,
    date: inputDate.value,
  };

  registerList.push(register);
  idCount++;
  renderRegister();

  inputName.value = "";
  inputPrice.value = "";
  console.log(registerList);
}

function renderRegister(listToRender = registerList) {
  const render = listToRender.map((register) => {
    return `
            <div class="flex gap-4">
            <p>${register.description}</p>
            <p>Valor: R$${register.price.toFixed(2)}</p>
            <p>Tipo: ${register.type}</p>
            <p>Categoria: ${register.categorie}</p>
            <p>Data: ${register.date}</p>
            
            <button onclick="removeRegister(${register.id})">Remover</button>
            </div>
        
        `;
  });

  listOfRegister.innerHTML = render.join("");
  showTotalValue(listToRender);
}

function removeRegister(id) {
  registerList = registerList.filter((register) => {
    return register.id !== id;
  });

  renderRegister();
}

function showTotalValue(lista = registerList) {
  const totalValue = lista
    .filter((register) => register.price)
    .reduce((acc, register) => {
      return acc + register.price;
    }, 0);

  totalBalance.innerHTML = `Valor total: R$ ${totalValue.toFixed(2)}`;
}

function filtered() {
  const filter = filterSelect.value;
  console.log("1. Filtro selecionado:", filter);
  console.log("2. Lista completa atual:", registerList);

  if (filter === "all") {
    console.log("3. Renderizando todos");
    renderRegister(registerList);
  } else if (filter === "entry") {
    console.log("3. Filtrando entradas");
    const entry = registerList.filter((register) => {
      console.log("   Registro sendo verificado:", register);
      console.log("   register.type === 'entry'?", register.type === "entry");
      return register.type === "entry";
    });
    console.log("4. Entradas encontradas:", entry);
    renderRegister(entry);
  } else if (filter === "exit") {
    console.log("3. Filtrando saídas");
    const exit = registerList.filter((register) => {
      console.log("   Registro sendo verificado:", register);
      console.log("   register.type === 'exit'?", register.type === "exit");
      return register.type === "exit";
    });
    console.log("4. Saídas encontradas:", exit);
    renderRegister(exit);
  }
}

btnRegister.addEventListener("click", newRegister);
filterSelect.addEventListener("change", filtered);

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

  if (filter === "all") {
    renderRegister(registerList);
  } else if (filter === "entry") {
    const entry = registerList.filter((register) => register.type === "entry");
    renderRegister(entry);
  } else if (filter === "exit") {
    const exit = registerList.filter((register) => register.type === "exit");
    renderRegister(exit);
  }
}

btnRegister.addEventListener("click", newRegister);
filterSelect.addEventListener("change", filtered);

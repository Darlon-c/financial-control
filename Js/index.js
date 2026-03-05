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
// criar um novo registro e adiciona no array
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
    category: inputCategories.value,
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
// exibir na tela 
function renderRegister(listToRender = registerList) {
  const render = listToRender.map((register) => {
    // Lógica para cor e ícone baseada no tipo
    const isEntry = register.type === "entry";
    const colorClass = isEntry ? "text-emerald-600" : "text-rose-600";
    const bgIcon = isEntry
      ? "bg-emerald-100 text-emerald-600"
      : "bg-rose-100 text-rose-600";
    const icon = isEntry ? "fa-arrow-up" : "fa-arrow-down";

    return `
      <div class="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border-l-4 ${isEntry ? "border-emerald-500" : "border-rose-500"} hover:shadow-md transition-shadow">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 ${bgIcon} rounded-full flex items-center justify-center">
            <i class="fa-solid ${icon}"></i>
          </div>
          <div>
            <h3 class="font-bold text-slate-700 capitalize">${register.description}</h3>
            <div class="flex gap-2 text-xs text-slate-400 items-center">
              <span class="bg-slate-100 px-2 py-0.5 rounded">${register.category}</span>
              <span>${register.date}</span>
            </div>
          </div>
        </div>
        
        <div class="flex items-center gap-6">
          <span class="font-bold ${colorClass}">
            ${isEntry ? "+" : "-"} R$ ${register.price.toFixed(2)}
          </span>
          <button onclick="removeRegister(${register.id})" class="text-slate-300 hover:text-rose-500 transition-colors">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;
  });

  listOfRegister.innerHTML =
    render.length > 0
      ? render.join("")
      : `<p class="text-center text-slate-400 py-10">Nenhum registro encontrado.</p>`;

  showTotalValue(listToRender);
}
// remover registro
function removeRegister(id) {
  registerList = registerList.filter((register) => {
    return register.id !== id;
  });

  renderRegister();
}
// valor total
function showTotalValue(list = registerList) {
  const totalValue = list.reduce((acc, register) => {
    if (register.type === "entry") {
      acc += register.price;
    } else {
      acc -= register.price;
    }

    return acc;
  }, 0);

  totalBalance.innerHTML = `Valor total: R$ ${totalValue.toFixed(2)}`;
}
// Filtros
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

// eventos e chamada das funçoes
btnRegister.addEventListener("click", newRegister);
filterSelect.addEventListener("change", filtered);

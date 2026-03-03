const inputName = document.getElementById("inputName");
const inputPrice = document.getElementById("price");
const inputType = document.getElementById("type");
const inputCategories = document.getElementById("categories");
const inputDate = document.getElementById("date");
const btnRegister = document.getElementById("register");
const listOfRegister = document.getElementById("listOfRegister");

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

function renderRegister() {
  const render = registerList.map((register) => {
    return `
            <div>
            <p>${register.description}</p>
            <p>${register.price}</p>
            <p>${register.type}</p>
            <p>${register.categorie}</p>
            <p>${register.date}</p>
            
            <button onclick="removeRegister(${register.id})">Remover</button>
            </div>
        
        `;
  });

  listOfRegister.innerHTML = render;
}

function removeRegister(id) {
  registerList = registerList.filter((register) => {
    return register.id !== id;
  });

  renderRegister();
}

btnRegister.addEventListener("click", newRegister);

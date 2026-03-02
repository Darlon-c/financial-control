const inputName = document.getElementById("inputName");
const inputPrice = document.getElementById("price");
const inputType = document.getElementById("type");
const inputCategories = document.getElementById("categories");
const inputDate = document.getElementById("date");
const btnRegister = document.getElementById("register");

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
    date: inputDate,
  };

  registerList.push(register);
  idCount++;

  inputName.value = "";
  inputPrice.value = "";
  console.log(registerList);
}

btnRegister.addEventListener("click", newRegister);

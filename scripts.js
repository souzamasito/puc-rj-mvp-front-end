/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/praias';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.praias.forEach(item => 
        insertList(item.nome, item.ponto, item.cidade, item.uf, item.tipo, item.data))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputName, inputPoint, inputCity, inputUf, inputType, inputDate) => {
  const formData = new FormData();
  formData.append('nome', inputName);
  formData.append('ponto', inputPoint);
  formData.append('cidade', inputCity);
  formData.append('uf', inputUf);
  formData.append('tipo', inputType);
  formData.append('data', inputDate);


  let url = 'http://127.0.0.1:5000/praia';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/praia?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, ponto de referencia e tipo de lixo
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputName = document.getElementById("newName").value;
  let inputPoint = document.getElementById("newPoint").value;
  let inputCity = document.getElementById("newCity").value;
  let inputUf = document.getElementById("newUf").value;
  let inputType = document.getElementById("newType").value;
  let inputDate = document.getElementById("newDate").value;

  if (inputName === '' || inputPoint === '' || inputCity === '' || inputUf === '' || inputType === ''|| inputDate === '') {
    alert("Preencha todos os campos");
    
  } else {
    insertList(inputName, inputPoint, inputCity, inputUf,inputType, inputDate)
    postItem(inputName, inputPoint, inputCity, inputUf, inputType, inputDate)
    alert("Item adicionado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nameName, point, city, uf, type, date) => {
  var item = [nameName, point, city, uf, type, date]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newName").value = "";
  document.getElementById("newPoint").value = "";
  document.getElementById("newCity").value = "";
  document.getElementById("newUf").value = "";
  document.getElementById("newType").value = "";
  document.getElementById("newDate").value = "";


  removeElement()
}
// Event listener para capturar dados do usuário e salvar no Local Storage
document.getElementById("cadastrar").addEventListener("click", function () {
  const nomeUsuario = document.getElementById("nome").value;
  const consumoUsuario = document.getElementById("consumo").value;

  // Recupera o vetor existente ou cria um novo
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Adiciona o novo usuário ao vetor
  usuarios.push({ nome: nomeUsuario, consumo: consumoUsuario });

  // Salva o vetor atualizado no Local Storage
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Usuário cadastrado com sucesso!");
});

// Referências aos elementos
const inputNome = document.getElementById("nome");
const inputConsumo = document.getElementById("consumo");
const btnCadastrar = document.getElementById("cadastrar");
const btnConsultar = document.getElementById("consultar");
const listaConsumo = document.getElementById("lista-consumo");

// Event listener para consultar os dados armazenados no Local Storage
document.getElementById("consultar").addEventListener("click", function () {
  // Recupera o vetor do Local Storage
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  console.log(usuarios);
  listaConsumo.innerHTML = ""; // Limpa a lista antes de exibir

  // Exibe os dados no console ou na tela
  if (usuarios.length > 0) {
    console.log("Usuários cadastrados:");

    const ul = document.createElement("ul"); // Cria uma lista
    usuarios.forEach((usuario, index) => {
      console.log(
        `${index + 1}. Nome: ${usuario.nome}, Consumo: ${usuario.consumo}`
      );

      const li = document.createElement("li"); // Cria um item da lista
      li.textContent = `Nome: ${usuario.nome}   | kWh: ${usuario.consumo}`; // Formata o texto
      ul.appendChild(li); // Adiciona o item à lista
      listaConsumo.appendChild(ul); // Adiciona a lista ao div
    });
  } else {
    console.log("Nenhum usuário cadastrado.");
  }
});

// Evento para cadastrar o consumo
btnCadastrar.addEventListener("click", (event) => {
  event.preventDefault(); // Evita o envio do formulário
  const valor = inputConsumo.value;
  if (valor) {
    // Recupera os dados existentes no localStorage
    const consumos = JSON.parse(localStorage.getItem("consumos")) || [];
    consumos.push(valor); // Adiciona o novo valor
    localStorage.setItem("consumos", JSON.stringify(consumos)); // Salva no localStorage
    inputConsumo.value = ""; // Limpa o campo de entrada

    alert("Consumo informado com sucesso!");
  } else {
    alert("Por favor, informe um valor válido.");
  }
});

// Event listener para consultar os dados armazenados no Local Storage
document.getElementById("consultar").addEventListener("click", function () {
  // Recupera o vetor do Local Storage
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  console.log(usuarios);
  listaConsumo.innerHTML = ""; // Limpa a lista antes de exibir

  // Exibe os dados no console ou na tela
  if (usuarios.length > 0) {
    console.log("Usuários cadastrados:");

    const ul = document.createElement("ul"); // Cria uma lista
    usuarios.forEach((usuario, index) => {
      console.log(
        `${index + 1}. Nome: ${usuario.nome}, Consumo: ${usuario.consumo}`
      );

      const li = document.createElement("li"); // Cria um item da lista
      li.textContent = `Nome: ${usuario.nome}   | kWh: ${usuario.consumo}`; // Formata o texto

      const btnEditar = document.createElement("button");
      btnEditar.textContent = "Editar";
      btnEditar.style.marginLeft = "10px"; // Adiciona um espaçamento ao botão
      li.appendChild(btnEditar); // Adiciona o botão ao item da lista
      ul.appendChild(li);

      btnEditar.addEventListener("click", () => {
        // Cria um diálogo modal
        const dialog = document.createElement("dialog");
        dialog.innerHTML = `
    <form method="dialog">
      <label for="novoNome">Nome:</label>
      <input type="text" id="novoNome" value="${usuario.nome}" required>
      <label for="novoConsumo">Consumo:</label>
      <input type="number" id="novoConsumo" value="${usuario.consumo}" required>
      <button type="submit">Salvar</button>
      <button type="button" id="cancelar">Cancelar</button>
    </form>
  `;

        // Adiciona o diálogo ao corpo do documento
        document.body.appendChild(dialog);
        dialog.showModal();

        // Evento para salvar as alterações
        dialog.querySelector("form").addEventListener("submit", (e) => {
          e.preventDefault();
          const novoNome = dialog.querySelector("#novoNome").value;
          const novoConsumo = dialog.querySelector("#novoConsumo").value;

          // Atualiza os dados do usuário
          usuarios[index] = { nome: novoNome, consumo: novoConsumo };
          localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Atualiza o localStorage
          li.textContent = `Nome: ${novoNome}   | kWh: ${novoConsumo}`; // Atualiza o texto do item
          li.appendChild(btnEditar); // Re-adiciona o botão de editar
          // li.appendChild(btnEditar); // Adiciona o botão ao item da lista
          li.appendChild(btnExcluir); // Re-adiciona o botão de excluir
          dialog.close(); // Fecha o diálogo
          dialog.remove(); // Remove o diálogo do DOM
        });

        // Evento para cancelar a edição
        dialog.querySelector("#cancelar").addEventListener("click", () => {
          dialog.close(); // Fecha o diálogo
          dialog.remove(); // Remove o diálogo do DOM
        });
      });

      // Cria o botão de excluirag
      const btnExcluir = document.createElement("button");
      btnExcluir.textContent = "Excluir";
      btnExcluir.style.marginLeft = "10px"; // Adiciona um espaçamento ao botão

      // Adiciona o evento de clique ao botão de excluir
      btnExcluir.addEventListener("click", () => {
        usuarios.splice(index, 1); // Remove o item da lista pelo índice
        localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Atualiza o localStorage
        li.remove(); // Remove o item da lista do DOM
      });

      li.appendChild(btnExcluir); // Adiciona o botão ao item da lista
      ul.appendChild(li); // Adiciona o item à lista
    });
    listaConsumo.appendChild(ul); // Adiciona a lista ao div
  } else {
    console.log("Nenhum usuário cadastrado.");
    listaConsumo.innerHTML = "<p>Nenhum usuário cadastrado.</p>";
  }
});

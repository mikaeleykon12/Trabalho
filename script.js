document.getElementById("cadastrar").addEventListener("click", function () {
  const nomeUsuario = document.getElementById("nome").value;
  const consumoUsuario = document.getElementById("consumo").value;

  let usuarios = JSON.parse(localStorage.getItem("suarios")) || [];

  usuarios.push({ nome: nomeUsuario, consumo: consumoUsuario });

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Usuário cadastrado com sucesso!");
});

const inputNome = document.getElementById("nome");
const inputConsumo = document.getElementById("consumo");
const btnCadastrar = document.getElementById("cadastrar");
const btnConsultar = document.getElementById("consultar");
const listaConsumo = document.getElementById("lista-consumo");

document.getElementById("consultar").addEventListener("click", function () {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  console.log(usuarios);
  listaConsumo.innerHTML = "";

  if (usuarios.length > 0) {
    console.log("Usuários cadastrados:");

    const ul = document.createElement("ul");
    usuarios.forEach((usuario, index) => {
      console.log(
        `${index + 1}. Nome: ${usuario.nome}, Consumo: ${usuario.consumo}`
      );

      const li = document.createElement("li");
      li.textContent = `Nome: ${usuario.nome}   | kWh: ${usuario.consumo}`;
      ul.appendChild(li);
      listaConsumo.appendChild(ul);
    });
  } else {
    console.log("Nenhum usuário cadastrado.");
  }
});

btnCadastrar.addEventListener("click", (event) => {
  event.preventDefault();
  const valor = inputConsumo.value;
  if (valor) {
    const consumos = JSON.parse(localStorage.getItem("consumos")) || [];
    consumos.push(valor);
    localStorage.setItem("consumos", JSON.stringify(consumos));
    inputConsumo.value = "";

    alert("Consumo informado com sucesso!");
  } else {
    alert("Por favor, informe um valor válido.");
  }
});

document.getElementById("consultar").addEventListener("click", function () {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  console.log(usuarios);
  listaConsumo.innerHTML = "";

  if (usuarios.length > 0) {
    console.log("Usuários cadastrados:");

    const ul = document.createElement("ul");
    usuarios.forEach((usuario, index) => {
      console.log(
        `${index + 1}. Nome: ${usuario.nome}, Consumo: ${usuario.consumo}`
      );

      const li = document.createElement("li");
      li.textContent = `Nome: ${usuario.nome}   | kWh: ${usuario.consumo}`;

      const btnEditar = document.createElement("button");
      btnEditar.textContent = "Editar";
      btnEditar.style.marginLeft = "10px";
      li.appendChild(btnEditar);
      ul.appendChild(li);

      btnEditar.addEventListener("click", () => {
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

        document.body.appendChild(dialog);
        dialog.showModal();

        dialog.querySelector("form").addEventListener("submit", (e) => {
          e.preventDefault();
          const novoNome = dialog.querySelector("#novoNome").value;
          const novoConsumo = dialog.querySelector("#novoConsumo").value;

          usuarios[index] = { nome: novoNome, consumo: novoConsumo };
          localStorage.setItem("usuarios", JSON.stringify(usuarios));
          li.textContent = `Nome: ${novoNome}   | kWh: ${novoConsumo}`;
          li.appendChild(btnEditar);

          li.appendChild(btnExcluir);
          dialog.close();
          dialog.remove();
        });

        dialog.querySelector("#cancelar").addEventListener("click", () => {
          dialog.close();
          dialog.remove();
        });
      });

      const btnExcluir = document.createElement("button");
      btnExcluir.textContent = "Excluir";
      btnExcluir.style.marginLeft = "10px";

      btnExcluir.addEventListener("click", () => {
        usuarios.splice(index, 1); 
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        li.remove();
      });

      li.appendChild(btnExcluir);
      ul.appendChild(li);
    });
    listaConsumo.appendChild(ul);
  } else {
    console.log("Nenhum usuário cadastrado.");
    listaConsumo.innerHTML = "<p>Nenhum usuário cadastrado.</p>";
  }
});

const logado1 = sessionStorage.getItem("logado1");
const listaUsuarios1 = JSON.parse(localStorage.getItem("usuarios") || "[]");
const formRecado = document.querySelector("#form-novo-recado");
const inputTituloNovoRecado = document.querySelector(
  "#titulo-novo-recado-input"
);
const inputNovoRecado = document.querySelector("#novo-recado-input");
const listaElementos = document.querySelector("#recados");
const botaoLogout = document.getElementById("logout");
const tituloComNome = document.getElementById("titulo-home");

document.addEventListener("DOMContentLoaded", () => {
  checarLogado();

  function checarLogado() {
    if (!logado1) {
      window.location.href = "f1_index.html";
      return;
    }
  }

  let listaUsuarios1 = buscarTodosUsuarios();

  let user = listaUsuarios1.find((valor) => valor.email == logado1);

  tituloComNome.innerHTML = `Olá, <span>${user.username}</span> `;

  user.recados.forEach((recado) => montarRecado(recado));
});

function buscarTodosUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios") || "[]");
}

botaoLogout.addEventListener("click", () => {
  sessionStorage.removeItem("logado1");
  document.location.reload();
});

formRecado.addEventListener("submit", (e) => {
  e.preventDefault();

  salvarRecado();
});

function salvarRecado() {
  let recado = inputNovoRecado.value;
  let tituloRecado = inputTituloNovoRecado.value;

  const novoRecado = {
    titulo: tituloRecado,
    detalhamento: recado,
    id: Math.floor(Math.random() * Date.now()),
  };

  let user = listaUsuarios1.find((valor) => valor.email == logado1);

  user.recados.push(novoRecado);

  atualizarDadosUsuario(user);
  formRecado.reset();
  montarRecado(novoRecado);
}

function atualizarDadosUsuario(dadosAtualizados) {
  let user = listaUsuarios1.find((valor) => valor.email == logado1);

  user = dadosAtualizados;

  atualizarStorage();
}

function atualizarStorage() {
  localStorage.setItem("usuarios", JSON.stringify(listaUsuarios1));
}

function montarRecado(novoRecado) {
  let titulo = novoRecado.titulo;
  let recado = novoRecado.detalhamento;
  const elementoRecado = document.createElement("div");
  elementoRecado.classList.add("recado");
  elementoRecado.setAttribute("id", novoRecado.id);
  const conteudoRecado = document.createElement("div");
  conteudoRecado.classList.add("conteudo-recado");
  elementoRecado.appendChild(conteudoRecado);
  const inputRecado = document.createElement("input");
  inputRecado.classList.add("texto-recado");
  inputRecado.type = "text";
  inputRecado.value = recado;
  inputRecado.setAttribute("readonly", "readonly");
  const inputTitulo = document.createElement("input");
  inputTitulo.classList.add("titulo-recado");
  inputTitulo.type = "text";
  inputTitulo.value = titulo;
  inputTitulo.setAttribute("readonly", "readonly");
  conteudoRecado.appendChild(inputTitulo);
  conteudoRecado.appendChild(inputRecado);
  const botoesRecado = document.createElement("div");
  botoesRecado.classList.add("botoes-recado");
  const botaoEditarRecado = document.createElement("button");
  botaoEditarRecado.classList.add("editar-recado");
  botaoEditarRecado.innerHTML = "EDITAR";
  const botaoDeletarRecado = document.createElement("button");
  botaoDeletarRecado.classList.add("deletar-recado");
  botaoDeletarRecado.innerHTML = "DELETAR";
  botoesRecado.appendChild(botaoEditarRecado);
  botoesRecado.appendChild(botaoDeletarRecado);
  elementoRecado.appendChild(botoesRecado);
  listaElementos.appendChild(elementoRecado);
  botaoEditarRecado.addEventListener("click", () =>
    editarRecado(botaoEditarRecado, inputTitulo, inputRecado, novoRecado.id)
  );
  botaoDeletarRecado.addEventListener("click", () =>
    apagarRecado(novoRecado.id)
  );
}

function editarRecado(botaoEditarRecado, inputTitulo, inputRecado, id) {
  let user = listaUsuarios1.find((valor) => valor.email == logado1);
  let recadoEspecifico = user.recados.findIndex((recado) => recado.id === id);
  if (botaoEditarRecado.innerText.toLocaleLowerCase() == "editar") {
    inputRecado.removeAttribute("readonly");
    inputRecado.focus();
    inputTitulo.removeAttribute("readonly");
    inputTitulo.focus();
    botaoEditarRecado.innerText = "SALVAR";
  } else {
    inputRecado.setAttribute("readonly", "readonly");
    inputTitulo.setAttribute("readonly", "readonly");
    botaoEditarRecado.innerText = "EDITAR";
    let novoInput = inputRecado.value;
    let novoTitulo = inputTitulo.value;
    user.recados[recadoEspecifico].detalhamento = novoInput;
    user.recados[recadoEspecifico].titulo = novoTitulo;
    atualizarDadosUsuario(user);
  }
}

function apagarRecado(id) {
  let user = listaUsuarios1.find((valor) => valor.email == logado1);
  let recadoEspecifico = user.recados.findIndex((recado) => recado.id === id);

  let linhaRecado = document.getElementById(id);

  let confirma = confirm(`Você realmente deseja apagar esse recado?`);

  if (confirma) {
    linhaRecado.remove();
    user.recados.splice(recadoEspecifico, 1);
    atualizarDadosUsuario(user);
  } else {
    return;
  }
}

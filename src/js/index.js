let logLogado = sessionStorage.getItem('logado1');
let usuarios1 = JSON.parse(localStorage.getItem('usuarios') || '[]');

let botaoLogin = document.getElementById("submit1");

document.addEventListener('DOMContentLoaded', () => {
    checarLogado();

    function checarLogado(){
        if(logado1) {
            salvarSessao(logado1);
            window.location.href = "recados.html";
        }
    }
})

botaoLogin.addEventListener('click', () => {
    verificarLogin();
})

function verificarLogin(){
    let emailHTML = document.getElementById('userName');
    let senhaHTML = document.getElementById('senha');

    let user = listaUsuarios1.find(
        (valor) => valor.email === emailHTML.value && valor.password === senhaHTML.value);

    if(!user){
        alert('E-mail ou Senha inválidos.');
        return;
    }

    salvarSessao(emailHTML.value);
    window.location.href = "recados.html";
}

function salvarSessao(data) {
    JSON.stringify(sessionStorage.setItem("logado1", data));
}
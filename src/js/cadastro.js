let listaUsuarios1 = JSON.parse(localStorage.getItem('usuarios') || '[]');
let logado1 = sessionStorage.getItem('logado1');
let formularioCadastro = document.getElementById("form-registro");

document.addEventListener('DOMContentLoaded', () => {
    checarLogado();

    function checarLogado(){
        if(logado1) {
            window.location.href = "recados.html";
            return;
        }
    }
})

formularioCadastro.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let usuario = document.getElementById('valorUsuario').value;
    let email = document.getElementById('valorEmail').value;
    let senha = document.getElementById('valorSenha').value;
    let senha2 = document.getElementById('valorSenha2').value;

    if(senha!=senha2){
        alert('Senhas não coincidem');
        return;
    }

    const user = {
        username: usuario,
        email: email,
        password: senha,
        recados: []
    }

    let existe = listaUsuarios1.some((valor) => valor.email === email)

    if(existe){
        alert('E-mail já cadastrado!');
        return
    }

    listaUsuarios1.push(user);
    salvarDadosStorage(listaUsuarios1);

    window.location.href = "f1_index.html";
});

function salvarDadosStorage(listaUsuarios1){
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios1));
};
const form = document.querySelector(".formulario-fale-conosco");

function mostrarForm() {
  form.style.display = "flex"; // 🔵 Mostra o formulário
  document.body.style.overflow = "hidden";
}

function esconderForm() {
  form.style.display = "none"; // 🔴 Esconde o formulário
  document.body.style.overflow = "auto";
}

const fecharContato = document.querySelector(".fechar-contato");
fecharContato.addEventListener("click", esconderForm);


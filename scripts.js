const form = document.querySelector(".formulario-fale-conosco");

function mostrarForm() {
  form.style.left = "50%";
  form.style.transform = "translateX(-50%)";
  document.body.style.overflow = "hidden"; 
}

function esconderForm() {
  form.style.left = "-300px"; 
  form.style.transform = "translateX(0)";
  document.body.style.overflow = "auto"; 

const fecharContato = document.querySelector(".fechar-contato");
fecharContato.addEventListener("click", esconderForm);
}
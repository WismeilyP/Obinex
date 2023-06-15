/*********--- Cards NFTs---**********/
function flipCard() 
{
  var inform= document.getElementById("this");
  inform.classList.toggle('flip')
}
function flipCard2() 
{
  var inform2= document.getElementById("this2");
  inform2.classList.toggle('flip')
}
function flipCard3() 
{
  var inform3= document.getElementById("this3");
  inform3.classList.toggle('flip')
}

/*********--- Inputs NFTs---**********/
document.addEventListener("DOMContentLoaded", function() {
  
  function calcularPrecioTotal(input, resultado, precio) {
      resultado.value = input.value * precio;
  }

  function cambiarCantidad(input, cambio, resultado, precio) {
      input.value = Math.max(1, parseFloat(input.value) + cambio);
      calcularPrecioTotal(input, resultado, precio);
  }

  function setupCalculadora(inputId, resultadoId, precio) {
      const input = document.getElementById(inputId);
      const resultado = document.getElementById(resultadoId);

      calcularPrecioTotal(input, resultado, precio);
      input.addEventListener("input", () => calcularPrecioTotal(input, resultado, precio));
      document.getElementById(`restar_${inputId}`).addEventListener("click", () => cambiarCantidad(input, -1, resultado, precio));
      document.getElementById(`sumar_${inputId}`).addEventListener("click", () => cambiarCantidad(input, 1, resultado, precio));
  }

  setupCalculadora("cantidad1", "precioTotal1", 250);
  setupCalculadora("cantidad2", "precioTotal2", 300);
  setupCalculadora("cantidad3", "precioTotal3", 400);

});

const questions = document.querySelectorAll('.question');

questions.forEach(question => {
  const answer = question.querySelector('.answer');
  const title = question.querySelector('.question-title');
  const symbol = question.querySelector('.toggle-symbol');

  title.addEventListener('click', () => {
    const isOpen = question.classList.toggle('open');

    if (isOpen) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      symbol.textContent = '-';
    } else {
      answer.style.maxHeight = 0;
      symbol.textContent = '+';
    }
  });
});



  

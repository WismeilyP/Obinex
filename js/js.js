


/*********--- Monedas del hero ---**********/
window.addEventListener('scroll', function() 
{
  var hero = document.querySelector('.hero');
  var scrollPosition = window.pageYOffset;

  if (scrollPosition > 200) {
    hero.classList.add('is-scrolled');
  } else {
    hero.classList.remove('is-scrolled');
  }
});


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
    resultado.value = "$" + input.value * precio;
  }

  function cambiarCantidad(input, cambio, resultado, precio) {
    input.value =  Math.max(0, parseFloat(input.value) + cambio);
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

  function initializeInputs(inputIds) {
    inputIds.forEach(function(inputId) {
      const input = document.getElementById(inputId);
      input.value = 0;
    });
  }

  const inputIds = ["cantidad1", "cantidad2", "cantidad3"];
  initializeInputs(inputIds);
  setupCalculadora("cantidad1", "precioTotal1", 600);
  setupCalculadora("cantidad2", "precioTotal2", 200);
  setupCalculadora("cantidad3", "precioTotal3", 75);
});



/*********--- Carrusel ---**********/
var carousel = document.querySelector(".carousel");
var cardsWrapper = document.querySelector(".cards");
var prevBtn = document.querySelector(".prev");
var nextBtn = document.querySelector(".next");
var currentIndex = 0;

prevBtn.addEventListener("click", function () {
  navigateCarousel("prev");
});

nextBtn.addEventListener("click", function () {
  navigateCarousel("next");
});

function navigateCarousel(direction) {
  if (direction === "prev" && currentIndex > 0) {
    currentIndex--;
  } else if (direction === "next" && currentIndex < cardsWrapper.children.length - 1) {
    currentIndex++;
  }

  var cardWidth = carousel.offsetWidth;
  var offset = -currentIndex * cardWidth;
  cardsWrapper.style.transform = "translateX(" + offset + "px)";

  updateArrowVisibility();
}

function navigateCarousel(direction) {
  if (direction === "prev" && currentIndex > 0) {
    currentIndex--;
  } else if (direction === "next" && currentIndex < cardsWrapper.children.length - 1) {
    currentIndex++;
  }

  var cardWidth = carousel.offsetWidth;
  var offset = -currentIndex * cardWidth;
  cardsWrapper.style.transform = "translateX(" + offset + "px)";

  updateArrowVisibility();
}

function updateArrowVisibility() {
  prevBtn.style.display = currentIndex > 0 ? "block" : "none";
  nextBtn.style.display = currentIndex < cardsWrapper.children.length - 1 ? "block" : "none";
}

carousel.addEventListener("mouseenter", function () {
  updateArrowVisibility();
});

carousel.addEventListener("mouseleave", function () {
  prevBtn.style.display = "none";
  nextBtn.style.display = "none";
});



/*********--- SELECTOR ---**********/
var selectedLanguage = document.querySelector(".selected-language");
var languageOptions = document.querySelector(".language-options");
var languageOptionsList = document.querySelectorAll(".language-options li a");

selectedLanguage.addEventListener("click", function () {
  languageOptions.style.display = languageOptions.style.display === "block" ? "none" : "block";
});

languageOptionsList.forEach(function (option) {
  option.addEventListener("click", function (event) {
    event.preventDefault();
    var selectedValue = option.textContent;
    selectedLanguage.querySelector(".language-name").textContent = selectedValue;
    languageOptions.style.display = "none";
    var url = option.getAttribute("href");
    window.location.href = url;
  });
});

document.addEventListener("click", function (event) {
  if (!selectedLanguage.contains(event.target)) {
    languageOptions.style.display = "none";
  }
});




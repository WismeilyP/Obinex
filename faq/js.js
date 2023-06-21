const questions = document.querySelectorAll('.question');

questions.forEach(question => {
  const answer = question.querySelector('.answer');
  const title = question.querySelector('.question-title');
  const symbol = question.querySelector('.toggle-symbol');

  title.addEventListener('click', () => {
    const isOpen = question.classList.toggle('open');

    // Cerrar las demás preguntas
    questions.forEach(q => {
      if (q !== question) {
        q.classList.remove('open');
        q.querySelector('.answer').style.maxHeight = 0;
        q.querySelector('.toggle-symbol').textContent = '+';
      }
    });

    if (isOpen) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      symbol.textContent = '-';
    } else {
      answer.style.maxHeight = 0;
      symbol.textContent = '+';
    }
  });
});


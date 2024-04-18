
const currentYear = new Date().getFullYear();
  document.getElementById('copyright').textContent = `Copyright © ${currentYear} Ddlgc`;




  function truncateText(selector, maxLength) {
    var elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var text = element.innerText;
      var words = text.split(' ');
  
      if (words.length > maxLength) {
        text = words.slice(0, maxLength).join(' ') + '...';
        element.innerText = text;
      }
  }
}
function adjustTruncate() {
  var screenWidth = window.innerWidth;
  if (screenWidth >= 767 && screenWidth <= 1111) {
    truncateText('.js-truncate', 17); 
  } else {
    truncateText('.js-truncate', 39); 
  }
}


document.addEventListener("DOMContentLoaded", adjustTruncate);
window.addEventListener('resize', adjustTruncate);

// ***********Modal*******

document.addEventListener('DOMContentLoaded', function () {
  const subjectSelect = document.getElementById('contact-subject');
  const messageTextArea = document.getElementById('contact-message');

  subjectSelect.addEventListener('change', function () {
    let message = '';
    switch (this.value) {
      case 'reservation':
        message = 'Bonjour, je souhaite faire une réservation.';
        break;
      case 'visite':
        message = 'Bonjour, je suis intéressé par une visite.';
        break;
      case 'naissance':
        message = 'Bonjour, j’aimerais obtenir des informations sur les naissances récentes.';
        break;
      default:
        message = '';
    }
    messageTextArea.value = message;
  });
});
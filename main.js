
const currentYear = new Date().getFullYear();
  document.getElementById('copyright').textContent = `Copyright © ${currentYear} Ddlgc`;




function truncateText(selector, maxLength) {
  var elements = document.querySelectorAll(selector);
  for (var i = 0; i < elements.length; i++) {
    var text = elements[i].innerText;
    if (text.split(' ').length > maxLength) {
      text = text.split(' ').slice(0, maxLength).join(' ') + '...';
      elements[i].innerText = text;
    }
  }
}

// Appel de la fonction pour tronquer le texte sur les petits écrans
if (window.innerWidth > 768) {
  truncateText('.js-truncate', 30);

}

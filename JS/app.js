class CopyrightUpdater {
  constructor(selector){
    this.element = document.querySelector(selector);
  }
  render() {
    if (!this.element) return;
    const year = new Date().getFullYear();
    this.element.tectContent = `Copyright  © ${year} Ddlgc`;
  }
}

class TextTruncator {
  constructor(selector) {
    this.selector = selector;
    this.originalTexts = new Map();
    this.elements = document.querySelectorAll(selector);
    this.elements.forEach(element => this.originalTexts.set(element, element.innerText));
  }
truncate(maxWords) {
  this.elements.forEach(element => {
    const full = this.originalTexts.get(element);
    const words = full.split(' ');
    element.innerText = words.length > maxWords
      ? words.slice(0, maxWords).join(' ') + '...'
      : full;
  });
}
  adjustToScreen() {
    const width= window.innerWidth;
    const maxWords = (width >= 767 && width <= 1111) ? 17 :39;
    this.truncate(maxWords);
  }
  init() {
    const width = window.innerWidth;
    this.adjustToScreen()
    window.addEventListener('resize', () => this.adjustToScreen())
  }
}


class ContactModal {
  constructor(selectId, textareaId) {
    this.select = document.getElementById(selectId);
    this.textarea = document.getElementById(textareaId)
    this.message = {
      reservation: 'Bonjour, je souhaite faire une réservation.',
      visite: 'Bonjour, je suis intéressé par une visite.',
      naissance: 'Bonjour, j’aimerais obtenir des informations sur les naissances récentes.'
    };
  }
  init(){
    if(!this.select || !this.textarea)return;
    this.select.addEventListener('change', () => {
      this.textarea.value = this.message[this.select.value] || '';
    });
  }
}

class App {
  constructor() {
    this.copyright = new CopyrightUpdater('#copyright');
    this.truncator = new TextTruncator('.js-truncate');
    this.contactModal = new ContactModal('contact-subject', 'contact-message');
  }
  init() {
    this.copyright.render();
    this.truncator.init();
    this.contactModal.init();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App().init();
});
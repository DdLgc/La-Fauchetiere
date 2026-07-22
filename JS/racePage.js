class RacePage {
  constructor(jsonPath, breedKey) {
    this.jsonPath = jsonPath;
    this.breedKey = breedKey;
    this.contentElement = document.getElementById("race-content");
    this.titleElement = document.getElementById("page-title");
  }

  async load() {
    const response = await fetch(this.jsonPath);
    const data = await response.json();
    this.breed = data[this.breedKey];
    if (!this.breed) {
      this.renderNotFound();
      return;
    }
    this.render();
  }

  renderNotFound() {
    this.contentElement.innerHTML = `<p class="text-center">Race introuvable.</p>`;
  }

  render() {
    this.titleElement.textContent = `${this.breed.name} - Domaine de la Fauchetière`;

    const statsHtml = Object.entries(this.breed.stats).map(([label, value]) => `- ${label} : ${value}`).join("<br>");

    this.contentElement.innerHTML = `
    <h2 class="text-center fw-bold">${this.breed.name}</h2>
      <div class="row">
        <div class="col-md-6">
          <h5 class="fw-bold mt-3">${this.breed.intro}</h5>
          <p class="fw-bold mt-3">${statsHtml}</p>
        </div>
        <div class="col-md-6">
          <h5 class="fw-bold mt-3">Son caractère</h5>
          ${this.breed.character}
          <h5 class="fw-bold mt-3">Soins et alimentation</h5>
          ${this.breed.care}
          <h5 class="fw-bold mt-3">L'alimentation</h5>
          ${this.breed.diet}
          <h5 class="fw-bold mt-3">Santé</h5>
          ${this.breed.health}
        </div>
      </div>
    `;
  }
}
document.addEventListener('DOMContentLoaded', async ()=> {
  await new RacePage('data/races.json', breedKey).load();
  new Gallery('data/gallery.json').renderByBreed(breedKey, '#race-gallery-grid');
  new Lightbox().bindTo('#race-gallery-grid');
});

const params = new URLSearchParams(window.location.search);
const breedKey = params.get('breed') || 'spitzLoup';
console.log('breedKey:', breedKey, '| full URL:', window.location.href);

document.addEventListener('DOMContentLoaded', ()=> {
    new RacePage('data/races.json', breedKey).load()
});
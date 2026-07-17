class Gallery {
  constructor(jsonPath) {
    this.jsonPath = jsonPath;
    this.data = null;
  }

  async loadData() {
    if (this.data) return this.data;
    const response = await fetch(this.jsonPath);
    this.data = await response.json();
    return this.data;
  }

  shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  renderImages(images, targetSelector) {
    const container = document.querySelector(targetSelector);
    if (!container) return;
    container.innerHTML = images.map(img => `
      <div class="col-12 col-md-6 col-lg-3 my-3 gallery-item">
        <img src="${img.src}" alt="${img.alt}" class="img-fluid" loading="lazy">
      </div>
    `).join('');
  }

  renderCarousel(images, targetSelector) {
    const container = document.querySelector(targetSelector);
    if (!container) return;
    container.innerHTML = images.map(img => `
      <div class="carousel-photo">
        <img src="${img.src}" alt="${img.alt}" loading="lazy">
      </div>
    `).join('');
  }

  async renderRandomHomepage(targetSelector, count = 8) {
    const data = await this.loadData();
    const allImages = Object.values(data).flat();
    const picked = this.shuffle(allImages).slice(0, count);
    this.renderCarousel(picked, targetSelector);
  }

  async renderByBreed(breedKey, targetSelector) {
    const data = await this.loadData();
    const images = data[breedKey] || [];
    this.renderImages(images, targetSelector);
  }

  async renderAll(targetSelector) {
    const data = await this.loadData();
    const allImages = Object.values(data).flat();
    this.renderImages(allImages, targetSelector);
  }
}

class GalleryCarousel {
  constructor(wrapperSelector) {
    this.wrapper = document.querySelector(wrapperSelector);
    if (!this.wrapper) return;
    this.track = this.wrapper.querySelector('.gallery-carousel');
    this.leftBtn = this.wrapper.querySelector('.gallery-arrow-left');
    this.rightBtn = this.wrapper.querySelector('.gallery-arrow-right');
  }

  scroll(direction) {
    if (!this.track) return;
    this.track.scrollBy({ left: direction * this.track.clientWidth, behavior: 'smooth' });
  }

  init() {
    if (!this.track || !this.leftBtn || !this.rightBtn) return;
    this.leftBtn.addEventListener('click', () => this.scroll(-1));
    this.rightBtn.addEventListener('click', () => this.scroll(1));
  }
}
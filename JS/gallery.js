class Gallery {
    constructor(jsonPath){
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
        for (let i = shuffled.length -1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j],shuffled[i]];
        }
        return shuffled;
    }

    renderImages(images, targetSelector) {
        const container = document.querySelector(targetSelector);
        if (!container) return
        container.innerHTML = images.map(img=> `
            <img src="${img.src}" alt="${img.alt}" class="img-fluid" loading="lazy">
      </div>
    `).join('');
    }

    async renderRandomHomepage(targetSelector, count = 4) {
        const data = await this.loadData();
        const allImages = Object.values(data).flat();
        const picked = this.shuffle(allImages).slice(0, count);
        this.renderImages(picked, targetSelector);
    }

    async renderByBreed(breedKey, targetSelector) {
        const data = await this.loadData();
        const images = data[breedKey] || [];
        this.renderImages(images, targetSelector);
    }
}
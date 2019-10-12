import { observable, action } from 'mobx'
import handleErrors from './HandleErrors';

class SlideshowModel {

    @observable index = 0;
    @observable slides = [];

    @action getSlides(callback) {
        fetch("http://localhost:3000/api/get_games/", {
            method: "GET",
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => handleErrors(response, callback))
            .then(response => {
                if (response) {
                    this.slides = response.items
                    this.index = this.slides.length - 1
                    this.index = 0
                }
            })
    }

    @action nextIndex() {
        this.index = ++this.index;
        if (this.index === this.slides.length) {
            this.index = 0;
        }
    }

    @action prevIndex() {
        this.index = --this.index;
        if (this.index === -1) {
            this.index = this.slides.length + this.index;
        }
    }

    @action setIndex(n) {
        return this.index = n;
    }

    getSize() {
        return this.slides.length
    }

    getNameAt(n) {
        if (this.slides.length <= n) {
            return null
        }
        return this.slides[n].name;
    }

    getDescAt(n) {
        if (this.slides.length <= n) {
            return null
        }
        return this.slides[n].description;
    }

    getLinkAt(n) {
        if (this.slides.length <= n) {
            return null
        }
        return this.slides[n].link;
    }

    getSrcAt(n) {
        if (this.slides.length <= n) {
            return null
        }
        return this.slides[n].src;
    }

    getPriceAt(n) {
        if (this.slides.length <= n) {
            return null
        }
        return this.slides[n].price;
    }

    getName() {
        if (this.slides.length <= this.index) {
            return null
        }
        return this.slides[this.index].name;
    }

    getDesc() {
        if (this.slides.length <= this.index) {
            return null
        }
        return this.slides[this.index].description;
    }

    getLink() {
        if (this.slides.length <= this.index) {
            return null
        }
        return this.slides[this.index].link;
    }

    getSrc() {
        if (this.slides.length <= this.index) {
            return null
        }
        return this.slides[this.index].src;
    }

    getPrice() {
        if (this.slides.length <= this.index) {
            return null
        }
        return this.slides[this.index].price;
    }

    getIndex() {
        return this.index;
    }

    getCurrentSlide() {
        return this.slides[this.index]
    }

    getArray() {
        const arr = [];
        this.slides.forEach((slide, n) => arr.push(n));
        return arr;
    }
}

export default SlideshowModel
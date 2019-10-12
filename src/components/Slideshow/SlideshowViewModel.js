class SlideshowViewModel {
    constructor(slideshowStore, currProductStore, history) {
        this.store = slideshowStore;
        this.currProductStore = currProductStore
        this.history = history;
        this.store.getSlides(function() {
            history.push("/login")
        })
    }

    getSize() {
        return this.store.getSize()
    }

    nextIndex() {
        return this.store.nextIndex()
    }

    prevIndex() {
        return this.store.prevIndex()
    }

    getName() {
        return this.store.getName()
    }

    getSrc() {
        return this.store.getSrc()
    }

    getDesc() {
        return this.store.getDesc()
    }

    getLink() {
        return this.store.getLink()
    }

    getPrice() {
        return this.store.getPrice()
    }

    getIndex() {
        return this.store.getIndex();
    }

    getNameAt(n) {
        return this.store.getNameAt(n)
    }

    getDescAt(n) {
        return this.store.getDescAt(n)
    }

    getSrcAt(n) {
        return this.store.getSrcAt(n)
    }

    getLinkAt(n) {
        return this.store.getLinkAt(n)
    }

    getPriceAt(n) {
        return this.store.getPriceAt(n)
    }

    setIndex(n) {
        return this.store.setIndex(n)
    }

    getArray() {
        return this.store.getArray();
    }

    viewCurrentProduct = () => {
        this.history.push("/view/" + this.store.getCurrentSlide().id)
    }
}

export default SlideshowViewModel
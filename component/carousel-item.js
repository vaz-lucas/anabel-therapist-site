class CarouselItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {}

  render() {
    this.innerHTML = "<div>My Component</div>";
  }
}

window.customElements.define("carousel-item", CarouselItem);

export { CarouselItem };

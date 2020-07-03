export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // рендерим секцию
  renderItems(cards) {
    cards.forEach((item) => {
      this._renderer(item);
    });
  }

  // добавляем элемент в секцию
  addItem(element) {
    this._container.prepend(element);
  }

  // добавляем элементы по умолчанию
  addDefaultItem(element) {
    this._container.append(element);
  }
}

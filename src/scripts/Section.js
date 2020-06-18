export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._data = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // рендерим секцию
  renderItems() {
    this._data.forEach((item) => {
      this._renderer(item);
    });
  }

  // добавляем элемент в секцию
  addItem(element, initialCards) {
    if (initialCards === true) {
    this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}
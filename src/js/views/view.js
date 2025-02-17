import icons from "url:/public/icons.svg";

class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.lenght === 0))
      return this.renderErrorMessage();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._insertMarkup(markup);
  }

  /**
   * Updates the DOM with an algorithm where it has been changed.
   * @param {Object} data a recipe object that will update in existed place
   * @returns {undefined}
   * @this {Object} View instance
   * @author Pezhwa Dev
   */
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.textContent.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderErrorMessage(message = this._errorMessage) {
    const markup = this._generateErrorMarkup(message);
    this._clear();
    this._insertMarkup(markup);
  }

  _generateErrorMarkup(message) {
    return `<div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;
  }

  renderMessage(message = this._message) {
    const markup = this._generateMessageMarkup(message);
    this._clear();
    this._insertMarkup(markup);
  }

  _generateMessageMarkup(message) {
    return `<div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _insertMarkup(markup) {
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner() {
    const markup = `
            <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
            `;
    this._clear();
    this._insertMarkup(markup);
  }
}

export default View;

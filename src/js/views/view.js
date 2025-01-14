import icons from "url:../../../src/img/icons.svg";

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

import View from "./view";

class SearchView extends View {
  _parentElement = document.querySelector(".search");
  _searchField = document.querySelector(".search__field");

  constructor() {
    super();
    this._searchField.focus(); //FIXME
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
    this.clearInput(); //FIXME
  }

  clearInput() {
    this._searchField.value = "";
    this._searchField.blur();
  }

  getQuery() {
    const query = this._searchField.value;
    return query;
  }
}

export default new SearchView();

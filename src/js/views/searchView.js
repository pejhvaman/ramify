import View from "./view";

class SearchView extends View {
  _parentElement = document.querySelector(".search");
  _searchField = document.querySelector(".search__field");

  constructor() {
    super();
  }

  addHandlerSearch(handler) {
    this._parentElement?.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  clearInput() {
    this._searchField.value = "";
    this._searchField.blur();
  }

  getQuery() {
    const query = this._searchField.value;
    this.clearInput();
    return query;
  }
}

export default new SearchView();

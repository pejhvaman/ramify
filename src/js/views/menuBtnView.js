import View from "./view";

class MenuBtnView extends View {
  _parentElement = document.querySelector(".menu-btn");
  _listParentElement = document.querySelector(".search-results");

  addHandlerToggleList(handler) {
    this._parentElement.addEventListener("click", function () {
      handler();
    });
  }

  toggleList(display) {
    if (display === "show") {
      this._listParentElement.classList.remove("hidden");
    }
    if (display === "hide") {
      this._listParentElement.classList.add("hidden");
    }
  }
}

export default new MenuBtnView();

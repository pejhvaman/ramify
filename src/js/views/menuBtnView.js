import View from "./view";
import menuIcon from "/public/icons/arrow-three-line.svg";

class MenuBtnView extends View {
  _parentElement = document.querySelector(".menu-btn");
  _listParentElement = document.querySelector(".search-results");

  constructor() {
    super();
    this._parentElement.innerHTML = `<svg class="recipe__info-icon">
              <use xlink:href="${menuIcon}"></use>
            </svg>`;
    this._listParentElement.classList.add("hidden");
  }

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

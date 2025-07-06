import View from "./view";
const menuIcon = new URL(
  "../../assets/icons/arrow-three-line.svg",
  import.meta.url
).href;

console.log(menuIcon);

class MenuBtnView extends View {
  get _parentElement() {
    return document.querySelector(".menu-btn");
  }

  get _listParentElement() {
    return document.querySelector(".search-results");
  }

  constructor() {
    super();
  }

  init() {
    if (this._parentElement && this._listParentElement) {
      this._parentElement.innerHTML = `<svg class="menu-btn__icon">
              <use xlink:href="${menuIcon}"></use>
            </svg>`;

      // this._listParentElement?.classList.add("hidden");
    }
  }

  addHandlerToggleList(handler) {
    this._parentElement?.addEventListener("click", function () {
      handler();
    });
  }

  toggleList(display) {
    if (display === "show") {
      this._listParentElement?.classList.remove("hidden");
    }
    if (display === "hide") {
      this._listParentElement?.classList.add("hidden");
    }
  }
}

export default new MenuBtnView();

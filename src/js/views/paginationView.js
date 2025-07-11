const arrowLeftIcon = new URL(
  "../../assets/icons/arrow-left.svg",
  import.meta.url
).href;
const arrowRightIcon = new URL(
  "../../assets/icons/arrow-right.svg",
  import.meta.url
).href;

import View from "./view";

class PaginationView extends View {
  constructor() {
    super();
  }

  get _parentElement() {
    return document.querySelector(".pagination");
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (curPage === 1 && numPage > 1)
      return `
          <button class="btn--inline pagination__btn--next" data-goto="${
            curPage + 1
          }">
            <svg class="search__icon">
              <use xlink:href="${arrowLeftIcon}"></use>
            </svg>
            <span>Page ${curPage + 1}</span>
          </button>`;
    if (curPage === numPage && numPage > 1)
      return `
          <button class="btn--inline pagination__btn--prev" data-goto="${
            curPage - 1
          }">
          <span>Page ${curPage - 1}</span>
          <svg class="search__icon">
            <use xlink:href="${arrowRightIcon}"></use>
          </svg>
           </button>
    `;
    if (curPage < numPage && curPage > 1)
      return `
          <button class="btn--inline pagination__btn--prev" data-goto="${
            curPage - 1
          }">
          <span>Page ${curPage - 1}</span>
          <svg class="search__icon">
            <use xlink:href="${arrowRightIcon}"></use>
          </svg>
          </button>
          <button class="btn--inline pagination__btn--next" data-goto="${
            curPage + 1
          }">
          <svg class="search__icon">
            <use xlink:href="${arrowLeftIcon}"></use>
          </svg>
            <span>Page ${curPage + 1}</span>
          </button>
    `;
    return ``;
  }

  addHandlerPagination(handler) {
    this._parentElement?.addEventListener("click", function (e) {
      const btn = e.target.closest("button");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
}
export default new PaginationView();

import View from "./view";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

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
                <span class="icon-emoji">⬅</span>

            <span>Page ${curPage + 1}</span>
          </button>`;
    if (curPage === numPage && numPage > 1)
      return `
          <button class="btn--inline pagination__btn--prev" data-goto="${
            curPage - 1
          }">
          <span>Page ${curPage - 1}</span>
                <span class="icon-emoji">➡</span>
         
           </button>
    `;
    if (curPage < numPage && curPage > 1)
      return `
          <button class="btn--inline pagination__btn--prev" data-goto="${
            curPage - 1
          }">
          <span>Page ${curPage - 1}</span>
                <span class="icon-emoji">➡</span>
          
          </button>
          <button class="btn--inline pagination__btn--next" data-goto="${
            curPage + 1
          }">
                <span class="icon-emoji">⬅</span>
          
            <span>Page ${curPage + 1}</span>
          </button>
    `;
    return ``;
  }

  addHandlerPagination(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest("button");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
}
export default new PaginationView();

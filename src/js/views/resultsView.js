import PreviewView from "./previewView";

class ResultsView extends PreviewView {
  _parentElement = document.querySelector(".results");
  _errorMessage = "Recipe not found";
  _message = "Start searching a meal by the first letter!";

  constructor() {
    super();
    this.renderErrorMessage(this._message);
  }
}

export default new ResultsView();

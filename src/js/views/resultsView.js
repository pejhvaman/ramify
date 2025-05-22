import PreviewView from "./previewView";

class ResultsView extends PreviewView {
  _parentElement = document.querySelector(".results");
  _errorMessage = "Recipe not found";
  _message = "Start by searching for a meal just by the first letter!";

  constructor() {
    super();
    this.renderErrorMessage(this._message);
  }
}

export default new ResultsView();

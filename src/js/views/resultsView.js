import PreviewView from "./previewView";

class ResultsView extends PreviewView {
  _parentElement = document.querySelector(".results");
  _errorMessage = "Recipe not found";
  _message = "Start by searching for a meal just by the first letter!";
}

export default new ResultsView();

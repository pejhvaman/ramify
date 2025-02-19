import PreviewView from "./previewView";

class BookmarksView extends PreviewView {
  _parentElement = document.querySelector(".bookmarks");
  _message = "Find a nice recipe and bookmark it.";
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it.";

  constructor() {
    super();
  }

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }
}

export default new BookmarksView();

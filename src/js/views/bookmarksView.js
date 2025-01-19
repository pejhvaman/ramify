import PreviewView from "./previewView";

class BookmarksView extends PreviewView {
  _parentElement = document.querySelector(".bookmarks");
  _message = "No bookmarks yet. Find a nice recipe and bookmark it :)";

  constructor() {
    super();
    this.renderMessage();
  }
}

export default new BookmarksView();

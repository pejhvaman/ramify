import PreviewView from "./previewView";

class BookmarksView extends PreviewView {
  _parentElement = document.querySelector(".bookmarks");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it :)";
}

export default new BookmarksView();

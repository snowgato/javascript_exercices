function Book(title, author, page_number, read) {
  this.title = title;
  this.page_number = page_number;
  this.author = author;
  this.read = read;
  this.info = () => {
    return `${this.title} by ${this.author}, ${
      this.read ? "" : "not"
    } already read ${this.read ? "" : "yet"} `;
  };
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};
function addBookToLibrary(book) {
  books_list.push(book);
}

function clearBook() {
  books_list.splice(this.dataset.nb, 1);
  displayBooks();
}

function ToggleRead() {
  books_list[this.dataset.nb].toggleRead();
  displayBooks();
}

function displayBooks() {
  let tbody = document.getElementById("tbodyBookListId");
  let tbodyParent = tbody.parentElement;
  tbodyParent.removeChild(tbody);

  tbody = document.createElement("tbody");
  tbody.id = "tbodyBookListId";
  tbodyParent.appendChild(tbody);

  table = document.getElementById("bookTableId");
  for (i in books_list) {
    book = books_list[i];
    let row = table.getElementsByTagName("tbody")[0].insertRow();

    let t_cell = row.insertCell(); //t_cell for title
    let a_cell = row.insertCell(); //a_cell for author
    let n_cell = row.insertCell(); //n_cell for number of pages
    let r_cell = row.insertCell(); //r_cell for read
    let bookToggleReadCell = row.insertCell(); //cell for toggle book read status button
    let bookRemovalCell = row.insertCell(); //cell for book removal button
    let btnBookRemoval = document.createElement("input");
    btnBookRemoval.type = "button";
    btnBookRemoval.value = "Remove Book";
    btnBookRemoval.dataset.nb = i;
    btnBookRemoval.addEventListener("click", clearBook);
    bookRemovalCell.appendChild(btnBookRemoval);
    btnBookToggleRead = document.createElement("input");
    btnBookToggleRead.type = "button";
    btnBookToggleRead.value = "Read/Not read";
    btnBookToggleRead.dataset.nb = i;
    btnBookToggleRead.addEventListener("click", ToggleRead);
    bookToggleReadCell.appendChild(btnBookToggleRead);
    t_cell.innerText = book.title;
    a_cell.innerText = book.author;
    n_cell.innerText = book.page_number;
    r_cell.innerText = book.read;
  }
}

books_list = [];
window.onload = (event) => {
  displayBooks();

  let button = document.querySelector("#addBookBtn");
  button.addEventListener("click", (event) => {
    event.preventDefault();
    title = document.getElementById("titleInputId").value;
    author = document.getElementById("authorInputId").value;
    pageNumber = document.getElementById("pageNumberInputId").value;
    read = document.getElementById("readInputId").checked;
    book = new Book(title, author, pageNumber, read);
    addBookToLibrary(book);
    displayBooks();
    document.getElementById("titleInputId").value = "";
    document.getElementById("authorInputId").value = "";
    document.getElementById("pageNumberInputId").value = "";
    document.getElementById("readInputId").checked = false;
  });
};

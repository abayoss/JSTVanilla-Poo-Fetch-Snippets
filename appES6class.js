class Book {
  constructor(title, author, isbn) {
    (this.title = title), (this.author = author), (this.isbn = isbn);
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class="delete">X</a> </td>`;
    list.appendChild(row);
    console.log(book);
  }
  showAlert(message, className) {
    //creat div :
    const div = document.createElement("div");
    //add Class :
    div.className = `alert ${className}`;
    //add text :
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector(".container");
    // get form
    const form = document.querySelector("#book-form");
    //insert div before form
    container.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  deleteBook(target) {
    target.parentElement.parentElement.remove();
  }
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}
// LS Class : 
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks(){
        const books = Store.getBooks();
        books.forEach((book)=>{
            const ui = new UI();
            ui.addBookToList(book);
        })
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books))
    }
    static removeBook(target){
        const books = Store.getBooks();
        const isbn = target.parentElement.previousElementSibling.textContent;
        books.forEach((book, index)=>{
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books)) 
    }

}
// event DOM load :
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// event Listnners for form
document.getElementById("book-form").addEventListener("submit", function(e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);

  // instanciate UI
  const ui = new UI();
  console.log(ui);
  // error handling :
  if (title === "" || author === "" || isbn === "") {
    //error alert
    ui.showAlert("please fill the fields", "error");
  }else {
  //add and clear Fields
  ui.addBookToList(book);
  //add book LS : 
  Store.addBook(book);
  //remove book LS : 
  ui.showAlert("Bokk add ! ", "success");
  ui.clearFields();
}
e.preventDefault();
});
// event lesnners for delete
document.getElementById("book-list").addEventListener("click", e => {
    if (e.target.className === "delete"){
        const ui = new UI();
        ui.deleteBook(e.target);
        Store.removeBook(e.target);
        ui.showAlert("book removed successfuly ! ", "success");
    }
    e.preventDefault();
});

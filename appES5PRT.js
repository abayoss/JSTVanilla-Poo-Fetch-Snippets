

// books : 
function Book(name, author, isbn){
    this.name = name, 
    this.author = author,
    this.isbn = isbn 
}
// UI Constructor
function UI(){}
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class="delete">X</a> </td>`;
    list.appendChild(row);
    console.log(book);
}
// Clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}
//error Alert 
UI.prototype.showAlert = (message, className)=> {
    //creat div : 
    const div = document.createElement('div');
    //add Class : 
    div.className = `alert ${className}`;
    //add text : 
    div.appendChild(document.createTextNode(message));
    // get parent 
    const container = document.querySelector('.container');
    // get form 
    const form = document.querySelector('#book-form');
    //insert div before form 
    container.insertBefore(div,form);

    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000);
}
//delete book 
UI.prototype.deleteBook = function deleteBook(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}
// event Listnners for form 
document.getElementById('book-form').addEventListener('submit', function(e){
    const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);

    // instanciate UI
    const ui = new UI();
    console.log(ui);
    // error handling : 
    if (title ==='' || author === '' || isbn === ''){
        //error alert 
        ui.showAlert('please fill the fields', 'error')
    }

    //add and clear Fields 
    ui.addBookToList(book);
    ui.showAlert('Bokk add ! ', 'success')
    ui.clearFields();
    e.preventDefault();
})
// event lesnners for delete 
document.getElementById('book-list').addEventListener('click',(e)=>{
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('book removed successfuly ! ','success')
    e.preventDefault();
});

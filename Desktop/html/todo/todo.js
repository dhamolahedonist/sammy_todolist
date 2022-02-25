const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = "";

form.addEventListener('submit',addItem);
// clear items
clearBtn.addEventListener('click',clearItems);



function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if( value && !editFlag){
        const element = document.createElement('article');
        // add class
        element.classList.add('grocery-item');
    // add id
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<div class="contain-item">
              <p class="title">${value}</p>
              <div class="btn-container">
                <button type="button" class="edit-btn">
                  <i class="fas fa-edit"></i>
                </button>
                <button type="button" class="delete-btn">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>`;
        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');
        deleteBtn.addEventListener('click',deleteItem);
        editBtn.addEventListener('click',editItem);
      
            //   append child
            list.appendChild(element);
            // display alert
            displayAlert('item added to the list', 'success');
            // show container
            container.classList.add('show-container');
            // add to local storage
            addToLocalStorage(id,value);
            setBackToDefault()
    } else if( value && editFlag){
        console.log('editing');

    }else {
       displayAlert('please enter value', 'danger');
    } 
}
// display alert
function displayAlert(text, action){
        alert.textContent = text;
        alert.classList.add(`alert-${action}`);
        // remove alert
        setTimeout(function(){
            alert.textContent = '';
             alert.classList.remove(`alert-${action}`);

        },1000);
}
function clearItems(id, value){
    const items = document.querySelectorAll('.grocery-item');

    if(items.length > 0) {
        items.forEach(function(item) {
            list.removeChild(item);
        })
    }
    container.classList.remove('show-container');
    displayAlert('empty list', 'danger');
    setBackToDefault();
}
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement.parentElement
    list.removeChild(element);
    if(list.children.length === 0) {
        container.classList.remove('show-container');
    }
    displayAlert('item deleted', 'danger');
    setBackToDefault();
   
}
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement.parentElement
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;

    grocery.value =editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = 'edit';
}
// set back to default
function setBackToDefault() {
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
}
// local storage
function addToLocalStorage(id,value) {
    console.log('added to local storage');

}
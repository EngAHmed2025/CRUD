var ProductNameInput = document.getElementById("ProductNameInput");
var ProductPriceInput = document.getElementById("ProductPriceInput");
var ProductCatagoryInput = document.getElementById("ProductCatagoryInput");
var ProductDescInput = document.getElementById("ProductDescInput");
var tableBody = document.getElementById("tableBody");
var SearchInput = document.getElementById("SearchInput");
var Addbtn = document.getElementById("Addbtn");
var Updatebtn = document.getElementById("Updatebtn");



var ProductCountainer=[]
if (localStorage.getItem('myProduct')!= null) {
    ProductCountainer = JSON.parse(localStorage.getItem('myProduct'));
    displayProducts(ProductCountainer);
}else{
    ProductCountainer = []
}


function addProduct(){
    var product = {
    Name:ProductNameInput.value,
    price:ProductPriceInput.value,
    catagory:ProductCatagoryInput.value,
    descprition:ProductDescInput.value
    }

    ProductCountainer.push(product)
    console.log(ProductCountainer);
    
    clearForm();
    displayProducts(ProductCountainer);
    localStorage.setItem('myProduct',JSON.stringify(ProductCountainer));
}


function clearForm() {
ProductNameInput.value = "";
ProductPriceInput.value = "";
ProductCatagoryInput.value = "";
ProductDescInput.value ="";
}


function displayProducts(ProductCountainer){
    var cartoona =``;
    for(var i= 0 ;i < ProductCountainer.length ; i++){
        cartoona +=`
        <tr>
        <td>${i}</td>
        <td>${ProductCountainer[i].Name}</td>
        <td>${ProductCountainer[i].price}</td>
        <td>${ProductCountainer[i].catagory}</td>
        <td>${ProductCountainer[i].descprition}</td>
        <td><button onclick="SetFromForUpdate(${i})" class="btn btn-warning">Update</button></td>
        <td><button onclick="DeleteProduct()" class="btn btn-danger">delete</button></td>
    </tr>
        `
    }

    tableBody.innerHTML = cartoona;
}

function searchProduct(searchTrem) {
    var searchResult = [];
for(var i=0; i<ProductCountainer.length;i++){
    if(ProductCountainer[i].Name.toLowerCase().includes(searchTrem.toLowerCase())){
        searchResult.push(ProductCountainer[i]);

    }
}    
displayProducts(searchResult)
}

function DeleteProduct(deleteIndex) {
ProductCountainer.splice(deleteIndex, 1);
displayProducts(ProductCountainer);
localStorage.setItem('myProduct',JSON.stringify(ProductCountainer));
}


var updatedIndex;
function SetFromForUpdate(UpdateIndex) {
    ProductNameInput.value = ProductCountainer[UpdateIndex].Name;
    ProductPriceInput.value = ProductCountainer[UpdateIndex].price;
    ProductCatagoryInput.value = ProductCountainer[UpdateIndex].catagory;
    ProductDescInput.value = ProductCountainer[UpdateIndex].descprition;
    Addbtn.classList.add('d-none');
    Updatebtn.classList.remove('d-none');
}


function ReUpdate() {
    var ReUpdate = {
        Name:ProductNameInput.value,
        price:ProductPriceInput.value,
        catagory:ProductCatagoryInput.value,
        descprition:ProductDescInput.value,
    }
    ProductCountainer.splice(updatedIndex,1,ReUpdate)
    displayProducts(ProductCountainer);
    clearForm();
    Addbtn.classList.remove('d-none');
    Updatebtn.classList.add('d-none');
    localStorage.setItem('myProduct',JSON.stringify(ProductCountainer));
}
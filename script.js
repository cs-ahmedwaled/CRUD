let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let category = document.getElementById("category")
let count = document.getElementById("count")
let total = document.getElementById("total")
let create = document.getElementById("create")
let tbody = document.getElementById("tbody")
let deleteAll = document.getElementById("deleteAll")
let mood = 'create';
let temp ;
//creat Product

let data 
  if( localStorage.product != null){
    data = JSON.parse(localStorage.product)
  }
  else{
    data = [];
  }

create.onclick = function(){

  let newPro = {
                title : title.value.toLowerCase() ,
                price : price.value ,
                taxes : taxes.value ,
                ads : ads.value ,
                discount : discount.value ,
                category : category.value.toLowerCase() ,
                count : count.value ,
                total : total.innerHTML,
  }

  if(title.value != '' && price.value != '' && category.value != '' && count.value <= 50 && count.value >= 0 ){

    if(mood === 'create'){
      if(count.value  > 1){
    
        for(let i=0; i<count.value; i++){
          data.push(newPro)
        }
      }else{
        data.push(newPro)
      }
    }else{
      data[temp] = newPro;
      mood = 'create';
      count.style.display = 'block'
      create.innerHTML = `create`
    }
    clearData()
  }




    localStorage.setItem('product',  JSON.stringify(data)  )

  // console.log(data);


  showData()

}


//get Total
function getTotal(){

  if(price.value != ''){
    let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;

    total.innerHTML = result
    total.style.backgroundColor = 'green'
  }
  else{
    total.innerHTML = ''
    total.style.backgroundColor = '#901717'
  }

}


//clear inputs
function clearData(){
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}


//show data

function showData(){

  let table = '';

  for(let i = 0; i < data.length; i++){

    table += `
    <tr>
      <td> ${i + 1} </td>
      <td> ${data[i].title} </td>
      <td> ${data[i].price} </td>
      <td> ${data[i].taxes} </td>
      <td> ${data[i].ads} </td>
      <td> ${data[i].discount} </td>
      <td> ${data[i].total} </td>
      <td> ${data[i].category} </td>
      <td><button onclick="updateData( ${i} )" id="update">update</button></td>
      <td><button onclick =" deleteOne( ${i} ) " id="delete">delete</button></td>
    </tr>
  `;
  }

  tbody.innerHTML = table;
  deleteAll.innerHTML = `delete all ( ${data.length} )`
  deleteAllData()
  getTotal()

}
showData()



//delete product

function deleteOne(i){

  data.splice( i, 1);
  localStorage.product = JSON.stringify(data)

  showData()
}


//delete All

function deleteAllData(){

  if(data.length > 0){
    deleteAll.style.display = "block"
  }else{
    deleteAll.style.display = "none"
  }

deleteAll.onclick = function(){

  data.splice(0);
  localStorage.product = JSON.stringify(data)
  showData()

}
}

//update Data
function updateData(i){

  title.value = data[i].title;
  price.value = data[i].price;
  taxes.value = data[i].taxes;
  ads.value = data[i].ads;
  discount.value = data[i].discount;
  category.value = data[i].category;

  count.style.display = 'none'
  create.innerHTML = `update...`

  mood = 'update...'

  temp = i;

  getTotal()

  scroll({
    top: 0,
    behavior: "smooth", 
  })

}






//search

let searchMood = 'title'

function getSearchMood(id){

  let search = document.getElementById('search')
  if(id == 'searchTitle'){
    searchMood = 'title';
    search.placeholder = 'search by title'
  }else{
    searchMood = 'categore';
    search.placeholder = 'search by category'
  }

  search.focus()
  search.value = ''
  showData();
}


function searchData(value ){
  
  let table = '';

  if(searchMood == 'title'){

    for(let i=0; i<data.length; i++){

      if(data[i].title.includes(value.toLowerCase())){
        
        table += `
        <tr>
          <td> ${i + 1} </td>
          <td> ${data[i].title} </td>
          <td> ${data[i].price} </td>
          <td> ${data[i].taxes} </td>
          <td> ${data[i].ads} </td>
          <td> ${data[i].discount} </td>
          <td> ${data[i].total} </td>
          <td> ${data[i].category} </td>
          <td><button onclick="updateData( ${i} )" id="update">update</button></td>
          <td><button onclick =" deleteOne( ${i} ) " id="delete">delete</button></td>
        </tr>
      `;
      }

    }

  }
  else{
    for(let i=0; i<data.length; i++){

      if(data[i].category.includes(value.toLowerCase())){
        
        table += `
        <tr>
          <td> ${i + 1} </td>
          <td> ${data[i].title} </td>
          <td> ${data[i].price} </td>
          <td> ${data[i].taxes} </td>
          <td> ${data[i].ads} </td>
          <td> ${data[i].discount} </td>
          <td> ${data[i].total} </td>
          <td> ${data[i].category} </td>
          <td><button onclick="updateData( ${i} )" id="update">update</button></td>
          <td><button onclick =" deleteOne( ${i} ) " id="delete">delete</button></td>
        </tr>
      `;
      }

    }
  }
  tbody.innerHTML = table;

}
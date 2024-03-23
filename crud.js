// Get elements by id.
let title = document.querySelector('#title');
let price = document.querySelector('#price');
let tax = document.querySelector('#tax');
let discount = document.querySelector('#discount');
let itemsNum = document.querySelector('#itemsNum');
let category = document.querySelector('#category');
let total = document.querySelector('#total');
let submit = document.querySelector('#submit');
let tbody = document.querySelector('#tbody');
let middle = document.querySelector('.middle');
let deleteAll = document.querySelector('#clearr');
let name = document.querySelector('#name');
let id = document.querySelector('#id');
let catego = document.querySelector('#catego');
let mood = 'create';
let temp = null;
let hel = null;



middle.style.display = 'block';    // Yaaaa Lahwey {carful for the order}
if (localStorage.length < 1){  // Yaaaa Lahwey {carful for the order}
  middle.style.display = 'none';  // Yaaaa Lahwey {carful for the order}
}; // This case special for the case of reloding the page.. to enable the
//JS from keeping the order after reloding.. so it completes the work of
// if statement in 114 - 118 line.


// Get Total.
// get Tax and discount percents.
// Get discount percent.
let dis = (disVal)=>{
  return (100 - disVal) / 100;
};  // Call it with dis(discount.value);

//Get Tax percent.
let taxp = (taxVal)=>{
  return (100 + taxVal) / 100;
};
 // Call it with taxp(tax.value);

function getTotal(){
  if(price.value !== 'string'){
    let x =  (+price.value * taxp(+tax.value)) * dis(+discount.value)
    * (+itemsNum.value) + '  LE' ;

  if (x % 1 !== 0){  // to ensure that the number is float
    total.innerHTML = parseFloat(x).toFixed(2);
     };

    total.style.cssText = `
    background: #002133;
    cursor: pointer;
    color: white;
    border-radius: 8px;
  `;
}else {
  total.innerHTML = '$$$';
}
};

//create array. 
let arr = [];

if(arr.length === 0 && localStorage.length > 0){
  arr = JSON.parse(localStorage.session); /* Means call the objects from the localStorage.
  so we use the parse() to get them in the right way.

  /* arr.push(JSON.parse(localStorage.session));  This one is the
  Demon itself.. As in this case it calls the all data from the
   localStorage including the container arry, then push it inside
   the new array .. so we have a new container arr, contains the old
   container array and the new items, and everytime U reload the page
   it will push the old container inside the new one and so on.
  */
  // console.log('Its occupied');
}else{
  let arr = [];
};
// when click create clear input data.
function clear(){
  title.value = null;
  price.value = null;
  tax.value = null;
  total.innerHTML = '$$';
  discount.value = null;
  itemsNum.value = null;
  category.value = null;
};


// lets save elements by clicking Create.
function subm(){
  let obj = {
    title: title.value,
    price: price.value,
    tax: tax.value,
    discount: discount.value,
    total: total.innerHTML,
    itemsNum: itemsNum.value,
    category: category.value,
  };

  //To deal with items number.*******
    let iteration = obj;
    console.log( obj.title === null);
// to handle and toggle between Create & Update.

//////
if(obj.title !== '' && obj.price > 0 && obj.itemsNum < 100 && obj.category
!== ''){
 

  if (mood === 'create'){

    if(iteration.itemsNum > 1){
      for (let i = 0; i < iteration.itemsNum; i++){
        arr.push(obj);  // step of create the item obj as an index inside the arr.
      // of the localStorage.
      console.log(localStorage)
        localStorage.session = JSON.stringify(arr);
      //reassign or update the content
    };
  // if iteration kerli.

 // if create mood kerli.

    }else{
      arr.push(obj);
      localStorage.session = JSON.stringify(arr);
      clear();  // Do not clear unless U create a new pro .. else leave
      // the data inside the cells.

    };

    }else{
      arr[temp] = obj;  // index of Update.
      localStorage.session = JSON.stringify(arr);
      getTotal();
      window.location.reload(true);
    };

};
///
      let lengt = JSON.parse(localStorage.session);

    if ( (lengt).length > 1 ){
       middle.style.display = 'block';
    }else{
        middle.style.display = 'none';
      };

   /* {-- JUST know that if U wanna to access the objects inside ur array
   inside ur localstorage, u'll have firstly save the (**step) in variable
   before U could use it to access the indexes[objects] or indexes properties
   inside it.. As U can't access it directly using the JSON... way.
   *******************************************
   let x = JSON.parse(localStorage.session); // (**step)
     console.log(x[0].title);
     console.log( (x).length); // ==> to get the accurate length of array's
     Object.
     ******************************************
--}
  */
    showData();
  };

//Lets create a function that show the data in the table after clicking
// create.

function showData(){
  let newRow = '';

  /* (The '' addingData variable which plays the
   container role).. If we don't make and added it to the inner tbody element,
  we will be faced by the iteration of the previous data everytime we
  click create, meaning that when we click create to add a new product, it
  will create also a new rows for the previous data and add it again
  before the new row, then delete them and arrang it after we click reload,
  and i do not have any explaination yet. */
  for (let i = 0; i < arr.length; i++){
        hel = i;
       newRow += `
    <tr>
      <td>${i+1}</td>
      <td>${arr[i].title}</td>
      <td>${arr[i].price} </td>
      <td>${arr[i].tax +'%'}</td>
      <td>${arr[i].discount + '%'}</td>
      <td>${arr[i].total}</td>
      <td>${arr[i].itemsNum}</td>
      <td>${arr[i].category}</td>
      <td> <button onclick =  "update(${i})"   class="but" id="update" type="button">UPDATE</button> </td>
      <td> <button onclick = "deleteItem(${i})"  class="but"  id="delete" type="button"> DELETE </button> </td>
        </tr> ` ;
  };
      tbody.innerHTML = newRow;  // Be careFul for the position... that means
  // add the container inside the body after updating it.
};

showData();
// lets create the function of delete Item.******************
function deleteItem(index){
  // console.log(arr[index]) /// حلوة دى
  arr.splice(index,1);
  localStorage.session = JSON.stringify(arr);
  showData();
};

//Create a Delete All Function. *********************

deleteAll.addEventListener('click', function () {
  localStorage.clear();
  location.reload();
});

// Lets make function that show data when Update clicked.

function update(upIndex) {
  submit.innerHTML = 'Update';
  let x =
  // x +=
  title.value = arr[upIndex].title;
   price.value = arr[upIndex].price;
   tax.value = arr[upIndex].tax;
   discount.value = arr[upIndex].discount;
   total.innerHTML = arr[upIndex].total;
   itemsNum.value =arr[upIndex].itemsNum;
   // itemsNum.style.display = 'none';
   category.value = arr[upIndex].category;
   mood = 'update';
   temp = upIndex;
   window.scroll({
     top: 0,
     behavior: 'smooth',
   })
 };

// 1) Create a puplic arr to get assigned by the chochen values
// 2) make the event and loop and the check condition and the assign step
// and the final show in the last step
// //
let newCont = [];
 let index = JSON.parse(localStorage.session); // the arr inside localStorage.
// tht we want to pull the data from..
// console.log(index[1].title.toLocaleLowerCase());


 function sea (pram) {
   document.body.onkeydown = function(e){
     if (e.keyCode === 13){
      let btn = document.getElementById(pram);
       for (let i = 0; i < arr.length; i++) {
         let newIn = index[i];
         if (JSON.stringify(newIn).toLocaleLowerCase().includes(btn.value.toLocaleLowerCase())=== true ||
         JSON.stringify(newIn).toLocaleLowerCase().includes(btn.value.toLocaleLowerCase()) === true
       ) {
            newCont.push(index[i]);
            sessionStorage.newSession = JSON.stringify(newCont);
      };

      };

      let newRow = '';
      if(sessionStorage.length > 0){
        for (let i = 0; i < newCont.length; i++){
           newRow += `
           <tr>
            <td>${i+1}</td>
            <td>${newCont[i].title}</td>
            <td>${newCont[i].price} </td>
            <td>${newCont[i].tax +'%'}</td>
            <td>${newCont[i].discount + '%'}</td>
            <td>${newCont[i].total}</td>
            <td>${newCont[i].itemsNum}</td>
            <td>${newCont[i].category}</td>
            <td> <button onclick =  "update(${i})"   class="but" id="update" type="button">UPDATE</button> </td>
            <td> <button onclick = "deleteItem(${i})"  class="but"  id="delete" type="button"> DELETE </button> </td>
              </tr> ` ;
              tbody.innerHTML = newRow;  // Be careFul for the position... that means
      };
      // add the container inside the body after updating it.
    };
  };
 };
};
document.body.ondblclick = () => {
  location.reload(true);
};
// show the data in the tb rows depending on the data inside the
// sessionStorage arr.

/*          if (newCont.length < 1) {
        console.log('There is no items contain such name or letters.')
        }else {

          console.log(JSON.parse(sessionStorage.newSession));
      };

 */




// let z = ( pram  ) => {
//   let x = document.getElementById(pram);
//   console.log(x);
//   console.log(x.value);
// };



// sessionStorage.clear();




//
//
// let index = JSON.parse(localStorage.session);
// let x = JSON.stringify(index[1])
// console.log(x.includes('s'));










  // for key enter
            //   console.log('hello');
              // }else {
              //   console.log('NOoO');
              //
              // };
              //




//*************************************************
//Search Data
// localStorage.second = JSON.stringify(0);

  //   if (currentArray[i].getLower(title).includes(name.value) === true){
  //     let searchName = ()=>{
  //       let newArr = [];
  //         newArr.push(currentArray[i]);
  //         localStorage.second = JSON.stringify(newArr);
  //
  // console.log(indexT.toLocaleLowerCase().includes(name.value) );
  // console.log(indexC.toLocaleLowerCase().includes(catego.value) );


// function x (get) {
//   let name = document.getElementById(get);
//   console.log(name);
// };






















showData();

// localStorage.how = JSON.stringify('hey');


// localStorage.clear();


// What? How? Analyse & Trace The origins if exist ..
/*
--what -- Iterate the row depending on the number written in the itemsNum.
-- How -- 1) {The row is added by showData(), showData() itself is exexuted
by create() func, showData() is depending on the arr length that is existed
in the create() fun..}.
2) {so if i wanna show an item more than one time using showData(), i should
firstly call it from the localStorage.. cuz showData() does nothing but showData
from the local storage.. so if i want it to iterate the number that is
written inside the itemsNum, i should iterate it firstly in the Localstorage..}
3){so what is the code that is responsable for creating new data in the localStorage?
.. get it and iterate it depending on the number written inside itemsNum..
Here we have a correct Data in the localStorage, if i call showData, it will
call the data from the local.}


*/

'use strict';
var body = document.getElementsByTagName('body')[0];
var addStoreOption = document.getElementById('storeAdd');
var form = document.getElementsByTagName('form');
var storeHour = ['Store Location', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', 'Totals'];
var allStores = [];
var hourTotalArray = [];
var storeTotals = [];

function Store(name, minCust, maxCust, avgSales){
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSales = avgSales;
  this.salesPerHour = [];
  allStores.push(this);

  this.getCookiesHourly = function(){
    for (var i = 0; i < (storeHour.length - 2); i++){
      var custPerHour = Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust);
      var cookPerHour = Math.floor(custPerHour * this.avgSales);
      this.salesPerHour.push(cookPerHour);
    }
  };
  this.totalPerDay = function(){
    this.getCookiesHourly();
    var total = 0;
    for (var x = 0; x < this.salesPerHour.length; x++){
      total += this.salesPerHour[x];
    }
    // console.log(total);
    storeTotals.push(total);
  };
  this.hourlyTotals = function (){
    for (var q = 0; q < this.salesPerHour.length; q++){
      for (var b = 0; b < allStores.length; b++){
        // console.log(this.salesPerHour);
        hourTotalArray.push(this.salesPerHour[q]);
      }
    };
  };
}
var pike = new Store('First and Pike', 23, 65, 6.3);
var seaTac = new Store('SeaTac', 3, 24, 1.2);
var center = new Store('Seattle Center', 11, 38, 3.7);
var capHill = new Store('Capital Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);

var breakTag = function (parent){
  var brTag = document.createElement('br');
  parent.appendChild(brTag);
};
var appendString = function (string, parent) {
  var newString = document.createElement('p');
  newString.innerText = string;
  parent.appendChild(newString);
};
var createAndAppend = function (toCreate, addClass, addID, addType, addName, addInner, addParent){
  var theElement = document.createElement(toCreate);
  if (addClass && addClass !== ''){
    var classString = '';
    for (var i = 0; i < addClass.length; i++){
      if (typeof addClass === 'string'){
        classString += addClass[i];
      }else {
        classString += addClass[i] + ' ';
      };
    };
    theElement.className = classString;
  }
  if (addInner && addInner !== ''){
    theElement.innerText = addInner;
  }
  if (addID && addID !== ''){
    theElement.setAttribute('id', addID);
  }
  if (addType && addType !== ''){
    theElement.setAttribute('type', addType.toString());
  }
  if (addName && addName !== ''){
    theElement.setAttribute('name', addName);
  }
  addParent.appendChild(theElement);
  return theElement;
};
var createTableandHead = function (){
  var table = createAndAppend('table', ['tableBorder', 'topRow'], 'table', '', '', '', body);
  for(var j = 0; j < storeHour.length; j++){
    var newTHead = createAndAppend('th', ['tableBorder', 'topRow'], '', '', '', storeHour[j], table);
  }
};
var fillTable = function (){
  var table = document.getElementById('table');
  for (var i = 0; i < allStores.length; i++){
    var row = createAndAppend('tr', ['tableBorder','tableElement'], '', '', '', allStores[i].name, table);
    allStores[i].totalPerDay();
    for (var j = 0; j < allStores[i].salesPerHour.length + 1; j++){
      if (j < allStores[i].salesPerHour.length){
        var td = createAndAppend('td', 'tableBorder', '', '', '', allStores[i].salesPerHour[j], row);
      } else {
        var totalForStore = createAndAppend('td', ['tableBorder','storeTotal'], '', '', '', storeTotals[i], row);
      }
    }
    // allStores[i].salesPerHour = [];
  };
};
var tableFooter = function(){
  var dummyRow = createAndAppend('tr', ['tableBorder', 'hTotal'], 'lastRow','','','Hourly Totals', table);
  var grandTotal = 0;
  for (var n = 0; n < (storeHour.length - 2); n++){
    var totalPerHour = 0;
    for (var w = 0; w < allStores.length; w++){
      allStores[w].hourlyTotals();
      // console.log('the hourTotalArray:', hourTotalArray);
      totalPerHour += allStores[w].salesPerHour[n];
      console.log('the totalPerHour:', totalPerHour);
    }
    var storesHourly = createAndAppend('td', ['tableBorder', 'hTotal'], '', '', '', totalPerHour, dummyRow);
    grandTotal += totalPerHour;
  }
  var totalsTotal = createAndAppend('td', ['tableBorder', 'totalsTotal'], '', '', '', grandTotal, dummyRow);
};
var addStoreButton = function (event){
  event.preventDefault();
  var newString = appendString('Store Name', newForm);
  var brTag = breakTag (newForm);
  var storeNameInput = createAndAppend('input', 'input', 'storeName', 'text', 'nameInput', '', newForm);
  var brTag = breakTag (newForm);
  var newString = appendString('Minimum Customers Per Hour', newForm);
  var brTag = breakTag (newForm);
  var custMinInput = createAndAppend ('input', 'input', 'custMin', 'number', 'minInput', '', newForm);
  var brTag = breakTag (newForm);
  var newString = appendString('Maximum Customers Per Hour', newForm);
  var brTag = breakTag (newForm);
  var custMaxInput = createAndAppend('input', 'input', 'custMax', 'number', 'maxInput', '', newForm);
  var brTag = breakTag (newForm);
  var newString = appendString('Avg Cookes Per Hour', newForm);
  var brTag = breakTag (newForm);
  var avgCookInput = createAndAppend('input', 'input', 'avgCook', 'number', 'cookInput', '', newForm);
  avgCookInput.setAttribute('step', '0.1');
  var brTag = breakTag (newForm);
  var submitButton = createAndAppend('button', '', 'addStoreSubmit', '', 'confirmButton', 'Confirm Add Store', newForm);

};
var confirmStore = function (event){
  var storeNameChange = event.target.nameInput.value;
  console.log(storeNameChange);
  var custMinChange = parseInt(event.target.minInput.value);
  console.log(custMinChange);
  var custMaxChange = parseInt(event.target.maxInput.value);
  console.log(custMaxChange);
  var avgCookChange = parseFloat(event.target.cookInput.value);
  console.log(avgCookChange);
  var newStore = new Store(storeNameChange, custMinChange, custMaxChange, avgCookChange);
  allStores.push(newStore);
  //delete hourly totals

  // newStore.getCookiesHourly();
  newStore.totalPerDay();
  var table = document.getElementById('table');
  var subTotalsRow = document.getElementById('lastRow');
  table.removeChild(subTotalsRow);
  var row = createAndAppend('tr', ['tableBorder','tableElement'], '', '', '', newStore.name, table);
  for (var j = 0; j < newStore.salesPerHour.length + 1; j++){
    if (j < newStore.salesPerHour.length){
      var td = createAndAppend('td', 'tableBorder', '', '', '', newStore.salesPerHour[j], row);
    } else {
      var totalForStore = createAndAppend('td', ['tableBorder','storeTotal'], '', '', '', storeTotals[(storeTotals.length - 1)], row);
    }
  }
  tableFooter();
  newForm.reset();
  //rerun hourly totals
  // var hideTable = document.getElementById(tableCounterArray[tableCounter]);
  // hideTable.style.display = 'none';
};
var stopSubmission = function (event){
  event.preventDefault();
};
var form = document.getElementById('form');
form.addEventListener('submit', stopSubmission);
form.addEventListener('submit', addStoreButton);

var newForm = document.getElementById('newForm');
newForm.addEventListener('submit', stopSubmission);
newForm.addEventListener('submit', confirmStore);
// storeOne.createTable();
createTableandHead();
fillTable();
tableFooter();

'use strict';


var body = document.getElementsByTagName('body')[0];
var addStoreOption = document.getElementById('storeAdd');
var form = document.getElementsByTagName('form');
var storeHour = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var allStores = [];
var hourlyTotals = [];
var storeTotals = [];

function Store(name, minCust, maxCust, avgSales){
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSales = avgSales;
  this.salesPerHour = [];
  allStores.push(this);

  // this.calcTotalPerHour = function(){
  //   for (var n = 0; n < allStores.length; n++) {
  //     for (var k = 0; k < storeHour.length; k++){
  //
  //     }
  //   }
  // };

  this.getCookiesHourly = function(){
    for (var i = 0; i < storeHour.length; i++){
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
    storeTotals.push(total);
  };
  this.hourlyTotals = function (){
    for (var q = 0; q < this.salesPerHour.length; q++){
      for (var k = 0; k < allStores.length; k++){
        var hourTotal = hourTotal + this.allStores[k].salesPerHour[q];
      }
      var hourTotalArray = hourTotalArray.push(hourTotal);
    }
    return hourTotalArray;
  };
}
new Store('First and Pike', 23, 65, 6.3);
new Store('SeaTac', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capital Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);

function breakTag (parent){
  var brTag = document.createElement('br');
  parent.appendChild(brTag);
}
function appendString(string, parent) {
  var newString = document.createElement('p');
  newString.innerText = string;
  parent.appendChild(newString);
}
function createAndAppend (toCreate, addClass, addID, addType, addName, addInner, addParent){
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
}

var table = createAndAppend('table', ['tableBorder', 'topRow'], '', '', '', '', body);
for(var j = -1; j < 15; j++){
  if(j === -1) {
    var time = 'Store Location';
  } else if(j < 6){
    var time = (j + 6) + 'am';
  }else if(j === 6) {
    var time = '12pm';
  }else if(j === 14){
    var time = 'Totals';
  }else {
    var time = (j - 6) + 'pm';
  }
  var newTHead = createAndAppend('th', ['tableBorder', 'topRow'], '', '', '', time, table);
}

for (var i = 0; i < allStores.length; i++){
  var row = createAndAppend('tr', ['tableBorder','tableElement'], '', '', '', allStores[i].name, table);
  allStores[i].totalPerDay();
  console.log(storeTotals);
  for (var j = 0; j < allStores[i].salesPerHour.length + 1; j++){
    if (j < allStores[i].salesPerHour.length){
      var td = createAndAppend('td', 'tableBorder', '', '', '', allStores[i].salesPerHour[j], row);
    } else {
      var totalForStore = createAndAppend('td', ['tableBorder','storeTotal'], '', '', '', storeTotals[i], row);
    }
  }
  allStores[i].salesPerHour = [];
};

for (var x = 0; x < (totals.length + 1); x++){
  if (x === 0){
    var foot = createAndAppend('tf', ['tableBorder', 'hTotal'], '','','','Hourly Totals', table);
  } else{
    var storesHourly = createAndAppend('td', ['tableBorder', 'hTotal'], '', '', '', hourTotalArray, foot);
  }
}
// function Store(name, custMin, custMax, avgCook){
//   this.name = name;
//   this.custMin = custMin;
//   this.custMax = custMax;
//   this.avgCook = avgCook;
//   this.createTable = function() {
//     tableCounter += 1;
//     tableCounterArray.push(tableCounter);
//     var newTable = createAndAppend('table', ['tableBorder', 'tableElement'],'theTable','','','',body);
//
//     }
//     var totalsTotal = 0;
//     for(var i = 0; i <= allStores.length; i++){
//       if (i === allStores.length){
//         var tableRow = createAndAppend('tr', 'tableBorder', '', '', '','Hourly Total', newTable);
//       }
//       else{
//         var tableRow = createAndAppend('tr', ['tableBorder', 'storeNames'], '', '', '', allStores[i].name, newTable);
//
//         if (i === (allStores.length - 1)){
//           tableRow.setAttribute('id', 'lastRow');
//         }
//       }
//       tableRows += 1;
//       for(var t = 0; t < 15; t++){
//         if (t < 14 && i !== allStores.length) {
//           var cookPerHour = getCookiesHourly(allStores[i].custMin, allStores[i].custMax, allStores[i].avgCook);
//           var newTd = createAndAppend('td', 'tableBorder', '', '', '', cookPerHour, tableRow);
//           cookPerArray.push(cookPerHour);
//         } else if (i === allStores.length && t !== 14){
//           for (var x = 0; x < allStores.length; x++){
//             hourTotal = hourTotal + hourTotalArray[x][t];
//             if (x === (allStores.length - 1)){
//               var hTotal = createAndAppend('td', ['tableBorder', 'hTotal'], '', '', '', hourTotal, tableRow);
//               hourTotal = 0;
//             }
//           }
//         }else if (i !== allStores.length){
//           var cookTotal = 0;
//           for (var l = 0; l < cookPerArray.length; l++){
//             var cookTotal = cookTotal + cookPerArray[l];
//           }
//           hourTotalArray.push(hoursNestedArray);
//           var newTd = createAndAppend('td', ['tableBorder', 'totalsStore'], '', '', '', cookTotal, tableRow);
//           var totalsTotal = totalsTotal + cookTotal;
//           cookPerArray = [];
//         } else if (i === allStores.length && t === 14){
//           var newTd = createAndAppend('td', ['tableBorder', 'totalsTotal'], '', '', '', totalsTotal, tableRow);
//         }
//       }
//     }
//   };
// }
function addStoreButton(event){
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
  var brTag = breakTag (newForm);
  var submitButton = createAndAppend('button', '', 'addStoreSubmit', '', 'confirmButton', 'Confirm Add Store', newForm);

};
function confirmStore (event){
  var storeNameChange = event.target.nameInput.value;
  console.log(storeNameChange);
  var custMinChange = event.target.minInput.value;
  console.log(custMinChange);
  var custMaxChange = event.target.maxInput.value;
  console.log(custMaxChange);
  var avgCookChange = event.target.cookInput.value;
  console.log(avgCookChange);
  var newStore = new Store(storeNameChange, custMinChange, custMaxChange, avgCookChange);
  allStores.push(newStore);
  // var hideTable = document.getElementById(tableCounterArray[tableCounter]);
  // hideTable.style.display = 'none';
  addRow(storeNameChange, custMinChange, custMaxChange, avgCookChange);
}
function stopSubmission (event){
  event.preventDefault();
}
var form = document.getElementById('form');
form.addEventListener('submit', stopSubmission);
form.addEventListener('submit', addStoreButton);

var newForm = document.getElementById('newForm');
newForm.addEventListener('submit', stopSubmission);
newForm.addEventListener('submit', confirmStore);
// storeOne.createTable();

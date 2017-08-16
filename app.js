'use strict';
var storeOne = new Store('First and Pike', 23, 65, 6.3);
var storeTwo = new Store('SeaTac', 3, 24, 1.2);
var storeThree = new Store('Seattle Center', 11, 38, 3.7);
var storeFour = new Store('Capital Hill', 20, 38, 2.3);
var storeFive = new Store('Alki', 2, 16, 4.6);
var cookPerArray = [];
var body = document.getElementsByTagName('body')[0];
var allStores = [storeOne, storeTwo, storeThree, storeFour, storeFive];
var addStoreOption = document.getElementById('storeAdd');
var hourTotalArray = [];
var hourTotal = 0;
var form = document.getElementsByTagName('form');

function breakTag (parent){
  var brTag = document.createElement('br');
  parent.appendChild(brTag);
}
function appendString(string, parent) {
  var newString = document.createElement('p');
  newString.innerText = string;
  parent.appendChild(newString);
}
function createAndAppend (toCreate, addClass, addID, addType, addInner, addParent){
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
    theElement.ID = addID;
  }
  if (addType && addType !== ''){
    theElement.setAttribute('type', addType.toString());
  }
  addParent.appendChild(theElement);
  return theElement;
}

function Store(name, custMin, custMax, avgCook){
  this.name = name;
  this.custMin = custMin;
  this.custMax = custMax;
  this.avgCook = avgCook;
  this.createTable = function() {
    var newTable = createAndAppend('table', ['tableBorder', 'tableElement'],'','','',body);
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
      var newTHead = createAndAppend('th', ['tableBorder', 'topRow'], '', '', time, newTable);
    }
    var totalsTotal = 0;
    for(var i = 0; i <= allStores.length; i++){
      if (i === allStores.length){
        var tableRow = createAndAppend('tr', 'tableBorder', '', '', 'Hourly Total', newTable);
      }
      else{
        var tableRow = createAndAppend('tr', ['tableBorder', 'storeNames'], '', '', allStores[i].name, newTable);
        var hoursNestedArray = [];
      }
      for(var t = 0; t < 15; t++){
        if (t < 14 && i !== allStores.length) {
          var custPerHour = Math.floor(Math.random() * (allStores[i].custMax - allStores[i].custMin + 1)) + allStores[i].custMin;
          var cookPerHour = Math.floor(allStores[i].avgCook * custPerHour);
          hoursNestedArray.push(cookPerHour);
          var newTd = createAndAppend('td', 'tableBorder', '', '', cookPerHour, tableRow);
          cookPerArray.push(cookPerHour);
        } else if (i === allStores.length && t !== 14){
          for (var x = 0; x < allStores.length; x++){
            hourTotal = hourTotal + hourTotalArray[x][t];
            if (x === (allStores.length - 1)){
              var hTotal = createAndAppend('td', ['tableBorder', 'hTotal'], '', '', hourTotal, tableRow);
              hourTotal = 0;
            }
          }
        }else if (i !== allStores.length){
          var cookTotal = 0;
          for (var l = 0; l < cookPerArray.length; l++){
            var cookTotal = cookTotal + cookPerArray[l];
          }
          hourTotalArray.push(hoursNestedArray);
          var newTd = createAndAppend('td', ['tableBorder', 'totalsStore'], '', '', cookTotal, tableRow);
          var totalsTotal = totalsTotal + cookTotal;
          cookPerArray = [];
        } else if (i === allStores.length && t === 14){
          var newTd = createAndAppend('td', ['tableBorder', 'totalsTotal'], '', '', totalsTotal, tableRow);
        }
      }
    }
  };
}
//Button Experiment!! Unfinished!//

function addStoreButton(event){
  var newString = appendString('Store Name', form);
  var brTag = breakTag (form);
  var storeNameInput = createAndAppend('input', 'input', 'storeName', 'text', '', form);
  var brTag = breakTag (form);
  var newString = appendString('Minimum Customers Per Hour', form);
  var brTag = breakTag (form);
  var custMinInput = createAndAppend ('input', 'input', 'custMin', 'number', '', form);
  var brTag = breakTag (form);
  var newString = appendString('Maximum Customers Per Hour', form);
  var brTag = breakTag (form);
  var custMaxInput = createAndAppend('input', 'input', 'custMax', 'number', '', form);
  var brTag = breakTag (form);
  var newString = appendString('Avg Cookes Per Hour', form);
  var brTag = breakTag (form);
  var avgCookInput = createAndAppend('input', 'input', 'avgCook', 'number', '', form);
  var brTag = breakTag (form);
  var submitButton = createAndAppend('button', '', 'addStoreSubmit', '', 'Confirm Add Store', form);
  // submitButton.onclick = function storeAddFunction(){
  //   var storeNameChange = document.getElementById('storeName').value;
  //   console.log(document.getElementById('storeName').value);
  //   var custMinChange = document.getElementById('custMin').value;
  //   console.log(document.getElementById('custMin').value);
  //   var custMaxChange = document.getElementById('custMax').value;
  //   console.log(document.getElementById('custMax').value);
  //   var avgCookChange = document.getElementById('avgCook').value;
  //   console.log(document.getElementById('avgCook').value);
  //   var newStore = new Store(storeNameChange, custMinChange, custMaxChange, avgCookChange);
  //   allStores.push(newStore);
  // };
  preventDefault();
};
function stopSubmission (event){
  event.preventDefault();
}
var form = document.getElementById('form');
form.addEventListener('submit', stopSubmission);
form.addEventListener('submit', addStoreButton);

storeOne.createTable();

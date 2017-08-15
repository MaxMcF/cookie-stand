'use strict';
function Store(name, custMin, custMax, avgCook){
  this.name = name;
  this.custMin = custMin;
  this.custMax = custMax;
  this.avgCook = avgCook;
  this.createTable = function() {
    var newTable = document.createElement('table');
    newTable.setAttribute('class', 'tableElement');
    newTable.setAttribute('class', 'tableBorder');
    body.appendChild(newTable);
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
      var newTHead = document.createElement('th');
      newTHead.innerText = time;
      newTHead.setAttribute('class', 'tableBorder');
      newTHead.setAttribute('class', 'topRow');
      newTable.appendChild(newTHead);
    }
    var totalsTotal = 0;
    for(var i = 0; i <= allStores.length; i++){
      var tableRow = document.createElement('tr');
      if (i === allStores.length){
        tableRow.innerText = 'Hourly Total';
        tableRow.setAttribute('class', 'tableBorder');
        newTable.appendChild(tableRow);
      }
      else{
        tableRow.innerText = allStores[i].name;
        tableRow.setAttribute('class', 'tableBorder');
        newTable.appendChild(tableRow);
        var hoursNestedArray = [];
      }
      for(var t = 0; t < 15; t++){
        if (t < 14 && i !== allStores.length) {
          var custPerHour = Math.floor(Math.random() * (allStores[i].custMax - allStores[i].custMin + 1)) + allStores[i].custMin;
          var cookPerHour = Math.floor(allStores[i].avgCook * custPerHour);
          hoursNestedArray.push(cookPerHour);
          var newTd = document.createElement('td');
          newTd.innerText = cookPerHour;
          newTd.setAttribute('class', 'tableBorder');
          cookPerArray.push(cookPerHour);
          tableRow.appendChild(newTd);
        } else if (i === allStores.length && t !== 14){
          for (var x = 0; x < allStores.length; x++){
            hourTotal = hourTotal + hourTotalArray[x][t];
            if (x === (allStores.length - 1)){
              var hTotal = document.createElement('td');
              hTotal.innerText = hourTotal;
              hTotal.setAttribute('class', 'tableBorder');
              hTotal.setAttribute('class', 'hTotal');
              tableRow.appendChild(hTotal);
              hourTotal = 0;
            }
          }
        }else if (i !== allStores.length){
          var newTd = document.createElement('td');
          var cookTotal = 0;
          for (var l = 0; l < cookPerArray.length; l++){
            var cookTotal = cookTotal + cookPerArray[l];
          }
          hourTotalArray.push(hoursNestedArray);
          newTd.innerText = cookTotal;
          newTd.setAttribute('class', 'tableBorder');
          newTd.setAttribute('class', 'totalsStore');
          tableRow.appendChild(newTd);
          var totalsTotal = totalsTotal + cookTotal;
          cookPerArray = [];
        } else if (i === allStores.length && t === 14){
          var newTd = document.createElement('td');
          newTd.innerText = totalsTotal;
          newTd.setAttribute('class', 'tableBorder');
          newTd.setAttribute('class', 'totalsTotal');
          tableRow.appendChild(newTd);
        }
      }
    }
  };
}

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

//Button Experiment!! Unfinished!//

// addStoreOption.onclick = function addStoreButton(){
//   var form = document.getElementsByTagName('form');
//   var newString = document.createString('Store Name');
//   form.appendChild(newString);
//   var brTag = document.createElement('br');
//   form.appendChild(brTag);
//   storeNameInput = document.createElement('input');
//   storeNameInput.setAttribute('type', 'text');
//   storeNameInput.setAttribute('class', 'input');
//   storeNameInput.setAttribute('id', 'storeName');
//   form.appendChild(storeNameInput);
//   var brTag = document.createElement('br');
//   form.appendChild(brTag);
//   var newString = document.createString('Minimum Customers Per Hour');
//   form.appendChild(newString);
//   var brTag = document.createElement('br');
//   form.appendChild(brTag);
//   custMinInput = document.createElement('input');
//   custMinInput.setAttribute('type', 'number');
//   custMinInput.setAttribute('class', 'input');
//   custMinInput.setAttribute('id', 'custMin');
//   form.appendChild(custMinInput);
//   var brTag = document.createElement('br');
//   form.appendChild(brTag);
//   var newString = document.createString('Maximum Customers Per Hour');
//   form.appendChild(newString);
//   var brTag = document.createElement('br');
//   form.appendChild(brTag);
//   custMaxInput = document.createElement('input');
//   custMaxInput.setAttribute('type', 'number');
//   custMaxInput.setAttribute('class', 'input');
//   custMaxInput.setAttribute('id', 'custMax');
//   form.appendChild(custMaxInput);
//   var brTag = document.createElement('br');
//   form.appendChild(brTag);
//   var newString = document.createString('Avg Cookies Per Hour');
//   form.appendChild(newString);
//   var brTag = document.createElement('br');
//   form.appendChild(brTag);
//   avgCookInput = document.createElement('input');
//   avgCookInput.setAttribute('type', 'number');
//   avgCookInput.setAttribute('class', 'input');
//   avgCookInput.setAttribute('id', 'avgCook');
//   form.appendChild(avgCookInput);
//   var brTag = document.createElement('br');
//   submitButton = document.createElement('button');
//   submitButton.innerText = 'Confirm Add Store';
//   submitButton.setAttribute('id', 'addStoreSubmit');
//   form.appendChild(submitButton);
//   var storeSubmitButton = document.getElementById('addStoreSubmit');
//   storeSubmitButton.onclick = function storeAddFunction(){
//     var storeNameChange = document.getElementById('storeName').value;
//     console.log(document.getElementById('storeName').value);
//     var custMinChange = document.getElementById('custMin').value;
//     console.log(document.getElementById('custMin').value);
//     var custMaxChange = document.getElementById('custMax').value;
//     console.log(document.getElementById('custMax').value);
//     var avgCookChange = document.getElementById('avgCook').value;
//     console.log(document.getElementById('avgCook').value);
//     var newStore = new Store(storeNameChange, custMinChange, custMaxChange, avgCookChange);
//     allStores.push(newStore);
//   };
//   preventDefault();
// };
storeOne.createTable();

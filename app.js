'use strict';

var storeOne = {
  name: 'First and Pike',
  custMin: 23,
  custMax: 65,
  avgCook: 6.3
};
var storeTwo = {
  name: 'SeaTac',
  custMin: 3,
  custMax: 24,
  avgCook: 1.2
};
var storeThree = {
  name: 'Seattle Center',
  custMin: 11,
  custMax: 38,
  avgCook: 3.7
};
var storeFour = {
  name: 'Capital Hill',
  custMin: 20,
  custMax: 38,
  avgCook: 2.3
};
var storeFive = {
  name: 'Alki',
  custMin: 2,
  custMax: 16,
  avgCook: 4.6
};
var cookPerArray = [];
var body = document.getElementsByTagName('body')[0];
var allStores = [storeOne, storeTwo, storeThree, storeFour, storeFive];
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
  newTable.appendChild(newTHead);
}
var totalsTotal = 0;
for(var i = 0; i < allStores.length; i++){
  var tableRow = document.createElement('tr');
  tableRow.innerText = allStores[i].name;
  tableRow.setAttribute('class', 'tableBorder');
  newTable.appendChild(tableRow);
  for(var t = 0; t < 15; t++){
    if (t < 14) {
      var custPerHour = Math.floor(Math.random() * (allStores[i].custMax - allStores[i].custMin + 1)) + allStores[i].custMin;
      var cookPerHour = Math.floor(allStores[i].avgCook * custPerHour);
      var newTd = document.createElement('td');
      newTd.innerText = cookPerHour;
      newTd.setAttribute('class', 'tableBorder');
      cookPerArray.push(cookPerHour);
      tableRow.appendChild(newTd);
    } else{
      var newTd = document.createElement('td');
      var cookTotal = 0;
      for (var l = 0; l < cookPerArray.length; l++){
        var cookTotal = cookTotal + cookPerArray[l];
      }
      newTd.innerText = cookTotal;
      newTd.setAttribute('class', 'tableBorder');
      tableRow.appendChild(newTd);
      var totalsTotal = totalsTotal + cookTotal;
      cookPerArray = [];
    }
  }
}
var newTHead = document.createElement('th');
newTHead.innerText = 'Daily Total: ' + totalsTotal;
newTHead.setAttribute('class', 'totalsTotal');
newTHead.setAttribute('class', 'tableBorder');
newTable.appendChild(newTHead);

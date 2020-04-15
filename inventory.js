function appendPre(message) {
  var pre = document.getElementById('inventory');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

function populateThead(headerRow) {
  var thead = document.getElementById('theadInventory');
  thead.innerHTML = "";
  for (i = 0; i < headerRow.length; i++) {
    var th = document.createElement("th");
    if(i == 1) { continue; }
    th.innerHTML = headerRow[i];
    thead.appendChild(th);
  }
}

function populateTbody(range) {
  maxCols = Math.max(...range.map((row) => row.length));
  var tbody = document.getElementById('tbodyInventory');
  tbody.innerHTML = "";
  for (i = 0; i < range.length; i++) {
    var tr = document.createElement("tr");
    for (j = 0; j < maxCols; j++) {
      var td = document.createElement("td");
      var content = range[i][j];
      if(j == 0) {
        td.innerHTML = `<b>${range[i][j+1]}</b><br><em>${content}</em>`;
      }
      else if(j == 1) {
        continue;
      }
      else if(content == undefined) {
        td.innerHTML = "<mark>-</mark>";
      }
      else {
        td.innerHTML = range[i][j];
      }
      tr.appendChild(td)
    }
    tbody.appendChild(tr);
  }
}

function loadSheet(sheetName) {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1nCr09CNqhmTRvxLjC8DtIH0IcAqtnWCeRZMLf5Y5X10',
    range: `${sheetName}!A1:J`,
  }).then(function(response) {
    var range = response.result;
    if(response.result.values == undefined) {
      populateTbody([]);
    }
    else {
      populateThead(range.values.shift());
      populateTbody(range.values);
    }
  });
}

function clickNav() {
  loadSheet(event.target.innerText);
}

function init(sheetName) {
  gapi.client.init({
    'apiKey': 'AIzaSyC4kcAuubA8aF1AEb06aHHV9_IOp4SkmP8',
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function() {
    loadSheet("Single Plant Alcohol Extracts");
  })
};

gapi.load('client', init);

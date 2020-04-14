function appendPre(message) {
  var pre = document.getElementById('inventory');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

function populateThead(headerRow) {
  var thead = document.getElementById('theadInventory');
  for (i = 0; i < headerRow.length; i++) {
    var th = document.createElement("th");
    th.innerHTML = headerRow[i];
    thead.appendChild(th);
  }
}

function populateTbody(range) {
  maxCols = Math.max(...range.map((row) => row.length));
  var tbody = document.getElementById('tbodyInventory');
  for (i = 0; i < range.length; i++) {
    var tr = document.createElement("tr");
    for (j = 0; j < maxCols; j++) {
      var td = document.createElement("td");
      var content = range[i][j];
      if(content == undefined) {
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

function start() {

  gapi.client.init({
    'apiKey': 'AIzaSyC4kcAuubA8aF1AEb06aHHV9_IOp4SkmP8',
    // Your API key will be automatically added to the Discovery Document URLs.
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],

  }).then(function() {

      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1Ec8bFnoHH2KAa-GM0dOQdjFiAebm10iHj-vZdaRQDqc',
        range: 'A1:I',
      }).then(function(response) {
        var range = response.result;

        if (range.values.length > 0) {
          populateThead(range.values.shift());
          populateTbody(range.values);
        } else {
          appendPre('No data found.');
        }
      });


  })
};

gapi.load('client', start);

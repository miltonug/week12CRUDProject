/**------------------------ Setting up a JSON server ------------------------
 *
 * Documentation: https://www.npmjs.com/package/json-server#getting-started
 *
 * 1. In terminal type: npm install -g json-server *
 * 2. In terminal type: json-server --watch db.json
 **/
const URL_endpoint = 'http://localhost:3000/gasPrices'

$.get(URL_endpoint).then(data => {
  data.map(station => {
    $('tbody').append(
      $(`
      <tr>
        <td>${station.id}</td>
        <td>${station.stationBrand}</td>
        <td>${station.stationAddress}</td>
        <td>$${station.gasPrice}</td>
        <td>${station.date}</td>             
      </tr>`)
    )
  })
});

// Add a new station/gas price record
$('#report').click(function() {
  $.post(URL_endpoint, {
    stationBrand: $('#brand').val(),
    stationAddress: $('#location').val(),
    gasPrice: $('#price').val(),
    date: $('#date').val(),
  }) 
});

// Update an existing station/gas price record
function updateData(id) {
  let stationID = prompt("Enter the Station ID:");
  $.ajax(`${URL_endpoint}/${stationID}`, {
    method: 'PUT',
    data:{
      stationBrand: prompt("Enter the Station Brand/Name:"),
      stationAddress: prompt("Enter the Station Address:"),
      gasPrice: prompt("Enter the Gas Price:"),
      date: prompt("Enter the Date (yyyy-mm-dd):"),
    }
  })  
};

$('#update').click(updateData)

// Delete an existing station/gas price record
function deleteData(id) {
  let stationID = prompt("Enter the Station ID:");
  $.ajax(`${URL_endpoint}/${stationID}`, {
    method: 'DELETE',
  })
};

$('#delete').click(deleteData)

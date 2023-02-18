function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for(var i in uiBathrooms) {
    if(uiBathrooms[i].checked) {
        console.log("BATH VALUE")

        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
    console.log("getting bhk value");
  var uiBHK = document.getElementsByName("uiBHK");
  console.log("loop")
  for(var i in uiBHK) {
    if(uiBHK[i].checked) {
        console.log("BHK value");
        return parseInt(i)+1;
    }
  }
  console.log("returning -1")
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  console.log("STEP1")
  var bhk = getBHKValue();
  console.log("STEP2")
  var bathrooms = getBathValue();
  console.log("STEP3")
  var location = document.getElementById("uiLocations");
  console.log("STEP4")
  var estPrice = document.getElementById("uiEstimatedPrice");
  console.log("STEP5")
 console.log("HAi", sqft, bhk, bathrooms, location, estPrice);
  var url = "http://127.0.0.1:8000/predict_home_price/"; //Use this if you are NOT using nginx which is first 7 tutorials
  // var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards

  $.post(url, {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value
  },function(data, status) {
      console.log("INSIDE DATA")
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
      console.log(status);
  });
}

function onPageLoad() {
  console.log( "document loaded" );
  var url = "http://127.0.0.1:8000/get_location_names/"; // Use this if you are NOT using nginx which is first 7 tutorials
  // var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.get(url,function(data, status) {
      console.log("got response for get_location_names request");
      console.log("data", data);
      if(data) {
          console.log("inside data")
          var locations = data.locations;
          console.log("data", data)
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();
          for(var i in locations) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  });
}

window.onload = onPageLoad;

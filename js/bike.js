export class Bike {

  apiCall(zip) {
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://bikeindex.org:443/api/v3/search?page=1&per_page=9999&location=${zip}&distance=15&stolenness=proximity`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      let readable = JSON.parse(response);
      let lastWeek = parseInt((Date.now() / 1000) - 604800);
      let bikesLastWeek = [];
      (readable.bikes).forEach(function(bike) {
        if (bike.date_stolen > LastWeek) {
          bikesLastWeek.push(bike);
        }
      });
      $("#output").text(`Bikes stolen last week: ${bikesLastWeek.length}`);
    }, function(error) {
      $("#output").text(`There was an error processing your request: ${error.message}`);
    });
  }
}

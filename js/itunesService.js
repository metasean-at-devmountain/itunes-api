var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also not that we're using a 'service' and not a 'factory' so all your method you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here
	this.getSongs = function(artist) {
		var deferred = $q.defer();
		var full_url = 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK';
		
		/*
		$http.JSONP('https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK')
		/*
		//could have done
		$http.JSONP('https://itunes.apple.com/search', {
			params: {
				term: artist,
				callback: 'JSON_CALLBACK'
			}
		}
		*/
		$http({
      	method: 'JSONP',
      	url: full_url
      }).then(function(response){
			deferred.resolve(response.data.results);  // my promise is resolved with the returned data
		});
		return deferred.promise;  // immediately returned

/*    ALTERNATE - no need for "deferred" object
		return $http.JSONP('https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK')
		.then(function(response){
			return response.data;
		});
*/
  	};


});
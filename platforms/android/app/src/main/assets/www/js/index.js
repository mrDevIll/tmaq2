/***********
 * OU TM352 Block 3, TMA03: index.js
 * 
 * To function correctly this file must be placed in a Cordova project and the appopriate plugins installed.
 * You need to complete the code which is commented with TODO. This includes the FRs and a few other
 * minor changes related to your HTML design decisions. 
 *
 * File created by Chris Thomson 11/10/2019 
 * File modified and submitted by: (your name here)
 ************/

/**
 * This utility method converts a date to a string according to the format
 * @param {type} date
 * @param {type} format, e.g., "yyyy:MM:dd:HH:mm" converts the date "2017-01-26 5:15pm" to "2017:01:26:17:15"
 * @param {type} utc
 * @returns {unresolved}
 */
function formatDate(date, format, utc) {
  var MMMM = [
    "\x00",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  var MMM = [
    "\x01",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  var dddd = [
    "\x02",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function ii(i, len) {
    var s = i + "";
    len = len || 2;
    while (s.length < len) s = "0" + s;
    return s;
  }

  var y = utc ? date.getUTCFullYear() : date.getFullYear();
  format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
  format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
  format = format.replace(/(^|[^\\])y/g, "$1" + y);

  var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
  format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
  format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
  format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
  format = format.replace(/(^|[^\\])M/g, "$1" + M);

  var d = utc ? date.getUTCDate() : date.getDate();
  format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
  format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
  format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
  format = format.replace(/(^|[^\\])d/g, "$1" + d);

  var H = utc ? date.getUTCHours() : date.getHours();
  format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
  format = format.replace(/(^|[^\\])H/g, "$1" + H);

  var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
  format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
  format = format.replace(/(^|[^\\])h/g, "$1" + h);

  var m = utc ? date.getUTCMinutes() : date.getMinutes();
  format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
  format = format.replace(/(^|[^\\])m/g, "$1" + m);

  var s = utc ? date.getUTCSeconds() : date.getSeconds();
  format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
  format = format.replace(/(^|[^\\])s/g, "$1" + s);

  var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
  format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
  f = Math.round(f / 10);
  format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
  f = Math.round(f / 10);
  format = format.replace(/(^|[^\\])f/g, "$1" + f);

  var T = H < 12 ? "AM" : "PM";
  format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
  format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

  var t = T.toLowerCase();
  format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
  format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

  var tz = -date.getTimezoneOffset();
  var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
  if (!utc) {
    tz = Math.abs(tz);
    var tzHrs = Math.floor(tz / 60);
    var tzMin = tz % 60;
    K += ii(tzHrs) + ":" + ii(tzMin);
  }
  format = format.replace(/(^|[^\\])K/g, "$1" + K);

  var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
  format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
  format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

  format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
  format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

  format = format.replace(/\\(.)/g, "$1");

  return format;
}

/**
 * Formatting the date string
 * @param {type} d, the date argument
 * @returns formatted Date string
 */
function format(d) {
  return formatDate(d, "yyyy:MM:dd:HH:mm");
}

/**
 * Check if provided string is a letter
 * @param {type} str, a string
 * @returns returns true if the string is of length 1 and contains a letter
 */
function isLetter(str) {
  return str.length === 1 && (/[a-z]/i).test(str);
}

/**
 * Check if provided string is a number
 * @param {type} str, a string
 * @returns returns true if the string is of length 1 and contains a numeral
 */
function isNumber(str) {
  return str.length === 1 && (/[0-9]/i).test(str);
}

/**
 * Utility to get default value from the field name if it was undefined or empty
 * @param {type} fieldName
 * @param {type} defaultValue
 * @returns {jQuery}
 */
function get_name_value(fieldName, defaultValue) {
  var value = $("#" + fieldName).val();
  if (value == "") {
    value = defaultValue;
    $("#" + fieldName).val(value);
  }
  if (fieldName == "name") {
    if (
      !(isLetter(value.charAt(0)) && isNumber(value.charAt(value.length - 1)))
    ) {
      alert("Please enter the correct value");
      return "";
    }
  }
  return value;
}

/**
 * This is the main class
 */
var app = {
	initialize: function() {
		document.addEventListener(
			"deviceready",
			this.onDeviceReady.bind(this),
			false
		);
	},
	// deviceready Event Handler
	onDeviceReady: function() {
		this.receivedEvent("deviceready");
	},
	
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		
		/* The following are private varibles only visible in this scope */

		var markers = []; //used to store markers on the map
		var map; // used to reference the HERE map
		
		/* The following are private functions only visible in this scope */
		
		function addMarkerToMap(address){
			if (address != undefined) {
				// TODO 2(a) FR2.2
				
				// You need to implement this code, see the TMA infomation for an explanation
				// of the fucntionality required.
				
				// Note: if you call the nominatim web service too frequenty your 
				// access will be autoblocked. Consider hard coding locations when testing.
				
				// to store a marker you create to later delete it use:
				// markers.push(marker);
				// to add it to the markers array
			}
		}
		
		// Call to clear any markers you have added to the markers array.
		function clearMarkersFromMap(){
			$.each(markers, function(index,value){
				if (value != null) map.removeObject(value);
			});
			markers = [];
		}
		
		// TODO: Several varibles need entering in this code. 
		function intialiseMap(){
			// initialize the platform object:
			var platform = new H.service.Platform({
				app_id: "APP_ID", 	  // TODO: Change to your own APP_ID
				app_code: "APP_CODE"  // TODO: Change to your own APP_CODE
			});
			// obtain the default map types from the platform object
			var defaultLayers = platform.createDefaultLayers();
			// instantiate (and display) a map object:
			var div = document.getElementById("MAP_ID"); // TODO: Change to the id of your map container
			
			map = new H.Map(
				div, 
				defaultLayers.normal.map
			);			
			
			// change the zoomin level
			map.setZoom(15);
			
			// optional: create the default UI:
			var ui = H.ui.UI.createDefault(map, defaultLayers);
			// optional: change the default settings of UI
			var mapSettings = ui.getControl("mapsettings");
			var zoom = ui.getControl("zoom");
			var scalebar = ui.getControl("scalebar");
			var panorama = ui.getControl("panorama");
			panorama.setAlignment("top-left");
			mapSettings.setAlignment("top-left");
			zoom.setAlignment("top-left");
			scalebar.setAlignment("top-left");
						
			//Find the device location and centre the map
			var onSuccess = function(position) {
				//Once we have found the user's location we centre the map
				map.setCenter({
					lng: position.coords.longitude,
					lat: position.coords.latitude
				});
			}
			
			// Errors here normally indicate the app/web page has not been granted privilages to 
			// share the device location.
			var onError = function(error) {
				alert(
					"code: " + error.code + "\n" + "message: " + error.message + "\n"
				);
			};
			
			//Note: Sometimes this takes some time to callback, and sometimes never callsback if the 
			//      permissions are not correctly set on the phone/emulator/browser.
			navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true});
		}
		  


		/**
		 * TODO update the map with addresses that match from the API
		 * @param {type} address
		 * @returns {undefined}
		 */
		function updateMatchingStatus(address) {
			// TODO 2(a) FR2.1
			var oucu = get_name_value("name", "user1"); //TODO adjust to get the OUCU from your HTML page.
			
			// You need to implement this code, see the TMA infomation for an explanation
			// of the fucntionality required.
			
			// Hint: you will need to call addMarkerToMap() and clearMarkersFromMap() as
			//       part of your solution.
			
			// Hint: if you cant work out how to use the API here, hard code a call to addMarkerToMap as
			//       as below. Then you can attempt FR2.2
			
			addMarkerToMap("Milton Keynes Central");
		}

		/**
		 * function for registering the taxi sharing service
		 */
		function register(oucu) {
			// 2(a) FR1.1
			// This is implemented for you and no further work is needed on it.
			var onSuccess = function(data){
				var obj = $.parseJSON(data);
				if (obj.status == "success") {
					alert("User " + oucu + " has been successfully registered.");
				} else {
					alert("User " + oucu + " is already registered.");
				}
			}
			
			// Post the user ID using the "users" API
			var uri = "http://137.108.92.9/openstack/taxi/users";
			var params = { OUCU: oucu };
			if (oucu != "")
				$.post(uri,params,onSuccess);
		};

		/**
		 * TODO function for volunteering a taxi
		 */
		function volunteer(oucu, address, start_time, end_time) {
			// TODO 2(a) FR1.2
			// You need to implement this code, see the TMA infomation for an explanation
			// of the fucntionality required.
		}
		
		/**
		 * TODO function for requesting a taxi
		 */
		function request(oucu,address,start_time) {
			// TODO 2(a) FR1.3
			// You need to implement this code, see the TMA infomation for an explanation
			// of the fucntionality required.
		};

		/**
		 * function for cancelling the bookings
		 */
		function cancel(oucu) {
			// 2(a) FR1.4
			// This is implemented for you and no further work is needed on it.
			
			var removeSuccess = function(result){
				//alert("Deleted: " + result);
			}

			var listSuccess = function(data){
				var obj = $.parseJSON(data);
				if (obj.status == "success") {
					// for each order found
					$.each(obj.data, function(index, value) {
						//Use the uri below for the browser
						var uri = "https://cors-anywhere.herokuapp.com/http://137.108.92.9/openstack/taxi/orders/" + value.id + "?OUCU=" + oucu;
						
						//The following may work on a phone
						//var uri = "http://137.108.92.9/openstack/taxi/orders/" + value.id + "?OUCU=" + oucu;
						
						// delete the record using an ajax call
						$.ajax({url: uri, type: "DELETE",data: {},success: removeSuccess});
					});
					alert("Deleted " + obj.data.length + " records");
				}
				else {
					alert(obj.status + " " + obj.data[0].reason);
				}
			}
			
			// fetch all the orders (requests and volunteers) for this OUCU
			var uri = "http://137.108.92.9/openstack/taxi/orders?OUCU="+ oucu;
			$.get(uri,listSuccess);

		};

		//This function creates the public interface to TaxiShare, these fuctions may be called 
		// by the JavaScript in the HTML file.
		//
		// TODO: Update code to the names of your user interface elements in the HTML, or otherwise 
		//       change the code here to reflect the design of your HTML.
		function TaxiShare(){
		
			// These varibles are private
			var taxiShareObject = {};
			var timerId = null;
			
			//Start updating the map with matches to the request or volunteer
			taxiShareObject.beginUpdatingMap = function(){
				// 2(a) FR3
				// This is implemented for you and no further work is needed on it.
				
				if (timerId) clearInterval(timerId);
				// every 10 seconds update the map with the current matches.
				timerId = setInterval(updateMatchingStatus, 10000); 
				// update the map now too
				updateMatchingStatus();
			}
			
			//Stop updating the map with matches
			taxiShareObject.stopUpdatingMap = function(){
				// 2(a) FR3
				// This is implemented for you and no further work is needed on it.
				clearInterval(timerId);
			}
			
			//Register a user with the web service
			taxiShareObject.registerUser = function (){
				//TODO adjust the following to get the OUCU from your HTML page.
				var oucu = get_name_value("name", "user1");
				register(oucu);
			}
			
			//Indicate that the user wants to volunteer to share their taxi
			taxiShareObject.volunteerTaxi = function (){
				//TODO adjust the following to get the required data from your HTML page.
				var oucu = get_name_value("name", "user1");
				var address = get_name_value("addr", "Open University"); 
				var start_time = get_name_value("time", format(new Date()));
				var hours = get_name_value("hours", 1); //duration in hours
				
				// The API requires an end time, but the interface allows for duration.
				// This code turns the duration into an end time.
				var d = new Date();
				d.setHours(d.getHours() + hours);
				var end_time = format(d);
				
				volunteer(oucu,address,start_time,end_time);
			}
			
			//Indicate that the user wants to share a taxi somebody else has booked.
			taxiShareObject.requestTaxi = function (){
				//TODO adjust the following to get the required data from your HTML page.
				var oucu = get_name_value("name", "user1");
				var address = get_name_value("addr", "Open University");
				var start_time = get_name_value("time", format(new Date()));
				request(oucu, address, start_time);
			}
			
			//Cancel all current volunteers and requests for this user.
			taxiShareObject.cancel = function (){
				//TODO adjust the following to get the required data from your HTML page.
				var oucu = get_name_value("name", "user1");
				cancel(oucu);
			}

			//return the intialised object
			return taxiShareObject;
		}
		
		// update the HERE  map initially
		intialiseMap();
		 
		//Create the TaxiShare object, visible in the HTML file as app.taxiShare
		this.taxiShare = new TaxiShare();
	}
};
app.initialize();

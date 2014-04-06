Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});


if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined'))
	console.log('Cordova variable does not exist. Check that you have included cordova.js correctly');
if (typeof CDV == 'undefined')
	console.log('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
if (typeof FB == 'undefined')
	console.log('FB variable does not exist. Check that you have included the Facebook JS SDK file.');

FB.Event.subscribe('auth.login', function(response) {
	console.log('auth.login event');
});

FB.Event.subscribe('auth.logout', function(response) {
	console.log('auth.logout event');
});

FB.Event.subscribe('auth.sessionChange', function(response) {
	console.log('auth.sessionChange event');
});

FB.Event.subscribe('auth.statusChange', function(response) {
	console.log('auth.statusChange event');
});

/*
 * function getSession() { console.log("session: " + JSON.stringify(FB.getSession())); }
 */
function getLoginStatus() {
	FB.getLoginStatus(function(response) {
		if (response.status == 'connected') {
			console.log('logged in');
		} else {
			console.log('not logged in');
		}
	});
}

var friendIDs = [];
var fdata;
function me() {
	FB.api('/me/friends', {
		fields : 'id, name, picture'
	}, function(response) {
		if (response.error) {
			console.log(JSON.stringify(response.error));
		} else {
			var data = document.getElementById('data');
			fdata = response.data;
			console.log("fdata: " + fdata);
			response.data.forEach(function(item) {
				var d = document.createElement('div');
				d.innerHTML = "<img src=" + item.picture + "/>" + item.name;
				data.appendChild(d);
			});
		}
		var friends = response.data;
		console.log(friends.length);
		for ( var k = 0; k < friends.length && k < 200; k++) {
			var friend = friends[k];
			var index = 1;

			friendIDs[k] = friend.id;
			// friendsInfo[k] = friend;
		}
		console.log("friendId's: " + friendIDs);
	});
}

function logout() {
	FB.logout(function(response) {
		console.log('logged out');
	});
}

function login() {
	FB.login(function(response) {
		if (response.session) {
			console.log('logged in');
		} else {
			console.log('not logged in');
		}
	}, {
		scope : "email, read_mailbox"
	});
}

function compartir(evt) {
	FB.getLoginStatus(function(response) {
		if (response.status == 'connected') {
			var nombre= this.parentElement.getElementById("titulo");
			var desc= this.parentElement.getElementById("desc");
			var params = {
				method : 'feed',
				name : nombre,
				link : '',
				picture : 'http://fbrell.com/f8.jpg',
				caption : "Dxi bedu': ayuda a lozalizar",
				description : desc
			};
			console.log(params);
			FB.ui(params, function(obj) {
				console.log(obj);
			});
		} else {
			login();
		}
	});
	
}


function getPersonMjs() {
	var amigos=new Array();
	FB.api('/me/inbox?limit=10', {
		fields : 'to'
	}, function(response) {
		if (response.error) {		
			console.log(JSON.stringify(response.error));		
		} else {
			console.log(JSON.stringify(response));
			//aqui mandar la console.loga
			
		}

	});
}

function publishStoryFriend() {
	randNum = Math.floor(Math.random() * friendIDs.length);
	var friendID = friendIDs[randNum];
	if (friendID == undefined) {
		console.log('please click the me button to get a list of friends first');
	} else {
		console.log("friend id: " + friendID);
		console.log('Opening a dialog for friendID: ', friendID);
		var params = {
			method : 'feed',
			to : friendID.toString(),
			name : 'Facebook Dialogs',
			link : 'https://developers.facebook.com/docs/reference/dialogs/',
			picture : 'http://fbrell.com/f8.jpg',
			caption : 'Reference Documentation',
			description : 'Dialogs provide a simple, consistent interface for applications to interface with users.'
		};
		FB.ui(params, function(obj) {
			console.log(obj);
		});
	}
}

document.addEventListener('deviceready', function() {
	try {
		FB.init({
			appId : "266466096864616",
			nativeInterface : CDV.FB,
			useCachedDialogs : true
		});
		document.getElementById('data').innerHTML = "";
	} catch (e) {
		console.log(e);
	}
}, false);
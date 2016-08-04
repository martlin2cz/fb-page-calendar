/**
	Implementation of facebook connection and login
	m@rtlin & FB
	04.08.2016
	source: https://developers.facebook.com/docs/facebook-login/web

	Calls functions loginSuccessfull() or loginUnsuccessfull(cause) on page load depending on facebook login status
*/

function statusChangeCallback(response) {
	//console.log(response);
	
	if (response.status === 'connected') { // Logged into your app and Facebook.
		loginSuccessfull();
	} else if (response.status === 'not_authorized') { // The person is logged into Facebook, but not your app.
		loginUnsuccessfull('Please log into this app.');
	} else { // The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
		loginUnsuccessfull('Please log into Facebook.');
	}
}

function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

window.fbAsyncInit = function() {
	FB.init({
		appId      : APP_ID,
		cookie     : true,  
		xfbml      : true,
		version    : API_VERSION
	});
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
};

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

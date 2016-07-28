function statusChangeCallback(response) {
	//console.log(response);
	
	if (response.status === 'connected') { // Logged into your app and Facebook.
		doFBstuff();
		toggleStatus(true);
	} else if (response.status === 'not_authorized') { // The person is logged into Facebook, but not your app.
		alert('Please log into this app.');
		toggleStatus(false);
	} else { // The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
		alert('Please log into Facebook.');
		toggleStatus(false);
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

function doFBstuff() {
	createCalendarAndLoadPosts();
}


function nextMonthOf(date) {
	return (date.getMonth() + 1)  % 12 + 1;
}

function nextMonthYearOf(date) {
	if (date.getMonth() == 11) {
		return date.getFullYear() + 1; 
	} else {
		return date.getFullYear();
	}
}

function fbLoadPosts(postHandler, lastHandler, date) {
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	var nextMonth = nextMonthOf(date);
	var nextMonthYear = nextMonthYearOf(date);
	
	var query = '/' + PAGE_ID + '/promotable_posts'
		+'?is_published=' + 'true'
		+ '&since=' + '1-' + month + '-' + year
		+ '&until=' + '1-' + nextMonth + '-' + nextMonthYear;


	FB.api(query, function(response) {
		console.log(response);
		var i;
		for (i = 0; i < response.data.length; i++) {
			var post = response.data[i];
			postHandler(post);
		}
	
		lastHandler();
	});
}

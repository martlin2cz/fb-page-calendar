<!DOCTYPE html>
<html>
	<head>
		
<?php
	//SOURCE: https://developers.facebook.com/docs/facebook-login/web

	define('APP_ID', '592321284281979');
	define('APP_SCOPE', 'public_profile,manage_pages');

	define('API_VERSION', 'v2.7');
	define('PAGE_ID', 'volnaskola'); 
?>

		<title>Facebook page posts calendar</title>
		<meta charset="UTF-8">
	
	<script>
		var APP_ID = "<?= APP_ID ?>";
		var APP_SCOPE = "<?= APP_SCOPE ?>";
		var API_VERSION = "<?= API_VERSION ?>";
		var PAGE_ID = "<?= PAGE_ID ?>";
	</script>

		<link rel="stylesheet" href="calendar-sheduler.css">

		<script src="jquery-3.1.0.js"></script>
		<script src="calendar.js"></script>
		<script src="calendar-sheduler.js"></script>
		<script src="fb-conn.js"></script>
</head>
	<body>

<script>
function createCalendarAndLoadPosts() {
	var month = 7;
	var year = 2016;
	var date = new Date();
	date.setFullYear(year, month - 1, 1);

	showLoading('loading posts');

	createCalendar(date);
	loadPosts(date);
}


function createCalendar(date) {
	createCalendarSheduler('calendar-wrapper', date);
}


function loadPosts(date) {
	var postHandler = function(post) {
		var when = new Date(post.created_time);
		//console.log(when);

		var what = (when.getHours() + ":" + when.getMinutes()) + ": " 
			+ shorten(post.message);

		addToDay('calendar-wrapper', when, what);
	};

	var lastHandler = function() {
		hideLoading();
	};


	fbLoadPosts(postHandler, lastHandler, date);
}

/******************************************************************************/

function shorten(text) {
	var index = text.indexOf('\n');
	
	var substr;
	if (index != -1) {
		substr = text.substr(0, index);
	} else {
		substr = text;
	}

	return substr + "...";
}

function toggleStatus(isLogged) {
	if (isLogged) {
		$('#not-logged').hide();
		$('#logged').show();
	} else {
		$('#not-logged').show();
		$('#logged').hide();
	}
}

function showLoading(what) {
	var $content = $('<div id="loading"><h2>Counting to infinity, please wait ...</h2><p>' + what + '</p></div>');
	showOverlay($content);
}


function hideLoading() {
	hideOverlay();
}

$(function() {
	showLoading('connecting to facebook');
});
</script>

		<article>
			
			<div id="not-logged">
				<p>
					Please log in:
				
					<fb:login-button scope="<?= APP_SCOPE ?>" onlogin="checkLoginState();"></fb:login-button>
				</p>
			</div>
			<div id="logged">
				<p>
				Ok, you're logged in.
				</p>
				<div id="calendar-wrapper"></div>
			</div>
		<div id="status">
		</div>
		</article>
	</body>
</html>

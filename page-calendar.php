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
	
		<script src="jquery-3.1.0.js"></script>
		<script src="fb-conn.js"></script>
		<script src="calendar.js"></script>
	</head>
	<body>

<script>
function createCalendarAndLoadPosts() {
	var month = 7;
	var year = 2016;

	$("#loading").show();

	createCalendar(month, year);
	loadPosts(month, year);
}

function createCalendar(month, year) {
	calendarOfMonth('calendar-wrapper', month, year);	
	initializeMonthLists('calendar-wrapper', month, year);
}

function loadPosts(month, year) {
	var postHandler = function(post) {
		var when = new Date(post.created_time);
		//console.log(when);

		var pday = when.getDate();
		var pmonth = when.getMonth() + 1;
		var pyear = when.getFullYear();
	
		if (pmonth != month || pyear != year) {
			console.warn('post outside of range');
		}

		var what = (when.getHours() + ":" + when.getMinutes()) + ": " 
			+ shorten(post.message);
		//console.log(pday + "." + pmonth + "." + pyear + "->" + what);

		appendToDateList('calendar-wrapper', pday, pmonth, pyear, what);
	};

	var lastHandler = function() {
		$("#loading").hide();
	};


	fbLoadPosts(postHandler, lastHandler, month, year);
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

/*
function doFBstuff() {
	
	

	var query = '/' + PAGE_ID + '/promotable_posts?is_published=true';
	FB.api(query, function(response) {
	
		console.log(response);
		
		document.getElementById('status').innerHTML =
		
			'Here: <pre>' + JSON.stringify(response, null, 2) + '</pre>';
			
	});
	
}
 */
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

		<div id="loading">
			LOADING...
		</div>
		</article>
	</body>
</html>

<!DOCTYPE html>
<html>
	<head>
		
<?php
	//SOURCE: https://developers.facebook.com/docs/facebook-login/web

	//facebook configuration
	define('APP_ID', '592321284281979');
	define('APP_SCOPE', 'public_profile,manage_pages');
	define('API_VERSION', 'v2.7');

	//application configuration
	define('APP_VERSION', '0.1');

	//page to be managed, can be overriden by URL querry: ?pageid=foo
	define('PAGE_ID', 'zuck'); 
?>

		<title>Facebook page posts calendar</title>
		<meta charset="UTF-8">
	
		<link rel="stylesheet" href="calendar-sheduler.css">

		<script src="jquery-3.1.0.js"></script>
		<script src="calendar.js"></script>
		<script src="calendar-sheduler.js"></script>
		<script src="fb-page-cal.js"></script>
	<script>
			//facebook app specification
			var APP_ID = "<?= APP_ID ?>";
			var APP_SCOPE = "<?= APP_SCOPE ?>";
			var API_VERSION = "<?= API_VERSION ?>";
			//application configuration
			var PAGE_ID = fromUrlOrDefault('pageid', "<?= PAGE_ID ?>");
			var DATE = fromUrlOrNow();
		</script>
		<script src="fb-conn.js"></script>
		<script src="fb-queries.js"></script>
	

</head>
	<body>

		<article>
			<div id="login-initial-status">
				<p>Are you logged in?</p>
			</div>
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
		</article>
		
		<footer>Facebook page calendar <?= APP_VERSION ?>, <a href="https://github.com/martlin2cz/fb-page-calendar.git">github</a></footer>
	</body>
</html>

/**
	Implementation of functions of the main page
	m@rtlin
	28.7.2016
*/

/* Initialization of page and calendar */
function createCalendarAndLoadPosts(date) {

	showLoading('loading posts');

	createCalendar(date);
	loadPosts(date);
}


function createCalendar(date) {
	createCalendarSheduler('calendar-wrapper', date);
}


/* loading and displaying posts */
function loadPosts(date) {
	var postHandler = function(post) {
		var when = new Date(post.created_time);
		//console.log(post);

		var what = '<tr class="whole-post">';

		what = what + '<td class="post-date-cell">' + when.getHours() + ':' + when.getMinutes() + '</td>';
		if (post.picture) {
			what = what + '<td class="post-prev-image-cell"><img class="post-prev-image" src="' + post.picture + '" alt="prev" /></td>';
		} else {
			what = what + '<td class="post-prev-image-cell">&nbsp;</td>';
		}
		what = what + '<td class="post-text-cell">' + shorten(post.message || post.story) + '</td>';
		what = what + '</tr>';

		addToDay('calendar-wrapper', when, what);
	};

	var lastHandler = function() {
		//FIXME $(".csd-items").append($(".csd-item").get().reverse());
		hideLoading();
	};


	fbLoadPosts(postHandler, lastHandler, date);
}

/******************************************************************************/
/* help methods */
function fromUrlOrDefault(name, dflt) {
	//SOURCE: http://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-url-parameter
	var url = location.href;
	var regex = new RegExp(name + "=([^&]+)");
	var captured = regex.exec(url);
	return captured && captured[1] ? captured[1] : dflt;
}

function fromUrlOrNow() {
	var date = new Date();

	month = fromUrlOrDefault('month', null);
	if (month && parseInt(month) >= 1 && parseInt(month) <= 12) {
		date.setMonth(parseInt(month) - 1);
	}

	year = fromUrlOrDefault('year', null);
	if (year && parseInt(year) > 2010) {
		date.setFullYear(parseInt(year));
	}

	return date;
}

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


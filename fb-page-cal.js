/**
	Implementation of functions of the main page
	m@rtlin
	28.7.2016
*/

/*******************************************************************/
/* facebook loging in */

function loginSuccessfull() {
	toggleStatus(true);                                                                                                                
	hideLoading();

	doTheLoading();
}

function loginUnsuccessfull(cause) {
	toggleStatus(false); 
	hideLoading();

	alert(cause);
}

/*******************************************************************/
/* create calendar and load posts */
function doTheLoading() {
	  createCalendarAndLoadPosts(DATE, PUBLISHED, SHEDULED);
}

/* Initialization of page and calendar of given month and published and sheduled flags */
function createCalendarAndLoadPosts(date, published, sheduled) {

	console.info('Starting to init calendar and load posts of month:' + date);

	createCalendar(date);
	if (published) {
		loadPublishedPosts(date);
	}
	if (sheduled) {
		loadSheduledPosts(date);
	}
}


function createCalendar(date) {
	showLoading('creating calendar');
	$('#calendar-wrapper').empty();
	createCalendarSheduler('calendar-wrapper', date);
}


/* loading and displaying posts */


var postToCalendarHandler = function(post) {
	//console.log(post);
	var what = '<tr class="whole-post">';

	var url = 'http://facebook.com/' + post.id;
	what = what + '<th '
		+ 'title="' + post.when + '" '
		+ 'class="post-date-cell ' + (post.yetPublished ? 'published-date' : 'unpublished-date') + '">'
		+ '<a href="' + url + '" target="_blank">'
		+ timeToStr(post.when) 
		+ '</a>' 
		+ '</th>';

	if (post.picture) {
		what = what + '<td class="post-prev-image-cell">'
			+ '<a href="'
			+ post.picture
			+ '" target="_blank">'
			+ '<img class="post-prev-image" src="' 
			+ post.picture 
			+ '" alt="prev" />'
			+ '</a>'
			+ '</td>';
	} else {
		what = what + '<td class="post-prev-image-cell">' 
			+ '&nbsp;' 
			+ '</td>';
	}

	what = what + '<td class="post-text-cell" ' 
		+ 'title="' + post.text.replace(/\"/g, '&quot;') + '">' 
		+ shorten(post.text) 
		+ '</td>';
	
	what = what + '</tr>';
	addToDay('calendar-wrapper', post.when, what);
};


var loadingCount = 0;
var startLoadingHandler = function() {
	showLoading('loading posts');
	loadingCount++;
};

var lastPostHandler = function() {
	loadingCount--;
	if (loadingCount == 0) {
		//FIXME sort items ... 
		hideLoading();
	}
};

function loadPublishedPosts(date) {
	fbLoadPublishedPosts(postToCalendarHandler, startLoadingHandler, lastPostHandler, date);
}

function loadSheduledPosts(date) {
	fbLoadSheduledPosts(postToCalendarHandler, startLoadingHandler, lastPostHandler, date);
}

/******************************************************************************/
/* handling of user actions */
function gotoNextMonth() {
	DATE.setDate(1);
	DATE.setMonth(DATE.getMonth() + 1);
	doTheLoading();
}

function gotoPreviousMonth() {
	DATE.setDate(1);
	DATE.setMonth(DATE.getMonth() - 1);
	doTheLoading();
}

/******************************************************************************/
/* help methods */

function timeToStr(date) {
	var hours;
	if (date.getHours() < 10) {
		hours = "&nbsp;" + date.getHours();
	} else {
		hours = date.getHours();
	}
	
	var minutes;
	if (date.getMinutes() < 10) {
		minutes = "0" + date.getMinutes();
	} else {
		minutes = date.getMinutes();
	}

	return hours + ":" + minutes;
}

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
	
	if (index != -1) {
		var substr = text.substr(0, index);
		return substr + " ...";	
	} else {
		return text;
	}
}

function toggleStatus(isLogged) {
	$('#login-initial-status').hide();
	
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


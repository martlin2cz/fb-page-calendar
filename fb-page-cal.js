/**
	Implementation of functions of the main page
	m@rtlin
	28.7.2016
*/

function loginSuccessfull() {
	toggleStatus(true);                                                                                                                
	hideLoading();

	doFBstuff();
}

function loginUnsuccessfull(cause) {
	toggleStatus(false); 
	hideLoading();

	alert(cause);
}

function doFBstuff() {                                                                                                                 
	  createCalendarAndLoadPosts(DATE, true, true);
}

/* Initialization of page and calendar of given month and published and sheduled flags */
function createCalendarAndLoadPosts(date, published, sheduled) {

	console.info('Starting to init calendar and load posts of month:' + date);

	//TODO if published? if sheduled?
	createCalendar(date);
	loadPublishedPosts(date);
	loadSheduledPosts(date);
}


function createCalendar(date) {
	showLoading('creating calendar');
	createCalendarSheduler('calendar-wrapper', date);
}


/* loading and displaying posts */
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

var postToCalendarHandler = function(post) {
	//console.log(post);
	var what = '<tr class="whole-post">';

	what = what + '<td '
		+ 'title="' + post.when + '" '
		+ 'class="post-date-cell ' + (post.yetPublished ? 'published-date' : 'unpublished-date') + '">'
		+ timeToStr(post.when) + 
		'</td>';

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
		+ 'title="' + post.text + '">' 
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
	//FIXME sort items ... 
	loadingCount--;
	if (loadingCount == 0) {
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


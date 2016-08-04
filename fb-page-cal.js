/**
	Implementation of functions of the main page
	m@rtlin
	28.7.2016
*/


function doFBstuff() {                                                                                                                 
	  createCalendarAndLoadPosts(DATE, true, true);
}

/* Initialization of page and calendar of given month and published and sheduled flags */
function createCalendarAndLoadPosts(date, published, sheduled) {

	console.debug('Starting to init calendar and load posts of month:' + date);

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

var postToCalendarHandler = function(post) {
	console.log(post);
	var what = '<tr class="whole-post">';

	what = what + '<td '
		+ 'title="' + post.when + '" '
		+ 'class="post-date-cell ' + (post.yetPublished ? 'published-date' : 'unpublished-date') + '">'
		+ post.when.getHours() + ':' + post.when.getMinutes() + 
		'</td>';

	if (post.picture) {
		what = what + '<td class="post-prev-image-cell">'
			+ '<img class="post-prev-image" src="' 
			+ post.picture 
			+ '" alt="prev" />'
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

var lastPostHandler = function() {
	//FIXME $(".csd-items").append($(".csd-item").get().reverse());
	hideLoading();
};

function loadPublishedPosts(date) {
	showLoading('loading published posts');
	fbLoadPublishedPosts(postToCalendarHandler, lastPostHandler, date);
}

function loadSheduledPosts(date) {
	showLoading('loading sheduled posts');
	fbLoadSheduledPosts(postToCalendarHandler, lastPostHandler, date);
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


/**
	Calendar (calendar.js)'s extension to be use as shedule displayer
	m@rtlin
	27.7.2016
*/

/**
	Creates extended calendar as a child of given ID and of given date's month
*/
function createCalendarSheduler(ownerID, date) {
	calendarOfMonth(ownerID, date);
	upgradeToSheduler(ownerID, date);
}

/**
	To given ID heaving as a child yet generated calendar extends to sheduler
*/
function upgradeToSheduler(ownerID, date) {
	var days = daysInMonth(date);

	var day = cloneDate(date);
	var i;
	for (i = 1; i <= days; i++) {
		day.setDate(i);
		var $content = getDayContent(ownerID, day);
		appendDayContentContent($content);
	}
}

/**
	To given content of day appends sheduler stuff
*/
function appendDayContentContent($content) {
		var $countLink = $('<a href="#" class="csd-count csd-count-empty"></a>');
		$content.append($countLink);
		
		var $itemsList = $('<ul class="csd-items hidden"></ul>');
		$content.append($itemsList);
	
		$countLink.click(function() { 
			var $content = $itemsList.clone();
			$content.removeClass('hidden');
			showOverlay($content);
			return false; 
		});
}

/**
	Adds given content to day in sheduler calendar of given ID
*/
function addToDay(ownerID, day, what) {
	var $content = getDayContent(ownerID, day);
	var $what = $('<li class="csd-item">' + what + '</li>');
	$($content).find('ul.csd-items').append($what);

	var $count = $($content).find('a.csd-count');
	var count;
	if ($count.text() == '') {
		$count.removeClass('csd-count-empty');
		count = 1;
	} else {
		$count.addClass('csd-count-nonempty');
		count = parseInt($count.text()) + 1;
	}
	$count.text(count);
}

/**
	Displays overlay with given content
*/
function showOverlay($what) {
	if ($('#overlay-wrapper').length) {
		hideOverlay();
	}

	$shadow = $('<div id="overlay-shadow"></div>');
	$content = $('<div id="overlay-content"></div>');
	$wrapper = $('<div id="overlay-wrapper"></div>');

	$shadow.click(function () {
		hideOverlay();
	});
	$content.append($what);
	
	$wrapper.append($shadow);
	$wrapper.append($content);

	$('body').append($wrapper);
}

/**
	Hides overlay shown by previous procedure
*/
function hideOverlay() {
	$('#overlay-wrapper').remove();
}

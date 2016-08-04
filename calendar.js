/*
	 Very simple javascript calendar widged implementation
	 m@rtlin
	 26.7.2016
	 */

/********************************************************************/
/* days and months names */
var DAYS = [ 'Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne' ];
var MONTHS = [ 'leden', 'únor', 'březen', 'duben', 'květen', 'červen', 
	'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec' ];

/********************************************************************/

/**
	Returns copy of given date. What else?
*/
function cloneDate(date) {
	return new Date(date.getTime());
}

/**
	Returns specified date's month's first day (1 = Mon, 2 = Tue, ... 7 = Sun)
*/
function firstDayOfMonth(date) {
	var year = date.getFullYear();
	var month = date.getMonth();
	var md = new Date();
	md.setFullYear(year, month, 1);

	var day = md.getDay();
	if (day == 0) {
		return 7;
	} else {
		return day;
	}
}

/**
	Returns number of specified date's month (28,29,30,31)
*/
function daysInMonth(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var md = new Date(year, month, 0);
	return md.getDate();
}

/**
	Returns row index (0 - ...) of specified day in its month's table
*/
function rowOfDay(date) {
	var from = firstDayOfMonth(date);
	var day = date.getDate();
	return Math.floor((from + day - 2) / 7);
}

/**
	Returns column index (0, ... 6) of specified day in ints month's table's week's row
*/
function colOfDay(date) {
	var from = firstDayOfMonth(date);
	var day = date.getDate();
	return (from + day - 2) % 7;
}

/********************************************************************/

/**
	Generates simple calendar as child of given ID, and given date's month
*/
function calendarOfMonth(ownerID, date) {
	var from = firstDayOfMonth(date);
	var days = daysInMonth(date);
	
	generateCalendar(ownerID, from, days, date);
}

/**
	Generates simple calendar as child of given ID, starting with day 1 at specified day from and with given number of days
*/
function generateCalendar(ownerID, from, days, date) {
	var $table = $('<table id="' + ownerID +'-calendar-table" class="calendar-table"></table>');

	var month = date.getMonth() + 1;
	var year = date.getFullYear();

	var $thead = generateCalendarThead(month, year);
	var $tbody = generateCalendarTbody(from, days);

	$table.append($thead);
	$table.append($tbody);

	$('#' + ownerID).append($table);
}

function generateCalendarThead(month, year) {
	var $thead = $('<thead></thead>'); 
	var monthName = MONTHS[month - 1];

	$title= $('<tr>'
			+ '<th><input type="button" value="&lt;" class="header-button" onClick="gotoPreviousMonth();" /></th>'
			+ '<th colspan="5">' + monthName + ' ' + year + '</th>'
			+ '<th><input type="button" value="&gt;" class="header-button" onClick="gotoNextMonth();" /></th>'
			+ '</tr>');
	
  $hrow=$('<tr></tr>');
	var i;
	for (i = 1; i <= 7; i++) {
		var dayName = DAYS[i - 1];
		var $hday = $('<th>' + dayName + '</th>');
		$hrow.append($hday);
	}
	
	$thead.append($title);
	$thead.append($hrow);

	return $thead;
}

/**
	To given $table adds cells of calendar
*/
function generateCalendarTbody(from, days) {
	var $tbody = $('<tbody></tbody>');
	var i, j;
	for (i = - from + 2; i <= days; 1) {
		var $row = $('<tr class="calendar-week-row"></tr>');
		for (j = 1; j <= 7; j++) {
			
			var $cell;
			if (i <= 0 || i > days) {
				$cell = $('<td class="calendar-day-cell"></td>');
			} else {
				$cell = $('<td class="calendar-day-cell">'
						+ '<span class="calendar-day-number">' + i + '</span>'
						+ '<div class="calendar-day-content">'
						+ '</div></td>');
			}
	
			$row.append($cell);
			i++;
		}
		$tbody.append($row);
	}
	return $tbody;
}

/********************************************************************/

/**
	For given date returns cell's content div found in given ID of calendar
*/
function getDayContent(ownerID, date) {
	var row = rowOfDay(date);
	var col = colOfDay(date);
	//console.debug('row=' + row + ',col=' + col);
	var $content = $('#' + 'calendar-wrapper' + ' > table > tbody > tr:eq(' + row + ') > td:eq(' + col + ') > .calendar-day-content');
	//console.debug($content);
	return $content;
}



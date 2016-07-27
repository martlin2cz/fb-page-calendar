/*
	 Very simple javascript calendar widged implementation
	 m@rtlin
	 26.7.2016
	 */

function firstDayOfMonth(month, year) {
	var dd = new Date();
	dd.setFullYear(year, month - 1, 1);
	return dd.getDay();
}

function numberOfDays(month, year) {
	var md = new Date(year, month, 0);
	return md.getDate();
}

function rowOfDay(from, day) {
	return Math.floor((from + day - 2) / 7);
}

function colOfDay(from, day) {
	return (from + day - 2) % 7;
}
function calendarOfMonth(ownerID, month, year) {
	var from = firstDayOfMonth(month, year);
	var days = numberOfDays(month, year);
	
	//console.log(month + ": " + from + "-" + days);
	generateCalendar(ownerID, from, days);
}

function generateCalendar(ownerID, from, days) {
	var $table = $('<table id="' + ownerID +'-calendar-table" border="1"></table>');
	
	$header = $('<thead> days: ' + days + '</thead>');	//FIXME
	$table.append($header);
	
	
	$hrow=$('<tr><th>Po</th><th>Út</th><th>St</th><th>Čt</th><th>Pá</th><th>So</th><th>Ne</th></tr>');
	$table.append($hrow);
	
	var i, j;
	for (i = - from + 2; i <= days; 1) {
		var $row = $('<tr></tr>');
		for (j = 1; j <= 7; j++) {
			
			var $cell;
			if (i <= 0 || i > days) {
				$cell = $('<td></td>');
			} else {
				$cell = $('<td><span class="calendar-day-number">' + i + '</span><div class="calendar-day-content"> </div></td>');
			}
	
			$row.append($cell);
			i++;
		}
		$table.append($row);
	}

	$('#' + ownerID).append($table);
}

function getDayContent(ownerID, from, day) {
	var row = 1+rowOfDay(from, day);
	var col = colOfDay(from, day);
	//console.log('row=' + row + ',col=' + col);
	var $content = $('#' + ownerID + ' > table tr:eq(' + row + ') td:eq(' + col + ') > .calendar-day-content');
	//console.log($content);
	return $content;
}


function initializeMonthLists(ownerID, month, year) {
	var from = firstDayOfMonth(month, year);
	var days = numberOfDays(month, year);
	
	initializeDaysLists(ownerID, from, days);
}


function initializeDaysLists(ownerID, from, days) {
	var i;
	for (i = 1; i <= days; i++) {
		var $content = getDayContent(ownerID, from, i);
		$($content).append('<ul></ul>');
	}
}

function appendToDayList(ownerID, from, day, what) {
	var $content = getDayContent(ownerID, from, day);
	var $what = $('<li>' + what + '</li>');
	$($content).find('ul').append($what);
}

function appendToDateList(ownerID, day, month, year, what) {
	var from = firstDayOfMonth(month, year);
	appendToDayList(ownerID, from, day, what);
}

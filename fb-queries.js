/**
	Implementation of facebook querying
	m@rtlin
	04.08.2016
*/

function nextMonthOf(date) {
  return (date.getMonth() + 1)  % 12 + 1;
}

function nextMonthYearOf(date) {
  if (date.getMonth() == 11) {
    return date.getFullYear() + 1;
  } else {
    return date.getFullYear();
  }
}

function isSmallerMonth(firstDate, secondDate) {
	if (firstDate.getFullYear() < secondDate.getFullYear()) {
		return true;
	}
	if (firstDate.getFullYear() == secondDate.getFullYear()) {
		return firstDate.getMonth() < secondDate.getMonth();
	}
	if (firstDate.getFullYear() > secondDate.getFullYear()) {
		return false;
	}
}

function isGreaterMonth(firstDate, secondDate) {
	return isSmallerMonth(secondDate, firstDate);	//hehe
}

function fbLoadPublishedPosts(postHandler, startLoadingHandler, lastPostHandler, date) {
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var nextMonth = nextMonthOf(date);
  var nextMonthYear = nextMonthYearOf(date);
  
  var query = '/' + PAGE_ID + '/feed'
    + '?since=' + '1-' + month + '-' + year
    + '&until=' + '1-' + nextMonth + '-' + nextMonthYear
    + '&limit=100'
    + '&fields=id,message,story,created_time,picture';

  var rawPostHandler = function(rawPost) {
    var post = new Object();
    post.id = rawPost.id;
    post.when = new Date(rawPost.created_time);
    post.text = rawPost.message || rawPost.story;
    post.picture = rawPost.picture;
		post.yetPublished = true;
 
		postHandler(post);
		return true;
  };

  invokeLoadPostsQuery(query, rawPostHandler, startLoadingHandler, lastPostHandler);
}


function fbLoadSheduledPosts(postHandler, startLoadingHandler, lastPostHandler, date) {
  
  var query = '/' + PAGE_ID + '/promotable_posts'
    + '?is_published=' + 'false'
    + '&limit=100'
    + '&fields=id,message,story,scheduled_publish_time,picture';

  var rawPostHandler = function(rawPost) {
    var post = new Object();
    post.id = rawPost.id;
    post.when = new Date(rawPost.scheduled_publish_time * 1000);
    post.text = rawPost.message || rawPost.story;
    post.picture = rawPost.picture;
		post.yetPublished = false;

    //postHandler(post);
		if (isSmallerMonth(post.when, date) || isGreaterMonth(post.when, date)) {
			return false;
		} else {
			postHandler(post);
			return true;
		}
  };

  invokeLoadPostsQuery(query, rawPostHandler, startLoadingHandler, lastPostHandler);
}

function invokeLoadPostsQuery(query, rawPostHandler, startLoadingHandler, lastPostHandler) {
  if (startLoadingHandler) {
		startLoadingHandler();
	}
	
	FB.api(query, function(response) {
    console.log(response);
    if (response.error) {
      alert('Error:\n' + JSON.stringify(response.error));
      return;
    }

    var broken = false;
    var i;
    for (i = 0; i < response.data.length; i++) {
      var post = response.data[i];
      var rslt = rawPostHandler(post);
      if (rslt == false) {
        continue;
      }
      if (rslt == null) {
        broken = true;
        break;
      }
    }

    if (!broken && response.paging && response.paging.next) {
      var next = response.paging.next;
      invokeLoadPostsQuery(next, rawPostHandler, null, lastPostHandler);
    } else {
			if (lastPostHandler) {
				lastPostHandler();
			}
		}

  });
}



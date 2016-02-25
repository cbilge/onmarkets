function readbl(url) {
var token = "8554ae1a3f72567db4a0a1af7966f0242988f9ae";
var urltosend = "http://www.readability.com/api/content/v1/parser?token=" + token + "&url=" + url;
	$.getJSON(urltosend, function(res,stat){
		alert ("status " + stat + "\nresponse" + res);
	}); 
}

function readbl2(url) {
	var gscript = "https://script.google.com/macros/s/AKfycbwYmMDu7vub6YcB7GE36VS428czgufx2himML9XGsUjwtaUktjl/exec";
	$("#newsreturn").text("Loading...");
	//https://script.google.com/macros/s/AKfycbyJHydWmuvwA-2EXDUK6fx0vfNp2hiTOjJTBNMfCFX1/dev
	var urltosend = gscript + "?lnk=" + url;
	$.getJSON(urltosend, function(res,stat){
		//$("#newsreturn").text(JSON.stringify(res,null,4));
		var reshtml = "<h3>" + res.title + "</h3>" + res.content + "<a target='_blank' href='" + res.url + "'>View original...</a>";
		$("#newsreturn").html(reshtml);
	}); 
}

function rsstest() {
	var rssScript = "https://script.google.com/macros/s/AKfycbxeegdXXdxTTKp4ZfZyK2zEFZz8MPgHJ5RhdqmV9a-ne_63U3w/exec";
	var rssDev = "https://script.google.com/macros/s/AKfycbxF5z1T-1Bam5z6t3oNErq-OcqDlN7-Qu1qm-YFGBU/dev";
	$("#newsreturn").text("rsstest...");
	var urltosend = rssDev + "?type=feed";
	$("#newsreturn").text(urltosend);
    $.getJSON(urltosend, function(res,stat) {
		alert("Data: " + JSON.stringify(res) + "\nStatus: " + stat);
		//var reshtml = "<h3>" + res.title + "</h3>" + res.content + "<a target='_blank' href='" + res.link + "'>View original...</a>";
		$("#newsreturn").html(JSON.stringify(res, null, 4));
	});
}

function bbdata(ticker, target){
	var bbgurl = "http://www.bloomberg.com/quote/" + ticker;
	$.get(bbgurl,function(res,stat){
			$(target).text($(res.responseText).find(".price").text());
	});
}

function quandl(){
token="ydrsULtyepSow3kZsSn-"	
}

function readfeed(url){
	$.jGFeed(url,
		function(feeds){
		  // Check for errors
		  if(!feeds){
			// there was an error
			return false;
		  }
		  // do whatever you want with feeds here
		  for(var i=0; i<feeds.entries.length; i++) {
			var entry = feeds.entries[i];
			// Entry title
			var newitem = $("<li>").addClass("entry list-group-item").attr("source",entry.link).appendTo("#newslist");
			$("<span>").addClass("entry-link").addClass("glyphicon glyphicon-chevron-right").appendTo(newitem);
			$("<p>").addClass("entry-title").html(entry.title).appendTo(newitem);
		  }
		}, 10);
}

function filldata(){
	$(".data").each(function(dat){
		bbdata($(this).attr("ticker"),$(this).children("td:last"));
	});
}


//https://script.google.com/macros/s/AKfycbwYmMDu7vub6YcB7GE36VS428czgufx2himML9XGsUjwtaUktjl/exec

var main = function(){
	readfeed("http://www.newslookup.com/rss/business/bloomberg.rss");
	rsstest();
	//readbl2("http://www.bloomberg.com/news/articles/2016-02-03/merck-s-top-selling-diabetes-drugs-fall-short-of-sales-estimates");
	filldata();
	$(document).on("click",".entry", function(){
		$(".entry").removeClass("active").children(".entry-link.active").removeClass("active").toggleClass("glyphicon-chevron-right").toggleClass("glyphicon-chevron-left");
		$(this).toggleClass("active").children(".entry-link").toggleClass("glyphicon-chevron-right").toggleClass("glyphicon-chevron-left").toggleClass("active");
		readbl2($(this).attr("source"));
	});
}

$(document).ready(main);
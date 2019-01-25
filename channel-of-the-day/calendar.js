function tomonth(date)
{
	var res = new Date(date.getFullYear(), date.getMonth(), 01);
	return res;
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function strmonth(date)
{
	return months[date.getMonth()] + " " + date.getFullYear().toString();
}

function intmonth(date)
{
	return date.getMonth() + 12 * date.getYear();
}

var schedule = {};

function makecalendar(month)
{
	var date = new Date(month);
	
	var calendar = document.getElementById("calendar");
	calendar.innerHTML = "";
	var expand = document.getElementById("expand");
	expand.innerHTML = "";
	
	var table = document.createElement("table");
	var tr = document.createElement("tr");
	for (let day of days)
	{
		var th = document.createElement("th");
		th.innerHTML = day;
		tr.appendChild(th);
	}
	
	table.appendChild(tr);
	
	var i;
	
	tr = document.createElement("tr");
	for (i = 0; i < month.getDay(); i++)
	{
		var td = document.createElement("td");
		td.className = "black";
		tr.appendChild(td);
	}
	
	var n = intmonth(month);
	var chans;
	if (n in schedule)
		chans = schedule[n];
	else
		chans = new Array(31).fill("");
	for (let chnltext of chans)
	{
		var td = document.createElement("td");
		var div = document.createElement("div");
		div.className = "overflow";
		div.innerHTML = "<strong>" + date.getDate().toString() + "</strong><br />" + chnltext;
		div.id = date.toISOString().substring(0, 10);
		td.appendChild(div);
		td.onclick = ((e, t, d) => (() =>
		{
			expand.innerHTML = "<strong>" + d.toDateString() + "</strong><br />" + chnltext;
			var selected = document.getElementById("selected");
			if (selected) selected.id = "";
			e.id = "selected";
			location.hash = "#" + d.toISOString().substring(0, 10);
		}))(td, chnltext, new Date(date));
		tr.appendChild(td);
		date.setDate(date.getDate() + 1);
		i++;
		if (date.getMonth() != month.getMonth()) break;
		if (i >= 7)
		{
			table.appendChild(tr);
			tr = document.createElement("tr");
			i = 0;
		}
	}
	
	if (i != 0) table.appendChild(tr);
	
	for (; i < 7; i++)
	{
		var td = document.createElement("td");
		td.className = "black";
		tr.appendChild(td);
	}
	
	calendar.appendChild(table);
	
	var chooser = document.getElementById("chooser");
	chooser.innerHTML = strmonth(month);
	var backmonth = new Date(month);
	backmonth.setMonth(backmonth.getMonth() - 1);
	var fwdmonth = new Date(month);
	fwdmonth.setMonth(fwdmonth.getMonth() + 1);
	
	function move(dest)
	{
		return function()
		{
			location.hash = "#" + dest.toISOString().substring(0, 7);
			makecalendar(dest);
		}
	}
	var back = document.createElement("button");
	back.className = "left";
	back.innerHTML = "&lt;";
	back.onclick = move(backmonth);
	chooser.appendChild(back);
	
	var fwd = document.createElement("button");
	fwd.className = "right";
	fwd.innerHTML = "&gt;";
	fwd.onclick = move(fwdmonth);
	chooser.appendChild(fwd);
}

window.onload = function()
{
	const cotd = "https://home.exetel.com.au/declanhoare/channel-of-the-day/";
	var startdate = new Date(2018, 10, 15);
	var xhr = new XMLHttpRequest();
	document.getElementById("calendar").innerHTML = "Loading the calendar.";
	
	xhr.onload = function ()
	{
		var channels = xhr.responseText.split("\n");
		var i = 0;
		for (let channel of channels)
		{
			var chnldate = new Date(startdate);
			chnldate.setDate(chnldate.getDate() + i);
			var chnlmonth = tomonth(chnldate);
			var chnltext = channel.trim();
			i++;
			
			if (!(intmonth(chnlmonth) in schedule))
				schedule[intmonth(chnlmonth)] = new Array(31).fill("");
			schedule[intmonth(chnlmonth)][chnldate.getDate() - 1] = chnltext;
		}
		
		console.log(schedule);
		
		var loaddate;
		if (location.hash === "")
			loaddate = new Date();
		else
			loaddate = new Date(location.hash.substring(1));
		makecalendar(tomonth(new Date(loaddate)));
		var split = location.hash.split("-");
		if (split.length === 3)
		{
			console.log(split[2]);
			document.getElementById(split[2]).click();
		}
	}
	xhr.open("GET", cotd, true);
	xhr.send();
};


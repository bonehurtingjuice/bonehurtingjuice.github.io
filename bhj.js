try
{
	if (top.location.href.startsWith("https://bonehurtingjuice.github.io"))
		top.location.href = "http://www.geocities.jp/bonehurtingjuice/";
}
catch (e)
{
}

document.onload = function(event)
{
	top.postMessage(document.documentElement.clientHeight);
	console.log("real page posted " + document.documentElement.clientHeight);
};


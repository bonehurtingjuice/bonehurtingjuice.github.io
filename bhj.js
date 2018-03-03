try
{
	if (top.location.href.startsWith("https://bonehurtingjuice.github.io"))
		top.location.href = "http://www.geocities.jp/bonehurtingjuice/";
}
catch (e)
{
}

window.addEventListener("load", function(event)
{
	top.postMessage(document.documentElement.scrollHeight, "*");
	console.log("real page posted " + document.documentElement.scrollHeight);
}, false);


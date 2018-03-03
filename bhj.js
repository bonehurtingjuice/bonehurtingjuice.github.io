try
{
	if (top.location.href.startsWith("https://bonehurtingjuice.github.io"))
		top.location.href = "http://www.geocities.jp/bonehurtingjuice/";
}
catch (e)
{
}

function dosize(event)
{
	top.postMessage(document.documentElement.scrollHeight, "*");
}

window.addEventListener("load", dosize, false);
window.addEventListener("resize", dosize, false);

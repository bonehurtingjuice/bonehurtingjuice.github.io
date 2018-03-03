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

function play(vid)
{
	document.getElementById("youtube").innerHTML = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + vid + '?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
}


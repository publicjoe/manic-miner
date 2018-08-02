/**
 *	Audio player for Windows IE and Mozilla (with ActiveX plug-in).
 *
 *	@param url relative or absolute URL to media file
 */
function Player(url) {
	try {
		this.player = new ActiveXObject("WMPlayer.OCX.7");
	} catch (e) {
		try {
			this.player = new GeckoActiveXObject("WMPlayer.OCX.7");
		} catch (e) {
			this.player = null;
		}
	}
	try {
		this.player.settings.autoStart = false;
		this.set(url);
	} catch (e) {}
}

Player.prototype.set = function(url) {
	try {
		if (url.indexOf("http://") == -1) {
			url = document.URL.substring(0,
				document.URL.lastIndexOf("/") + 1) + url;
		}
		this.player.URL = url;
	} catch (e) {}
};

Player.prototype.play = function() {
	try {
		this.player.controls.stop();
		this.player.controls.play();
	} catch (e) {}
};

Player.prototype.stop = function() {
	try {
		this.player.controls.stop();
	} catch (e) {}
};

Player.prototype.toString = function() {
	return "Player [" + (this.player ? "enabled" : "disabled") + "]";
};
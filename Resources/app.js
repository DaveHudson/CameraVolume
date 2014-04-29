var win = Titanium.UI.createWindow({
		backgroundColor:'white'
});
 
var btn = Ti.UI.createButton({
	title: 'Open Camera',
  	top: 30,
   	width: 100,
   	height: 50	
});

win.add(btn);

btn.addEventListener('click', function(e) {
	var req = require('record');
	req.doVideo(callback);	
});
 
function callback(_video){
	var _url = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,_video);
	// save video and doing other stuff 
}

 
win.open();
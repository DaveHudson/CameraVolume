function record_video(_args) {
	// Create overlay to show when open camera
	var overlay = Ti.UI.createView({
		backgroundColor : 'transparent',
		backgroundImage : 'captureOverlayBg.png'
	});
	var imgWidescreen = Ti.UI.createImageView({
		image : 'captureWidescreenAdvise.png'
	});
	overlay.add(imgWidescreen);
	overlay.show();
		
	// https://jira.appcelerator.org/browse/TIMOB-16803 'Solution'	
	//We set a volume in order to enable user to hear the audio content of their video
	Ti.Media.appMusicPlayer.volume=1.0;
	
	// show camera
	Ti.Media.showCamera({

		success:function(event)
		{
			var id=Math.floor((Math.random()*10000)+1);
			var name = 'movie_'+id+'.mp4';
					var video = event.media;
					movieFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,name);
					movieFile.write(video);
					_args(name);
				},
				cancel:function()
				{
 
				},
				error:function(error)
				{
					// create alert
			var a = Titanium.UI.createAlertDialog({title:'Video'});
 
					// set message
			if (error.code == Titanium.Media.NO_VIDEO)
			{
				a.setMessage('Device does not have video recording capabilities');
			}
			else
			{
				a.setMessage('Unexpected error: ' + error.code);
					}
 
					// show alert
			a.show();
		},
		mediaTypes: Titanium.Media.MEDIA_TYPE_VIDEO,
		videoMaximumDuration:10000,
		videoQuality:Titanium.Media.QUALITY_HIGH,
		saveToPhotoGallery:true,
		overlay: overlay,
		allowEditing: true, // we are using this specifically so a user can trim a video on iOS once captured
	});
	
	// remove overlay after a few seconds		
	setTimeout(function() {
		overlay.hide();
	}, 3000);			
 
};
 
exports.doVideo = record_video;
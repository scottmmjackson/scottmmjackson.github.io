var shareData = document.getElementById('share-data');
var shareTarget = document.getElementById('share-target');
var messages = document.getElementById('messages');

shareTarget.addEventListener('click', function(ev) {
	if (typeof navigator.share !== 'function') {
		console.error('navigator.share not detected');
		return;
	}
	var shareDataValue = shareData.value;
	var f = new File([shareDataValue], "data.txt", {type: "text/plain"})

	navigator.share({
		files: [f]
	})
		.then(res => messages.text = 'Share Successful! '+ res.toString())
		.catch(err => messages.text = 'Share Unsuccessful! ' + err.toString());
});

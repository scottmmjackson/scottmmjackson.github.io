var shareData = document.getElementById('share-data');
var shareTarget = document.getElementById('share-target');

shareTarget.addEventListener('click', function(ev) {
	if (typeof navigator.share !== 'function') {
		console.error('navigator.share not detected');
		return;
	}
	var shareDataValue = shareData.value;
	navigator.share({
		text: shareDataValue
	});
});

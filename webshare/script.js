var shareTitle = document.getElementById('share-title');
var shareData = document.getElementById('share-data');
var shareTarget = document.getElementById('share-target');
var messages = document.getElementById('messages');
var shareFile = document.getElementById('share-file');
var shareFileTarget = document.getElementById('share-file-target');
var shareUrl = document.getElementById('share-url');
var shareUrlTarget = document.getElementById('share-url-target');

shareTarget.addEventListener('click', function(ev) {
	if (typeof navigator.share !== 'function') {
		messages.innerText = 'navigator.share not detected!'
		return;
	}
	var shareDataValue = shareData.value;
	var data = {
		text: shareDataValue
	}
	if (shareTitle.value) {
		data.title = shareTitle.value
	}
	navigator.share(data)
		.then(res => messages.innerText = 'Share Successful!')
		.catch(err => messages.innerText = 'Share Unsuccessful! ' + err.toString());
});

shareFileTarget.addEventListener('click', function(ev) {
	if (typeof navigator.share !== 'function') {
		messages.innerText = 'navigator.share not detected!'
		return;
	}
	if (shareFile.files.length === 0) {
		messages.innerText = 'no files added!'
	}
	var data = {
		files: shareFile.files
	}
	if (shareTitle.value) {
		data.title = shareTitle.value
	}
	navigator.share(data)
		.then(res => messages.innerText = 'Share Successful!')
		.catch(err => messages.innerText = 'Share Unsuccessful! ' + err.toString());
});

shareUrlTarget.addEventListener('click', function(ev) {
	if (typeof navigator.share !== 'function') {
		messages.innerText = 'navigator.share not detected!'
		return;
	}
	var data = {
		url: shareUrl.value,
	}
	if (shareTitle.value) {
		data.title = shareTitle.value
	}
	navigator.share(data)
		.then(res => messages.innerText = 'Share Successful!')
		.catch(err => messages.innerText = 'Share Unsuccessful! ' + err.toString());
});

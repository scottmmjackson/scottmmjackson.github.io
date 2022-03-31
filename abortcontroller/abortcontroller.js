const loopButton = document.getElementById('startloop');
const intervalButton = document.getElementById('startinterval');
const timeoutButton = document.getElementById('starttimeout');
const fetchButton = document.getElementById('startfetch');
const abortButton = document.getElementById('abort');
const output = document.getElementById('messages');

let abortController = new AbortController();

function timestamp() {
    return new Date().toISOString()
}

function log(message) {
    output.value += `${timestamp()}: ${message}\n`
}

function abortableDelay(timeout, abortSignal) {
    return new Promise(resolve => {
        const timeoutHandle = setTimeout(() => resolve(true), timeout);
        abortSignal.addEventListener('abort', () => {
            clearTimeout(timeoutHandle);
            resolve(false)
        })
    });
}

abortButton.onclick = () => {
    abortController.abort();
}

loopButton.onclick = async () => {
    log('Starting loop!')
    while (await abortableDelay(1000, abortController.signal)) {
        log('Fired!');
    }
    log('Aborted!')
    abortController = new AbortController();
}

intervalButton.onclick = () => {
    log('Starting interval!')
    const interval = setInterval(() => {
        log('Fired!')
    }, 1000)
    function onAbort() {
        clearInterval(interval);
        log('Aborted!');
        abortController.signal.removeEventListener('abort', this);
        abortController = new AbortController();
    }
    abortController.signal.addEventListener('abort', onAbort)
}

timeoutButton.onclick = () => {
    log('Starting timeout! 10 seconds!')
    const timeout = setTimeout(() => {
        log("Kaboom!")
    }, 10000);
    function onAbort() {
        clearTimeout(timeout);
        log('Aborted!');
        abortController.signal.removeEventListener('abort', this);
        abortController = new AbortController();
    }
    abortController.signal.addEventListener('abort', onAbort)
}

fetchButton.onclick = async () => {
    log('Starting fetch! This is going to resolve pretty quickly if the connection is not throttled!');
    try {
        await fetch('index.html', {
            signal: abortController.signal
        });
        log('Fetched!')
    } catch (e) {
        log(e);
    }
    abortController = new AbortController();
}

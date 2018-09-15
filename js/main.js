const stopwatch = document.getElementById('reloj');
const playPauseBtn = document.getElementById('play_pause');
const secondsSphere = document.getElementById('seconds_sphere');
const stopBtn = document.getElementById('stop');

let stopwatchInterval;
let runningTime = 0;

const playPause = () => {
	const isPause = !playPauseBtn.className.endsWith('play');

	if (isPause) {
		playPauseBtn.classList.replace(
			'buttons__play-pause--paused',
			'buttons__play-pause--play'
		);
		start();
	} else {
		playPauseBtn.classList.replace(
			'buttons__play-pause--play',
			'buttons__play-pause--paused'
		);
		pause();
	}
};

const start = () => {
	if (secondsSphere.classList.contains('stop')) {
		secondsSphere.classList.add('animated');
		secondsSphere.classList.remove('stop');
	} else {
		secondsSphere.classList.add('animated');
	}
	let startTime = Date.now() - runningTime;
	stopwatchInterval = setInterval(() => {
		runningTime = Date.now() - startTime;
		stopwatch.textContent = calculateTime(runningTime);
	}, 1000);
};

const pause = () => {
	secondsSphere.classList.remove('animated');
	clearInterval(stopwatchInterval);
};

const stop = () => {
	secondsSphere.classList.remove('animated');
	secondsSphere.classList.add('stop');
	runningTime = 0;
	playPauseBtn.classList.replace(
		'buttons__play-pause--play',
		'buttons__play-pause--paused'
	);
	clearInterval(stopwatchInterval);
	stopwatch.textContent = '00:00';
};

const calculateTime = (runningTime) => {
	const totalSeconds = Math.floor(runningTime / 1000);
	const totalMinutes = Math.floor(totalSeconds / 60);

	const displaySeconds = (totalSeconds % 60).toString().padStart(2, '0');
	const displayMinutes = totalMinutes.toString().padStart(2, '0');

	return `${displayMinutes}:${displaySeconds}`;
};

playPauseBtn.addEventListener('click', playPause);
stopBtn.addEventListener('click', stop);

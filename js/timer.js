document.addEventListener('DOMContentLoaded', function () {
    let pomodoroInterval;
    let currentPhase = 'work';
    let currentRound = 0;
    let remainingTime = 0;
    let totalRounds = 0;
    let workDuration = 0;
    let breakDuration = 0;

    const pomodoroStatus = document.getElementById('pomodoroStatus');
    const startButton = document.getElementById('startPomodoro');
    const stopButton = document.getElementById('stopPomodoro');

    function updatePomodoroStatus() {
        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;
        pomodoroStatus.textContent = `Round ${currentRound} of ${totalRounds} - ${currentPhase === 'work' ? 'Work' : 'Break'}: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function startPomodoroTimer() {
        const workInput = parseInt(document.getElementById('workTime').value, 10) || 25;
        const breakInput = parseInt(document.getElementById('breakTime').value, 10) || 5;
        totalRounds = parseInt(document.getElementById('repetitions').value, 10) || 4;

        workDuration = workInput * 60;
        breakDuration = breakInput * 60;
        currentRound = 1;
        currentPhase = 'work';
        remainingTime = workDuration;
        updatePomodoroStatus();

        pomodoroInterval = setInterval(() => {
            remainingTime--;
            if (remainingTime < 0) {
                if (currentPhase === 'work') {
                    currentPhase = 'break';
                    remainingTime = breakDuration;
                } else {
                    if (currentRound < totalRounds) {
                        currentRound++;
                        currentPhase = 'work';
                        remainingTime = workDuration;
                    } else {
                        clearInterval(pomodoroInterval);
                        pomodoroStatus.textContent = 'Timer finished!';
                        return;
                    }
                }
            }
            updatePomodoroStatus();
        }, 1000);
    }

    startButton.addEventListener('click', startPomodoroTimer);
    stopButton.addEventListener('click', function () {
        clearInterval(pomodoroInterval);
        pomodoroStatus.textContent = 'Timer stopped.';
    });
});

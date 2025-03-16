// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

const updateTheme = (isDark) => {
    htmlElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Initialize theme
const storedTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
updateTheme(storedTheme === 'dark');

themeToggle.addEventListener('click', () => updateTheme(!htmlElement.classList.contains('dark')));

// Pomodoro Timer Class
class Timer {
    constructor() {
        this.time = 1500; // 25 minutes
        this.interval = null;
        this.isRunning = false;
    }

    start() {
        if (!this.isRunning) {
            this.interval = setInterval(() => this.tick(), 1000);
            this.isRunning = true;
        }
    }

    tick() {
        if (this.time > 0) {
            this.time--;
            this.updateDisplay();
        } else {
            this.reset();
        }
    }

    reset() {
        clearInterval(this.interval);
        this.time = 1500;
        this.isRunning = false;
        this.updateDisplay();
    }

    updateDisplay() {
        const minutes = Math.floor(this.time / 60);
        const seconds = this.time % 60;
        document.querySelector('.timer-display').textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

// Initialize Timer
const pomodoroTimer = new Timer();
document.querySelectorAll('.timer-control').forEach(btn => {
    btn.addEventListener('click', () => pomodoroTimer.start());
});
document.querySelector('.timer-reset').addEventListener('click', () => pomodoroTimer.reset());
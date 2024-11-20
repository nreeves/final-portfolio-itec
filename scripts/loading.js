const ANIMATION_CONFIG = {
    ASCII: {
        PENDING: '░',
        DONE: '▓'
    },
    LOADING_MESSAGES: [
        'Loading system files ...',
        'Loading user files ...',
        'Loading user skills ...',
        'Loading user portfolio ...',
        'Displaying portfolio ...'
    ],
    TIMING: {
        DOT_UPDATE: 500,
        PROGRESS_UPDATE: 250
    },
    MIN_WIDTH: 350
};

class TerminalLoader {
    constructor() {
        this.loadingBar = document.querySelector('.loading-bar');
        this.fill = document.getElementById('fill');
        this.loadingSection = document.getElementById('loading');
        this.commandSection = document.getElementById('command-UI');
        this.titleHeader = document.getElementById('load-ascii');
        this.loadingText = document.getElementById('loading-text');

        this.progress = 0;
        this.currentWidth = 0;
        this.characterWidth = this.getCharacterWidth();
        this.fillWidth = this.getFillWidth();

        this.textInterval = null;
        this.progressInterval = null;
    }

    getCharacterWidth() {
        const char = document.createElement('div');
        char.innerHTML = ANIMATION_CONFIG.ASCII.PENDING;
        char.style.position = 'absolute';
        char.style.visibility = 'hidden';
        document.body.appendChild(char);
        const width = char.clientWidth;
        char.remove();
        return width;
    }

    getFillWidth() {
        return Math.max(window.innerWidth * 0.5, ANIMATION_CONFIG.MIN_WIDTH);
    }

    initUI() {
        this.titleHeader.style.cssText = 'display: block; width: 600px;';
        this.loadingText.innerHTML = 'Loading ...';
        this.commandSection.style.display = 'none';
        this.fill.style.maxWidth = `${this.fillWidth}px`;

        const charCount = Math.floor(this.fillWidth / this.characterWidth);
        this.fill.innerHTML = ANIMATION_CONFIG.ASCII.PENDING.repeat(charCount);
    }

    updateLoadingText() {
        this.textInterval = setInterval(() => {
            const currentText = this.loadingText.innerHTML;
            if (currentText.endsWith('....')) {
                const randomMessage = ANIMATION_CONFIG.LOADING_MESSAGES[
                    Math.floor(Math.random() * ANIMATION_CONFIG.LOADING_MESSAGES.length)
                ];
                this.loadingText.innerHTML = randomMessage;
            } else {
                this.loadingText.innerHTML += '.';
            }
        }, ANIMATION_CONFIG.TIMING.DOT_UPDATE);
    }

    updateProgress() {
        this.progressInterval = setInterval(() => {
            this.progress += Math.floor(Math.random() * 10);
            if (this.currentWidth >= this.fillWidth) {
                this.completeLoading();
            } else {
                this.updateLoadingBar();
            }
        }, ANIMATION_CONFIG.TIMING.PROGRESS_UPDATE);
    }

    updateLoadingBar() {
        this.currentWidth += (this.progress / 100) * this.fillWidth;
        const progressText = ANIMATION_CONFIG.ASCII.DONE.repeat(this.progress);
        this.fill.prepend(document.createTextNode(progressText));
    }

    completeLoading() {
        const progressText = ANIMATION_CONFIG.ASCII.DONE.repeat(this.progress);
        this.fill.prepend(document.createTextNode(progressText));

        this.loadingSection.style.display = 'none';
        this.commandSection.style.display = 'inline-block';

        const input = document.getElementById('cinput');
        if (input) input.focus();

        this.clearIntervals();
    }

    clearIntervals() {
        clearInterval(this.textInterval);
        clearInterval(this.progressInterval);
    }

    start() {
        this.initUI();
        this.updateLoadingText();
        this.updateProgress();
    }
}

const loader = new TerminalLoader();
loader.start();
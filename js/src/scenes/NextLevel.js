import Phaser from 'phaser';
import Button from '../objects/Button';

const padding = 10;

class NextLevel extends Phaser.Scene {
	constructor() {
		super('nextlevel');
	}

	preload() {
        this.cameras.main.setBackgroundColor('#495464');
    }
    
    init(data) {
        // Music
        this.music = data.music;
        // Sound
        this.sfx = data.sfx;
        // Score
        this.score = data.score;
        // Level
        this.level = data.level ? data.level : 1;
	}

	create() {
        // Screen
        const width = window.innerWidth * window.devicePixelRatio / 2;
        const height = window.innerHeight * window.devicePixelRatio / 2;
        // Border
        this.add.rectangle(width, height, width, Math.max(height, 250), 0xE8E8E8);
        // Title
        this.title = this.add.text(width, height - 2 * (36 + padding), "End of Level " + this.level, {
            fill: '#495464',
            fontSize: '24px',
        });
        this.title.x = this.title.x - this.title.width / 2;
        this.title.y = this.title.y - this.title.height / 2;
        // Score
        this.title = this.add.text(width, height - (46 + padding), "Score: " + this.score, {
            fill: '#495464',
            fontSize: '16px',
        });
        this.title.x = this.title.x - this.title.width / 2;
        this.title.y = this.title.y - this.title.height / 2;
        // Start button
        var startButton = new Button(this, width, height - padding, "Start Level " + (this.level + 1));
        startButton.on('pointerdown', function () {
            this.startLevel();
        }, this);
        // Quit
        var quitButton = new Button(this, width, height + (36 + padding), "Quit");
        quitButton.on('pointerdown', function () {
            this.quitGame();
        }, this);
    }

    startLevel() {
        this.scene.start('game', {
            music: this.music,
            sfx: this.sfx,
            score: this.score,
            level: (this.level + 1),
        });
        this.scene.stop();
    }

    quitGame() {
        this.scene.start('title', {
            music: this.music,
            sfx: this.sfx,
        });
        this.scene.stop();
    }
}

export default NextLevel;

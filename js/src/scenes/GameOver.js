import Phaser from 'phaser';
import Button from '../objects/Button';

const padding = 10;

class GameOver extends Phaser.Scene {
	constructor() {
		super('gameover');
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
	}

	create() {
        // Screen
        const width = window.innerWidth / 2;
        const height = window.innerHeight / 2;
        // Border
        this.add.rectangle(width, height, width, Math.max(height, 250), 0xE8E8E8);
        // Title
        this.title = this.add.text(width, height - 2 * (36 + padding), "Game Over", {
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
        var startButton = new Button(this, width, height - padding, "New Game");
        startButton.on('pointerdown', function () {
            this.startGame();
        }, this);
        // Main menu
        var mainMenuButton = new Button(this, width, height + (36 + padding), "Main Menu");
        mainMenuButton.on('pointerdown', function () {
            this.mainMenu();
        }, this);
    }

    startGame() {
        this.scene.start('game', {
            music: this.music,
            sfx: this.sfx,
        });
        this.scene.stop();
    }

    mainMenu() {
        this.scene.start('title', {
            music: this.music,
            sfx: this.sfx,
        });
        this.scene.stop();
    }
}

export default GameOver;

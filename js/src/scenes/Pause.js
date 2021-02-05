import Phaser from 'phaser';
import Button from '../objects/Button';
import buttonAnims from '../anims/ButtonAnims';

const padding = 10;

class Pause extends Phaser.Scene {
	constructor() {
		super('pause');
    }
    
    init(data) {
		this.music = data.music;
		this.sfx = data.sfx;
	}

	preload() {
        buttonAnims(this.anims);
        this.cameras.main.setBackgroundColor('#495464');
	}

	create() {
        // Screen
        const width = window.innerWidth / 2;
        const height = window.innerHeight / 2;
        // Border
        this.add.rectangle(width, height, width, Math.max(height, 250), 0xE8E8E8);
        // Title
        this.title = this.add.text(width, height - 2 * (36 + padding), "Paused", {
            fill: '#495464',
            fontSize: '24px',
        });
        this.title.x = this.title.x - this.title.width / 2;
        this.title.y = this.title.y - this.title.height / 2;
        // Resume button
        var resumeButton = new Button(this, width, height - (36 + padding), "Resume");
        resumeButton.on('pointerdown', function () {
            this.startGame();
        }, this);
        // Music checkbox
        var musicText = this.add.text(0, 0, 'Music', {
            fill: '#495464',
        });
        musicText.x = width - musicText.width;
        musicText.y = height - (musicText.height / 2);
        this.musicButton = new Button(this, width + 16, height);
        this.musicButton.on('pointerdown', this.musicToggle, this);
        if (this.music.on) {
            this.musicButton.check();
        }
        // Music checkbox
        var sfxText = this.add.text(0, 0, 'Sound', {
            fill: '#495464',
        });
        sfxText.x = width - sfxText.width;
        sfxText.y = height - (sfxText.height / 2) + (16 + padding);
        this.sfxButton = new Button(this, width  + 16, height + (16 + padding));
        this.sfxButton.on('pointerdown', this.sfxToggle, this);
        if (this.sfx.on) {
            this.sfxButton.check();
        }
        // Quit button
        var quitButton = new Button(this, width, height + (60 + padding), "Quit");
        quitButton.on('pointerdown', function () {
            this.quitGame();
        }, this);
    }
    
    musicToggle() {
        this.music.on = !this.music.on;
        if (this.music.on) {
            this.musicButton.check();
            this.music.backgroundMusic.play();
        } else {
            this.musicButton.uncheck();
            this.music.backgroundMusic.stop();
        }
    }

    sfxToggle() {
        this.sfx.on = !this.sfx.on;
        if (this.sfx.on) {
            this.sfxButton.check();
        } else {
            this.sfxButton.uncheck();
        }
    }

    startGame() {
        this.scene.resume('game');
        this.scene.stop('pause');
    }

    quitGame() {
        this.scene.stop('game');
        this.scene.start('title', {
            music: this.music,
            sfx: this.sfx,
        });
        this.scene.stop('pause');
    }
}

export default Pause;

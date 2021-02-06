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
        this.width = window.innerWidth / 2;
        this.height = window.innerHeight / 2;
        // Border
        this.border = this.add.rectangle(this.width, this.height, this.width, Math.max(this.height, 250), 0xE8E8E8);
        // Title
        this.title = this.add.text(this.width, this.height - 2 * (36 + padding), "Paused", {
            fill: '#495464',
            fontSize: '24px',
        });
        this.title.x = this.title.x - this.title.width / 2;
        this.title.y = this.title.y - this.title.height / 2;
        // Resume button
        this.resumeButton = new Button(this, this.width, this.height - (36 + padding), "Resume");
        this.resumeButton.on('pointerdown', function () {
            this.startGame();
        }, this);
        // Music checkbox
        this.musicText = this.add.text(0, 0, 'Music', {
            fill: '#495464',
        });
        this.musicText.x = this.width - this.musicText.width;
        this.musicText.y = this.height - (this.musicText.height / 2);
        this.musicButton = new Button(this, this.width + 16, this.height);
        this.musicButton.on('pointerdown', this.musicToggle, this);
        if (this.music.on) {
            this.musicButton.check();
        }
        // Music checkbox
        this.sfxText = this.add.text(0, 0, 'Sound', {
            fill: '#495464',
        });
        this.sfxText.x = this.width - this.sfxText.width;
        this.sfxText.y = this.height - (this.sfxText.height / 2) + (16 + padding);
        this.sfxButton = new Button(this, this.width  + 16, this.height + (16 + padding));
        this.sfxButton.on('pointerdown', this.sfxToggle, this);
        if (this.sfx.on) {
            this.sfxButton.check();
        }
        // Quit button
        this.quitButton = new Button(this, this.width, this.height + (60 + padding), "Quit");
        this.quitButton.on('pointerdown', function () {
            this.quitGame();
        }, this);
        // Resize
        this.game.eventEmitter.on('resize', this.resize, this);
    }

    resize() {
        // Screen
        this.width = window.innerWidth / 2;
        this.height = window.innerHeight / 2;
        // Border
        this.border.destroy();
        this.border = this.add.rectangle(this.width, this.height, this.width, Math.max(this.height, 250), 0xE8E8E8);
        this.border.setDepth(-1);
        // Title
        this.title.x = this.width - this.title.width / 2;
        this.title.y = this.height - 2 * (36 + padding) - this.title.height / 2;
        // Resume button
        this.resumeButton.move(this.width, this.height - (36 + padding));
        // Music checkbox
        this.musicText.x = this.width - this.musicText.width;
        this.musicText.y = this.height - (this.musicText.height / 2);
        this.musicButton.x = this.width + 16;
        this.musicButton.y = this.height;
        // Music checkbox
        this.sfxText.x = this.width - this.sfxText.width;
        this.sfxText.y = this.height - (this.sfxText.height / 2) + (16 + padding);
        this.sfxButton.x = this.width  + 16;
        this.sfxButton.y = this.height + (16 + padding);
        // Quit button
        this.quitButton.move(this.width, this.height + (60 + padding));
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

import Phaser from 'phaser';
import Button from '../objects/Button';
import buttonAnims from '../anims/ButtonAnims';

const padding = 10;

class Title extends Phaser.Scene {
	constructor() {
		super('title');
	}

	preload() {
        buttonAnims(this.anims);
        this.cameras.main.setBackgroundColor('#495464');
	}

	create() {
        // Screen
        const width = window.innerWidth * window.devicePixelRatio / 2;
        const height = window.innerHeight * window.devicePixelRatio / 2;
        // Border
        this.add.rectangle(width, height, width, width, 0xE8E8E8);
        // Start button
        var startButton = new Button(this, width, height - (36 + padding), "Start");
        startButton.on('pointerdown', function () {
            this.scene.start('game');
            this.scene.stop();
        }, this);
        // Music checkbox
        this.music = true;
        var musicText = this.add.text(0, 0, 'Music', {
            fill: '#495464',
        });
        musicText.x = width - musicText.width;
        musicText.y = height - (musicText.height / 2);
        this.musicButton = new Button(this, width + 16, height);
        this.musicButton.on('pointerdown', this.musicToggle, this);
        this.musicButton.check();
        // Music checkbox
        this.sfx = true;
        var sfxText = this.add.text(0, 0, 'Sound', {
            fill: '#495464',
        });
        sfxText.x = width - sfxText.width;
        sfxText.y = height - (sfxText.height / 2) + (16 + padding);
        this.sfxButton = new Button(this, width  + 16, height + (16 + padding));
        this.sfxButton.on('pointerdown', this.sfxToggle, this);
        this.sfxButton.check();
    }
    
    musicToggle() {
        this.music = !this.music;
        if (this.music) {
            this.musicButton.check();
        } else {
            this.musicButton.uncheck();
        }
    }

    sfxToggle() {
        this.sfx = !this.sfx;
        if (this.sfx) {
            this.sfxButton.check();
        } else {
            this.sfxButton.uncheck();
        }
    }
}

export default Title;

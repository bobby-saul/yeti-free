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
    
    init(data) {
        if (data.music) {
            this.music = data.music;
        } else {
            this.music = {
                on: true,
                backgroundMusic: this.sound.add('background', {
                    loop: true
                })
            }
            this.music.backgroundMusic.play();
        }
        // Sound
        if (data.sfx) {
            this.sfx = data.sfx;
        } else {
            this.sfx = {
                on: true,
                chewSound: this.sound.add('chew'),
                roarSound: this.sound.add('roar')
            };
        }
	}

	create() {
        // Screen
        const width = window.innerWidth / 2;
        const height = window.innerHeight / 2;
        // Border
        this.add.rectangle(width, height, width, Math.max(height, 250), 0xE8E8E8);
        // Title
        this.title = this.add.text(width, height - 2 * (36 + padding), "Yeti Free", {
            fill: '#495464',
            fontSize: '24px',
        });
        this.title.x = this.title.x - this.title.width / 2;
        this.title.y = this.title.y - this.title.height / 2;
        // Start button
        var startButton = new Button(this, width, height - (36 + padding), "Start");
        startButton.on('pointerdown', function () {
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
        // Sound checkbox
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
        this.scene.start('game', {
            music: this.music,
            sfx: this.sfx,
        });
        this.scene.stop();
    }
}

export default Title;

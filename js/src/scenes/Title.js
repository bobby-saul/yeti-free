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
                roarSound: this.sound.add('roar'),
                scream: this.sound.add('scream'),
                steps: this.sound.add('steps', {
                    volume: 0.25,
                    loop: true
                }),
            };
        }
	}

	create() {
        // Screen
        this.width = window.innerWidth / 2;
        this.height = window.innerHeight / 2;
        // Border
        this.border = this.add.rectangle(this.width, this.height, this.width, Math.max(this.height, 250), 0xE8E8E8);
        // Title
        this.title = this.add.text(this.width, this.height - 2 * (36 + padding), "Yeti Free", {
            fill: '#495464',
            fontSize: '24px',
        });
        this.title.x = this.title.x - this.title.width / 2;
        this.title.y = this.title.y - this.title.height / 2;
        // Start button
        this.startButton = new Button(this, this.width, this.height - (36 + padding), "Start");
        this.startButton.on('pointerdown', function () {
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
        // Sound checkbox
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
        // Start button
        this.startButton.move(this.width, this.height - (36 + padding));
        // Music checkbox
        this.musicText.x = this.width - this.musicText.width;
        this.musicText.y = this.height - (this.musicText.height / 2);
        this.musicButton.x = this.width + 16;
        this.musicButton.y = this.height;
        // Sound checkbox
        this.sfxText.x = this.width - this.sfxText.width;
        this.sfxText.y = this.height - (this.sfxText.height / 2) + (16 + padding);
        this.sfxButton.x = this.width  + 16;
        this.sfxButton.y = this.height + 16 + padding;
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

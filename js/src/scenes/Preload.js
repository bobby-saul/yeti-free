import Phaser from 'phaser'

class Preload extends Phaser.Scene {
	constructor() {
		super('preload');
	}

	preload() {
		this.load.spritesheet('yeti', 'assets/yeti-sprite.png', {
			frameWidth: 32,
			frameHeight: 32
		});
		this.load.spritesheet('skier1', 'assets/skier-1-sprite.png', {
			frameWidth: 32,
			frameHeight: 32
		});
		this.load.spritesheet('skier2', 'assets/skier-2-sprite.png', {
			frameWidth: 32,
			frameHeight: 32
		});
		this.load.spritesheet('snowman', 'assets/snowman.png', {
			frameWidth: 32,
			frameHeight: 32
		});
		this.load.spritesheet('tree', 'assets/tree.png', {
			frameWidth: 32,
			frameHeight: 32
		});
		this.load.spritesheet('ice', 'assets/ice.png', {
			frameWidth: 32,
			frameHeight: 32
		});
		this.load.spritesheet('rock1', 'assets/snow-rock-1.png', {
			frameWidth: 16,
			frameHeight: 16
		});
		this.load.spritesheet('rock2', 'assets/snow-rock-2.png', {
			frameWidth: 16,
			frameHeight: 16
		});
		this.load.spritesheet('line', 'assets/line.png', {
			frameWidth: 4,
			frameHeight: 4
		});
		this.load.spritesheet('button', 'assets/button.png', {
			frameWidth: 16,
			frameHeight: 16
		});
		this.load.audio('background', 'sound/yeti_free.mp3');
		this.load.audio('chew', 'sound/chew.mp3');
		this.load.audio('roar', 'sound/roar.mp3');
		this.load.audio('steps', 'sound/steps.mp3');
	}

	create() {
		this.scene.start('title');
	}
}

export default Preload;
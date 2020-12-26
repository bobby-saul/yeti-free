import Phaser from 'phaser'

class Preload extends Phaser.Scene{
	constructor(){
		super('preload');
	}

	preload(){
		this.load.spritesheet('yeti', 'assets/yeti-sprite.png', {
			frameWidth: 32,
			frameHeight: 32 
		});
	}

	create(){
		this.scene.start('game');
	}
}

export default Preload;
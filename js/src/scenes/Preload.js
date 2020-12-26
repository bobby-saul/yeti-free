import Phaser from 'phaser'

class Preload extends Phaser.Scene{
	constructor(){
		super('preload');
	}

	preload(){
		this.load.image('yeti', 'assets/Yeti.png');
	}

	create(){
		this.scene.start('game');
	}
}

export default Preload;
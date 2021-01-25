import Phaser from 'phaser'
import yetiAnims from '../anims/YetiAnims';
import skierAnims from '../anims/skierAnims';
import Boundaries from '../objects/Boundaries';
import GroundGroup from '../objects/GroundGroup';
import Yeti from '../objects/Yeti';
import SkierGroup from '../objects/SkierGroup';

const gameSize = [2000, 2000];

class Game extends Phaser.Scene {
	constructor() {
		super('game');
		this.gameSize = gameSize;
	}

	preload() {
		this.cursors = this.input.keyboard.addKeys({
			'up': Phaser.Input.Keyboard.KeyCodes.UP,
			'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
			'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
			'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
			'w': Phaser.Input.Keyboard.KeyCodes.W,
			'a': Phaser.Input.Keyboard.KeyCodes.A,
			's': Phaser.Input.Keyboard.KeyCodes.S,
			'd': Phaser.Input.Keyboard.KeyCodes.D
		});
	}

	create() {
		// Yeti
		yetiAnims(this.anims);
		this.yeti = new Yeti(this, 0, 0);
		this.yeti.anims.play('yeti-front-idle');
		// Camera
		this.cameras.main.setBackgroundColor('#F4F4F2');
		this.cameras.main.startFollow(this.yeti, true);
		// Ground Objects
		this.groundObjects = new GroundGroup(this.physics.world, this);
		// Boundaries
		const boundaries = new Boundaries(this.physics.world, this);
		// Skiers
		skierAnims(this.anims);
		this.skiers = new SkierGroup(this.physics.world, this, 5);
		// Collisions
		this.physics.add.collider(this.yeti, this.skiers, this.eatSkier);
		this.physics.add.collider(this.yeti, this.groundObjects, this.yetiFall);
		this.physics.add.collider(this.yeti, boundaries, this.yetiFall);
		this.physics.add.collider(this.skiers, this.groundObjects, this.skierFall);
		this.physics.add.collider(this.skiers, this.skiers, this.skierFall);
	}

	yetiFall (yeti) {
		yeti.fall();
	}

	skierFall (skier1, skier2) {
		skier1.fall();
		if (typeof skier2.skierType === "number") {
			skier2.fall();
		}
	}

	eatSkier(yeti, skier) {
		yeti.eat(skier);
	}

	update() {
		this.yeti.update(this.cursors);
		this.skiers.update();
	}
}

export default Game;

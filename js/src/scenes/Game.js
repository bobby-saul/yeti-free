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

	init(data) {
		this.music = data.music;
		this.sfx = data.sfx;
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
		this.gameOver = false;
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
		this.physics.add.collider(this.yeti, this.skiers, this.eatSkier, null, this);
		this.physics.add.collider(this.yeti, this.groundObjects, this.yetiFall, null, this);
		this.physics.add.collider(this.yeti, boundaries, this.yetiFall, null, this);
		this.physics.add.collider(this.skiers, this.groundObjects, this.skierCollision, null, this);
		this.physics.add.collider(this.skiers, this.skiers);
	}

	yetiFall(yeti, object) {
		yeti.fall(object);
	}

	eatSkier(yeti, skier) {
		yeti.eat(skier);
	}

	skierCollision(skier) {
		skier.collision();
	}

	pauseGame() {
        this.scene.pause();
        this.scene.launch('pause', {
            music: this.music,
            sfx: this.sfx
        });
    }

	endGame() {
		// Text
		this.gameOver = true;
		var gameOverText = this.add.text(0, 0, 'Game Over', {
            fontSize: '36px',
            fill: '#000',
		});
		var x = this.yeti.x - (gameOverText.width / 2);
		var y = this.yeti.y - (gameOverText.height / 2);
		gameOverText.x = x;
		gameOverText.y = y;
		// Yeti
		this.yeti.setVelocity(0);
		this.yeti.anims.play('yeti-front-idle', true);
		// Skiers
		this.skiers.getChildren().forEach(skier => {
            skier.setVelocity(0);
        });
	}

	update() {
		if (!this.gameOver) {
			this.skiers.update();
			this.yeti.update(this.cursors);
		}
	}
}

export default Game;

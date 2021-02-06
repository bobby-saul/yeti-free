import Phaser from 'phaser'
import yetiAnims from '../anims/YetiAnims';
import skierAnims from '../anims/skierAnims';
import Boundaries from '../objects/Boundaries';
import GroundGroup from '../objects/GroundGroup';
import Yeti from '../objects/Yeti';
import SkierGroup from '../objects/SkierGroup';

const gameSize = [2000, 2000];
const maxLevel = 10;

class Game extends Phaser.Scene {
	constructor() {
		super('game');
		this.gameSize = gameSize;
	}

	init(data) {
		this.music = data.music;
		this.sfx = data.sfx;
		this.level = data.level ? data.level : 1;
		this.score = data.score ? data.score : 0;
		this.levelTime = 1000 * 45;
	}

	preload() {
		this.pointer = this.input.activePointer;
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
		this.skiers = new SkierGroup(this.physics.world, this);
		// Collisions
		this.physics.add.collider(this.yeti, this.skiers, this.eatSkier, null, this);
		this.physics.add.collider(this.yeti, this.groundObjects, this.yetiFall, null, this);
		this.physics.add.collider(this.yeti, boundaries, this.yetiFall, null, this);
		this.physics.add.collider(this.skiers, this.groundObjects, this.skierCollision, null, this);
		this.physics.add.collider(this.skiers, this.skiers);
		// Timer
		this.timer = this.time.delayedCall(this.levelTime, this.endLevel, [], this);
		// Pause
		this.input.keyboard.on('keydown-P', this.pauseGame, this);
	}

	yetiFall(yeti, object) {
		yeti.fall(object);
	}

	eatSkier(yeti, skier) {
		if (this.sfx.on) {
			this.sfx.scream.play();
		}
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
	
	endLevel() {
		if (this.level + 1 > maxLevel) {
			this.endGame();
			return;	
		}
		this.scene.start('nextlevel', {
			music: this.music,
			sfx: this.sfx,
			score: this.score,
			level: this.level,
		});
		this.scene.stop();	
	}

	endGame() {
        this.scene.start('gameover', {
            music: this.music,
			sfx: this.sfx,
			score: this.score
		});
		this.scene.stop();
	}

	update() {
		if (!this.gameOver) {
			this.skiers.update();
			this.yeti.update(this.cursors);
		}
	}
}

export default Game;

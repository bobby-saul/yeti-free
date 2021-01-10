import Phaser from 'phaser'

const frameRate = 16;
const maxAssetDensity = 0.00005;
const minAssetDensity = 0.000005;
const assetTypes = [
	'rock1',
	'rock2',
	'ice',
	'tree',
	'snowman',
];
const gameSize = [2000, 2000];

class Game extends Phaser.Scene {
	constructor() {
		super('game');
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
		this.yeti = this.physics.add.sprite(0, 0, 'yeti');
		this.yeti.body.height = 6;
		this.yeti.body.offset.y = 26;
		// Camera
		this.cameras.main.setBackgroundColor('#F4F4F2');
		this.cameras.main.startFollow(this.yeti, true);
		// Assets
		this.assets = this.physics.add.group();
		this.addAssets();
		// Boundaries
		const boundaries = this.physics.add.staticGroup();
		const top = boundaries.create(0, gameSize[1] / -2, 'line');
		top.setScale(gameSize[0] / 4, 1).refreshBody().setDepth(-gameSize[0]).setAlpha(0.5);
		const bottom = boundaries.create(0, gameSize[1] / 2, 'line');
		bottom.setScale(gameSize[0] / 4, 1).refreshBody().setDepth(-gameSize[0]).setAlpha(0.5);
		const left = boundaries.create(gameSize[0] / -2, 0, 'line');
		left.setScale(1, gameSize[1] / 4).refreshBody().setDepth(-gameSize[0]).setAlpha(0.5);
		const right = boundaries.create(gameSize[0] / 2, 0, 'line');
		right.setScale(1, gameSize[1] / 4).refreshBody().setDepth(-gameSize[0]).setAlpha(0.5);
		// Collisions
		this.physics.add.collider(this.yeti, this.assets, this.yetiFall, null, this);
		this.physics.add.collider(this.yeti, top);
		this.physics.add.collider(this.yeti, bottom);
		this.physics.add.collider(this.yeti, left);
		this.physics.add.collider(this.yeti, right);

		// Yeti animations
		this.anims.create({
			key: 'yeti-front-idle',
			frames: [{ key: 'yeti', frame: 0 }],
			frameRate: frameRate
		});
		this.anims.create({
			key: 'yeti-front-walk',
			frames: this.anims.generateFrameNumbers('yeti', {
				frames: [1, 2, 1, 3]
			}),
			frameRate: frameRate,
			repeat: -1
		});
		this.anims.create({
			key: 'yeti-side-idle',
			frames: [{ key: 'yeti', frame: 4 }],
			frameRate: frameRate
		});
		this.anims.create({
			key: 'yeti-side-walk',
			frames: this.anims.generateFrameNumbers('yeti', {
				frames: [4, 5, 4, 6]
			}),
			frameRate: frameRate,
			repeat: -1
		});
		this.anims.create({
			key: 'yeti-back-idle',
			frames: [{ key: 'yeti', frame: 7 }],
			frameRate: frameRate
		});
		this.anims.create({
			key: 'yeti-back-walk',
			frames: this.anims.generateFrameNumbers('yeti', {
				frames: [8, 9, 8, 10]
			}),
			frameRate: frameRate,
			repeat: -1
		});
		this.yeti.anims.play('yeti-front-idle');
		// Skier 1 animations
		this.anims.create({
			key: 'skier-1-front',
			frames: [{ key: 'skier1', frame: 0 }],
		});
		this.anims.create({
			key: 'skier-1-side',
			frames: [{ key: 'skier1', frame: 1 }],
		});
		// Skier 2 animations
		this.anims.create({
			key: 'skier-2-front',
			frames: [{ key: 'skier2', frame: 0 }],
		});
		this.anims.create({
			key: 'skier-2-front-pizza',
			frames: [{ key: 'skier2', frame: 1 }],
		});
		this.anims.create({
			key: 'skier-2-side',
			frames: [{ key: 'skier2', frame: 2 }],
		});
	}

	addAssets() {
		const minAssets = gameSize[0] * gameSize[1] * minAssetDensity;
		const maxAssets = gameSize[0] * gameSize[1] * maxAssetDensity - minAssets;
		const numberOfAssets = Math.floor(Math.random() * maxAssets) + minAssets;

		for (let index = 0; index < numberOfAssets; index++) {
			const x = Math.floor(Math.random() * gameSize[0]) - (gameSize[0] / 2);
			const y = Math.floor(Math.random() * gameSize[1]) - (gameSize[1] / 2);
			const assetType = Math.floor(Math.random() * assetTypes.length);
			const asset = this.assets.create(x, y, assetTypes[assetType]);
			asset.body.immovable = true;
			asset.setDepth(y);
			switch (assetType) {
				case 0:
				case 1:
					asset.body.height = 6;
					asset.body.offset.y = 10;
					break;
				case 2:
					asset.body.height = 14;
					asset.body.offset.y = 10;
					break;
				case 3:
				case 4:
					asset.body.height = 6;
					asset.body.offset.y = 26;
				default:
					break;
			}
		}
	}

	yetiFall(yeti, asset) {
		yeti.setVelocity(0);
		asset.setVelocity(0);
	}

	update() {
		let speed = 160;
		const cursors = this.cursors;
		const yeti = this.yeti;
		const leftDown = cursors.left.isDown || cursors.a.isDown;
		const rightDown = cursors.right.isDown || cursors.d.isDown;
		const upDown = cursors.up.isDown || cursors.w.isDown;
		const downDown = cursors.down.isDown || cursors.s.isDown;

		if (leftDown) {
			yeti.anims.play('yeti-side-walk', true);
			yeti.scaleX = -1;
			yeti.body.offset.x = 28;
			yeti.body.width = 18;
			if (upDown) {
				speed = Math.sqrt(Math.pow(speed, 2) / 2);
				yeti.setVelocity(speed * -1, speed * -1);
				yeti.setDepth(yeti.body.y - 6);
			}
			else if (downDown) {
				speed = Math.sqrt(Math.pow(speed, 2) / 2);
				yeti.setVelocity(speed * -1, speed);
				yeti.setDepth(yeti.body.y - 6);
			}
			else {
				yeti.setVelocity(speed * -1, 0);
			}
		} else if (rightDown) {
			yeti.anims.play('yeti-side-walk', true);
			yeti.body.offset.x = 8;
			yeti.body.width = 18;
			yeti.scaleX = 1
			if (upDown) {
				speed = Math.sqrt(Math.pow(speed, 2) / 2);
				yeti.setVelocity(speed, speed * -1);
				yeti.setDepth(yeti.body.y - 6);
			}
			else if (downDown) {
				speed = Math.sqrt(Math.pow(speed, 2) / 2);
				yeti.setVelocity(speed, speed);
				yeti.setDepth(yeti.body.y - 6);
			}
			else {
				yeti.setVelocity(speed, 0);
			}
		}
		else if (upDown) {
			yeti.anims.play('yeti-back-walk', true);
			yeti.scaleX = 1;
			yeti.body.width = 28;
			yeti.body.offset.x = 2;
			yeti.setVelocity(0, speed * -1);
			yeti.setDepth(yeti.body.y - 6);
		}
		else if (downDown) {
			yeti.anims.play('yeti-front-walk', true);
			yeti.scaleX = 1;
			yeti.body.offset.x = 2;
			yeti.body.width = 28;
			yeti.setVelocity(0, speed);
			yeti.setDepth(yeti.body.y - 6);
		}
		else {
			let idleAnim = yeti.anims.currentAnim.key.split('-');
			idleAnim[2] = "idle";
			yeti.anims.play(idleAnim.join("-"));
			yeti.setVelocity(0, 0);
		}
	}
}

export default Game;

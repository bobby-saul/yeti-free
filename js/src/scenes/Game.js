import Phaser from 'phaser'

const frameRate = 10;

class Game extends Phaser.Scene{
	constructor(){
		super('game')
	}

	preload(){
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

	create(){
		this.yeti = this.physics.add.sprite(500, 250, 'yeti');

		this.anims.create({
			key: 'yeti-front-idle',
			frames: [ { key: 'yeti', frame: 0 } ],
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
			frames: [ { key: 'yeti', frame: 4 } ],
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
			frames: [ { key: 'yeti', frame: 7 } ],
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
    }
    
    update() {
		var speed = 160;
		const cursors = this.cursors;
		const yeti = this.yeti;
		const leftDown = cursors.left.isDown || cursors.a.isDown;
		const rightDown = cursors.right.isDown || cursors.d.isDown;
		const upDown = cursors.up.isDown || cursors.w.isDown;
		const downDown = cursors.down.isDown || cursors.s.isDown;

		if (leftDown) {
			yeti.anims.play('yeti-side-walk', true);
			yeti.scaleX = -1;
			yeti.body.offset.x = 24;
			yeti.body.width = 18;
			if (upDown) {
				speed = Math.sqrt(Math.pow(speed, 2) / 2);
				yeti.setVelocity(speed * -1, speed * -1);
			}
			else if (downDown) {
				speed = Math.sqrt(Math.pow(speed, 2) / 2);
				yeti.setVelocity(speed * -1, speed);
			}
			else {
				yeti.setVelocity(speed * -1, 0);
			}
		} else if (rightDown){
			yeti.anims.play('yeti-side-walk', true);
			yeti.body.offset.x = 8;
			yeti.body.width = 18;
			yeti.scaleX = 1
			if (upDown) {
				speed = Math.sqrt(Math.pow(speed, 2) / 2);
				yeti.setVelocity(speed, speed * -1);
			}
			else if (downDown) {
				speed = Math.sqrt(Math.pow(speed, 2) / 2);
				yeti.setVelocity(speed, speed);
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
		}
		else if (downDown) {
			yeti.anims.play('yeti-front-walk', true);
			yeti.scaleX = 1;
			yeti.body.offset.x = 2;
			yeti.body.width = 28;
			yeti.setVelocity(0, speed);
		}
		else {
			var idleAnim = yeti.anims.currentAnim.key.split('-');
			idleAnim[2] = "idle";
			yeti.anims.play(idleAnim.join("-"));
			yeti.setVelocity(0, 0);
		}
	}
}

export default Game;
import Phaser from 'phaser'

class Game extends Phaser.Scene{
	constructor(){
		super('game')
	}

	preload(){
		// this.cursors = this.input.keyboard.createCursorKeys();
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
		this.player = this.physics.add.sprite(500, 250, 'yeti');
    }
    
    update() {
		var speed = 160;
		const cursors = this.cursors;
		const player = this.player;
		const leftDown = cursors.left.isDown || cursors.a.isDown;
		const rightDown = cursors.right.isDown || cursors.d.isDown;
		const upDown = cursors.up.isDown || cursors.w.isDown;
		const downDown = cursors.down.isDown || cursors.s.isDown;

		if (leftDown) {
			if (upDown) {
				speed = Math.sqrt(Math.pow(speed, 2) / 2);
				player.setVelocity(speed * -1, speed * -1);
			}
			else if (downDown) {
				speed = Math.sqrt(Math.pow(speed, 2) / 2);
				player.setVelocity(speed * -1, speed);
			}
			else {
				player.setVelocity(speed * -1, 0);
			}
		} else if (rightDown){
			if (upDown) {
				speed = Math.sqrt(Math.pow(speed, 2) / 2);
				player.setVelocity(speed, speed * -1);
			}
			else if (downDown) {
				speed = Math.sqrt(Math.pow(speed, 2) / 2);
				player.setVelocity(speed, speed);
			}
			else {
				player.setVelocity(speed, 0);
			}
		}
		else if (upDown) {
			player.setVelocity(0, speed * -1);
		}
		else if (downDown) {
			player.setVelocity(0, speed);
		}
		else {
			player.setVelocity(0, 0);
		}
	}
}

export default Game;
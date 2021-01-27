import Phaser from 'phaser'
import HealthBar from './HealthBar';
import ScoreBoard from './ScoreBoard';

class Yeti extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'yeti');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.height = 6;
		this.body.offset.y = 26;
		this.health = 1000;
		this.score = 0;
		this.healthBar = new HealthBar(this.scene);
		this.scoreboard = new ScoreBoard(this.scene);
		this.eatWait = 0;
	}
	
	fall() {
		this.setVelocity(0);
	}

	eat(skier) {
		this.eatWait = 12;
		let direction = this.anims.currentAnim.key.split('-')[1];
		if (direction === "back") {
			this.anims.play('yeti-back-eat-' + (skier.skierType + 1), true);
		} else {
			this.anims.play('yeti-front-eat-' + (skier.skierType + 1), true);
		}
		if (skier.x >= this.x) {
			this.scaleX = -1;
			this.body.offset.x = 28;
		} else {
			this.scaleX = 1;
			this.body.offset.x = 2;
		}
		this.body.width = 28;
		skier.destroy();
		this.score += 100;
		this.health = Math.min((this.health + 100), 1000);

	}

	updateHealth() {
		if (this.health < 1) {
			// game over
		} else {
			this.health = this.health - 0.5;
		}
		this.healthBar.update();
	}
    
    update(cursors) {
		if (this.eatWait > 0) {
			this.eatWait = this.eatWait - 1;
		} else {
			let speed = 160;
			const leftDown = cursors.left.isDown || cursors.a.isDown;
			const rightDown = cursors.right.isDown || cursors.d.isDown;
			const upDown = cursors.up.isDown || cursors.w.isDown;
			const downDown = cursors.down.isDown || cursors.s.isDown;

			if (leftDown) {
				this.anims.play('yeti-side-walk', true);
				this.scaleX = -1;
				this.body.offset.x = 28;
				this.body.width = 18;
				if (upDown) {
					speed = Math.sqrt(Math.pow(speed, 2) / 2);
					this.setVelocity(speed * -1, speed * -1);
					this.setDepth(this.body.y - 6);
				}
				else if (downDown) {
					speed = Math.sqrt(Math.pow(speed, 2) / 2);
					this.setVelocity(speed * -1, speed);
					this.setDepth(this.body.y - 6);
				}
				else {
					this.setVelocity(speed * -1, 0);
				}
			} else if (rightDown) {
				this.anims.play('yeti-side-walk', true);
				this.body.offset.x = 8;
				this.body.width = 18;
				this.scaleX = 1;
				if (upDown) {
					speed = Math.sqrt(Math.pow(speed, 2) / 2);
					this.setVelocity(speed, speed * -1);
					this.setDepth(this.body.y - 6);
				}
				else if (downDown) {
					speed = Math.sqrt(Math.pow(speed, 2) / 2);
					this.setVelocity(speed, speed);
					this.setDepth(this.body.y - 6);
				}
				else {
					this.setVelocity(speed, 0);
				}
			}
			else if (upDown) {
				this.anims.play('yeti-back-walk', true);
				this.scaleX = 1;
				this.body.width = 28;
				this.body.offset.x = 2;
				this.setVelocity(0, speed * -1);
				this.setDepth(this.body.y - 6);
			}
			else if (downDown) {
				this.anims.play('yeti-front-walk', true);
				this.scaleX = 1;
				this.body.offset.x = 2;
				this.body.width = 28;
				this.setVelocity(0, speed);
				this.setDepth(this.body.y - 6);
			}
			else {
				let idleAnim = this.anims.currentAnim.key.split('-');
				idleAnim[2] = "idle";
				this.anims.play(idleAnim.slice(0,3).join("-"));
				this.setVelocity(0, 0);
			}
		}
		this.updateHealth();
		this.scoreboard.update();
	}
}

export default Yeti;

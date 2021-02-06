import Phaser from 'phaser'
import HealthBar from './HealthBar';
import ScoreBoard from './ScoreBoard';
import PauseButton from './PauseButton';
import Timer from './Timer';

const eatTime = 24;
const fallTime = 30;
const immuneTime = 12;
const yetiPadding = 50;

class Yeti extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'yeti');
        scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setBounce(0);
        this.body.height = 6;
		this.body.offset.y = 26;
		this.direction = 'front';
		this.health = 1000;
		this.healthBar = new HealthBar(scene);
		this.scoreboard = new ScoreBoard(scene);
		this.pauseButton = new PauseButton(scene);
		this.timer = new Timer(scene);
		this.eatWait = 0;
		this.fallWait = 0;
		this.immuneWait = 0;
		this.starveRate = 0.75;
	}
	
	fall(object) {
		if (this.eatWait < 1 && this.fallWait < 1 && this.immuneWait < 1) {
			this.fallWait = fallTime;
			this.scene.score = this.scene.score - 10;
			this.health = this.health - 50;
			this.setVelocity(0);
			this.anims.play('yeti-side-fall', true);
			if (object.x >= this.x) {
				this.scaleX = 1;
				this.body.offset.x = 2;
			} else {
				this.scaleX = -1;
				this.body.offset.x = 28;
			}
			if (this.scene.sfx.on) {
				this.scene.sfx.roarSound.play();
			}
		}
	}

	eat(skier) {
		if (this.fallWait < 1 && this.eatWait < 1) {
			this.eatWait = eatTime;
			this.setVelocity(0);
			if (this.direction === "back") {
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
			this.scene.score += 100;
			this.health = Math.min((this.health + 100), 1000);
			if (this.scene.sfx.on) {
				this.scene.sfx.chewSound.play();
			}
		}
	}

	updateHealth() {
		if (this.health < 1) {
			this.scene.endGame();
		} else {
			this.health = this.health - this.starveRate;
		}
		this.healthBar.update();
	}
    
    update(cursors) {
		if (this.fallWait > 0) {
			this.fallWait = this.fallWait - 1;
		} else if (this.eatWait > 0) {
			this.eatWait = this.eatWait - 1;
		} else {
			let speed = 160;
			let leftDown = cursors.left.isDown || cursors.a.isDown;
			let rightDown = cursors.right.isDown || cursors.d.isDown;
			let upDown = cursors.up.isDown || cursors.w.isDown;
			let downDown = cursors.down.isDown || cursors.s.isDown;
			if (this.scene.pointer.isDown) {
				if (this.scene.pointer.worldX > this.body.x + yetiPadding) {
					rightDown = true;
				} else if (this.scene.pointer.worldX < this.body.x - yetiPadding) {
					leftDown = true;
				}
				if (this.scene.pointer.worldY > this.body.y + yetiPadding) {
					downDown = true;
				} else if (this.scene.pointer.worldY < this.body.y - yetiPadding) {
					upDown = true;
				}
			}

			if (leftDown) {
				this.direction = 'side';
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
				this.direction = 'side';
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
				this.direction = 'back';
				this.anims.play('yeti-back-walk', true);
				this.scaleX = 1;
				this.body.width = 28;
				this.body.offset.x = 2;
				this.setVelocity(0, speed * -1);
				this.setDepth(this.body.y - 6);
			}
			else if (downDown) {
				this.direction = 'front';
				this.anims.play('yeti-front-walk', true);
				this.scaleX = 1;
				this.body.offset.x = 2;
				this.body.width = 28;
				this.setVelocity(0, speed);
				this.setDepth(this.body.y - 6);
			}
			else {
				this.anims.play('yeti-' + this.direction + '-idle');
				this.setVelocity(0, 0);
			}
		}
		if (this.immuneWait > 0) {
			this.immuneWait = this.immuneWait - 1;
		}
		if (this.fallWait === 1) {
			this.immuneWait = immuneTime;
		}
		this.updateHealth();
		this.scoreboard.update();
		this.pauseButton.update();
		this.timer.update();
	}
}

export default Yeti;

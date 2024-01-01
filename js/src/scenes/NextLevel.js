import Phaser from 'phaser';
import Button from '../objects/Button';

const padding = 10;

class NextLevel extends Phaser.Scene {
  constructor() {
    super('nextlevel');
  }

  preload() {
    this.cameras.main.setBackgroundColor('#495464');
  }

  init(data) {
    // Music
    this.music = data.music;
    // Sound
    this.sfx = data.sfx;
    // Score
    this.score = data.score;
    // Level
    this.level = data.level ? data.level : 1;
  }

  create() {
    // Screen
    this.width = window.innerWidth / 2;
    this.height = window.innerHeight / 2;
    // Border
    this.border = this.add.rectangle(
      this.width,
      this.height,
      this.width,
      Math.max(this.height, 250),
      0xe8e8e8
    );
    // Title
    this.title = this.add.text(
      this.width,
      this.height - 2 * (36 + padding),
      'End of Level ' + this.level,
      {
        fill: '#495464',
        fontSize: '24px',
      }
    );
    this.title.x = this.title.x - this.title.width / 2;
    this.title.y = this.title.y - this.title.height / 2;
    // Score
    this.scoreText = this.add.text(
      this.width,
      this.height - (46 + padding),
      'Score: ' + this.score,
      {
        fill: '#495464',
        fontSize: '16px',
      }
    );
    this.scoreText.x = this.scoreText.x - this.scoreText.width / 2;
    this.scoreText.y = this.scoreText.y - this.scoreText.height / 2;
    // Start button
    this.startButton = new Button(
      this,
      this.width,
      this.height - padding,
      'Start Level ' + (this.level + 1)
    );
    this.startButton.on(
      'pointerdown',
      function () {
        this.startLevel();
      },
      this
    );
    // Quit
    this.quitButton = new Button(
      this,
      this.width,
      this.height + (36 + padding),
      'Quit'
    );
    this.quitButton.on(
      'pointerdown',
      function () {
        this.quitGame();
      },
      this
    );
    // Resize
    this.game.eventEmitter.on('resize', this.resize, this);
  }

  resize() {
    // Screen
    this.width = window.innerWidth / 2;
    this.height = window.innerHeight / 2;
    // Border
    this.border.destroy();
    this.border = this.add.rectangle(
      this.width,
      this.height,
      this.width,
      Math.max(this.height, 250),
      0xe8e8e8
    );
    this.border.setDepth(-1);
    // Title
    this.title.x = this.width - this.title.width / 2;
    this.title.y = this.height - 2 * (36 + padding) - this.title.height / 2;
    // Score
    this.scoreText.x = this.width - this.scoreText.width / 2;
    this.scoreText.y = this.height - (46 + padding) - this.scoreText.height / 2;
    // Start button
    this.startButton.move(this.width, this.height - padding);
    // Quit
    this.quitButton.move(this.width, this.height + (36 + padding));
  }

  startLevel() {
    this.scene.start('game', {
      music: this.music,
      sfx: this.sfx,
      score: this.score,
      level: this.level + 1,
    });
    this.scene.stop();
  }

  quitGame() {
    this.scene.start('title', {
      music: this.music,
      sfx: this.sfx,
    });
    this.scene.stop();
  }
}

export default NextLevel;

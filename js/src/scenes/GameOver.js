import Phaser from 'phaser';
import Button from '../objects/Button';

const padding = 10;

class GameOver extends Phaser.Scene {
  constructor() {
    super('gameover');
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
      'Game Over',
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
      'New Game'
    );
    this.startButton.on(
      'pointerdown',
      function () {
        this.startGame();
      },
      this
    );
    // Main menu
    this.mainMenuButton = new Button(
      this,
      this.width,
      this.height + (36 + padding),
      'Main Menu'
    );
    this.mainMenuButton.on(
      'pointerdown',
      function () {
        this.mainMenu();
      },
      this
    );
    // Resize
    this.game.eventEmitter.on('resize', this.resize, this);
  }

  resize() {
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
    // Main menu
    this.mainMenuButton.move(this.width, this.height + (36 + padding));
  }

  startGame() {
    this.scene.start('game', {
      music: this.music,
      sfx: this.sfx,
    });
    this.scene.stop();
  }

  mainMenu() {
    this.scene.start('title', {
      music: this.music,
      sfx: this.sfx,
    });
    this.scene.stop();
  }
}

export default GameOver;

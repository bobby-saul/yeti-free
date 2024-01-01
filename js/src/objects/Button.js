import Phaser from 'phaser';

const sidePadding = 15;
const topBottomPadding = 10;

class Button extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, text) {
    // Add
    super(scene, x, y, 'button', 0);
    scene.add.existing(this);
    // Add text
    if (text) {
      this.buttonText = scene.add.text(0, 0, text, {
        fontSize: '16px',
        fill: '#495464',
        align: 'center',
      });
      var width = this.buttonText.width + sidePadding * 2;
      var height = this.buttonText.height + topBottomPadding * 2;
      this.scaleX = width / 16;
      this.scaleY = height / 16;
      this.buttonText.x = x - this.buttonText.width / 2;
      this.buttonText.y = y - this.buttonText.height / 2;
    }
    // Checkbox
    this.checked = false;
    // Events
    this.setInteractive();
    this.on('pointerover', this.hover, this);
    this.on('pointerout', this.unhover, this);
  }

  move(x, y) {
    this.x = x;
    this.y = y;
    var width = this.buttonText.width + sidePadding * 2;
    var height = this.buttonText.height + topBottomPadding * 2;
    this.scaleX = width / 16;
    this.scaleY = height / 16;
    this.buttonText.x = x - this.buttonText.width / 2;
    this.buttonText.y = y - this.buttonText.height / 2;
  }

  hover() {
    if (!this.checked) {
      this.setFrame(1);
    }
  }

  unhover() {
    if (!this.checked) {
      this.setFrame(0);
    }
  }

  check() {
    this.checked = true;
    this.setFrame(2);
  }

  uncheck() {
    this.checked = false;
    this.setFrame(1);
  }
}

export default Button;

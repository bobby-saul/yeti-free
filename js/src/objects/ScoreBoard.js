const heightOffset = 16;
const widthOffset = 24;

class ScoreBoard {
    constructor(scene) {
        this.scene = scene;
        this.scoreText = this.scene.add.text(0, 0, 'Score: 0', {
            fontSize: '12px',
            fill: '#000',
            align: 'right',
        });
    }
    
    update() {
        var x = this.scene.yeti.body.x + (window.innerWidth / 2) - this.scoreText.width - widthOffset;
        var y = this.scene.yeti.body.y - (window.innerHeight / 2) + this.scoreText.height + heightOffset;
        this.scoreText.setText('Score: ' + this.scene.score);
        this.scoreText.x = x;
        this.scoreText.y = y;
    }
}

export default ScoreBoard;

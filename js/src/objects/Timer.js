const heightOffset = 24;

class Timer {
    constructor(scene) {
        this.scene = scene;
        this.levelText = this.scene.add.text(0, 0, 'Level ' + this.scene.level, {
            fontSize: '16px',
            fill: '#000',
        });
        this.timerText = this.scene.add.text(0, 0, '', {
            fontSize: '16px',
            fill: '#000',
        });
    }
    
    update() {
        var x = this.scene.yeti.body.x;
        var y = this.scene.yeti.body.y - (window.innerHeight / 2) + this.timerText.height;
        var timeLeft = Math.floor(this.scene.levelTime / 1000) - Math.floor(this.scene.timer.getProgress() * this.scene.levelTime / 1000);
        this.timerText.setText(timeLeft + "s");
        this.timerText.x = x - (this.timerText.width / 2);
        this.timerText.y = y + heightOffset;
        this.levelText.x = x - (this.levelText.width / 2);
        this.levelText.y = y;
    }
}

export default Timer;

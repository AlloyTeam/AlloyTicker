/**
 * Created by dntzhang on 2016/6/2.
 */
var Sprite = function(ticker,option,callback){
    this.ticker = ticker;
    this.frames = option.frames;
    this.interval = option.interval;
    this.index = 0;
    this.length = this.frames.length;
    this.callback=callback;
    this.x = option.x;
    this.y = option.y;
    this.vx = option.vx;
    this.vy = option.vy;
}

Sprite.prototype = {
    start:function() {
        this.startX = this.x;
        this.startY = this.y;
        this.startTime = this.ticker.currentTime;
        this.ticker.ticks.push(this.tick.bind(this));
    },
    tick:function() {
        var dt = this.ticker.currentTime - this.startTime;
        if (dt < 0) {
            this.index = -1;
        } else {
            this.index = Math.floor(dt / this.interval) % this.length;
        }
        this.x = this.startX + this.vx * dt;
        this.y = this.startY + this.vy * dt;
        this.callback.call(this);
    }
}
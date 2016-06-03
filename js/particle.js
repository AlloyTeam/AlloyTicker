/**
 * Created by dntzhang on 2016/6/2.
 */
var Particle = function(ticker,x,y,vx,vy,ax,ay,callback){
    this.x=x;
    this.y=y;
    this.vx = vx;
    this.vy = vy;

    this.ax = ax;
    this.ay = ay;

    this.ticker = ticker;
    this.callback = callback||function(){};
}

Particle.prototype = {
    start:function(){
        this.startX=this.x;
        this.startY= this.y;
        this.startTime = this.ticker.currentTime;
        this.ticker.ticks.push(this.tick.bind(this));
    },
    tick: function() {
        var dt = this.ticker.currentTime - this.startTime;
        var sqDt = dt * dt;
        this.x = this.startX + this.vx * dt + this.ax * sqDt / 2;
        this.y = this.startY + this.vy * dt + this.ay * sqDt / 2;
        this.callback.call(this);
    }
}
/* AlloyTicker  v0.1.0
 * By AlloyTeam http://www.alloyteam.com/
 * Github: https://github.com/AlloyTeam/AlloyTicker
 * MIT Licensed.
 */
var AlloyTicker = function(){
    this.interval= null;
    this.intervalTime= 16;
    this.tickIntervalTime = 16;
    this.currentTime = 0;
    this.clockwise = true;
    this.ticks=[];
    this.isPause = false;
    this.isStop = false;
}

AlloyTicker.prototype = {
    start: function () {
        this.interval = setInterval(function () {
            if(!this.isPause){
                this.currentTime += (this.clockwise ? this.intervalTime : -1 * this.intervalTime);
                if(this.currentTime<0)this.currentTime=0;
                this.tick();
            }
        }.bind(this), this.tickIntervalTime);
    },
    tick: function () {
        for(var i= 0,len=this.ticks.length;i<len;i++){
            this.ticks[i](this.currentTime);
        }
    },
    back: function () {
        this.clockwise = false;
    },
    forward: function () {
        this.clockwise = true;
    },
    goto: function(time){
        this.currentTime = Math.round(time/this.intervalTime)*this.intervalTime;
    },
    pause:function(){
        this.isPause = true;
    },
    play :function(){
        this.isPause = false;
        if(this.isStop){
            this.start();
            this.isStop = false;
        }
    },
    stop:function() {
        this.currentTime = 0;
        clearInterval(this.interval);
        this.tick();
        this.isStop = true;
    },
    scale:function(value){
        clearInterval(this.interval);
        this.tickIntervalTime = this.tickIntervalTime * value;
        this.start();
    }
}
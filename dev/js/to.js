var To = function (ticker,obj, property, value, time,option ) {
    this.ticker = ticker;
    this.obj = obj;
    this.property = property;
    this.value = value;
    //时间间隔整数倍
    this.time= Math.round(time/ticker.intervalTime)*ticker.intervalTime;
    if(!option)option={};
    this.ease = option.ease||function(a){ return a;};
    this.onStart  = option.onStart ||function(){};
    this.onEnd = option.onEnd||function(){};
    this.onChange = option.onChange||function(){};

    this.timeOut=false;
}

To.prototype = {
    start:function(){
        this.startTime = this.ticker.currentTime;
        this.dv = this.value - this.obj[this.property] ;
        this.onStart(this.obj[this.property]);
        this.ticker.ticks.push(this.tick.bind(this));
        this.startVaule= this.obj[this.property];
    },
    tick:function(currentTime){
        var dt = currentTime - this.startTime;

        if(this.timeOut&&dt<=this.time&&dt>=0){
            if(dt===0) this.onStart(this.startVaule);
            if(dt===this.time)this.onEnd(this.value);
            this.timeOut=false;
        }
        if(!this.timeOut) {
            if (dt >= this.time) {
                this.obj[this.property] = this.value;
                this.onEnd(this.value);
                return;
            }

            this.obj[this.property] = this.startVaule + this.dv * this.ease(dt / this.time);
            this.onChange(this.obj[this.property]);
            this.timeOut = true;
        }
    }
}


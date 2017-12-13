var global = require('GlobalFile')
cc.Class({
    extends: cc.Component,

    properties: {
        health: 100,
        pathFinder: null,
        dead: false,
        type: null,
        speed: null,
    },

    // use this for initialization
    onLoad: function () {
        
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
         if(this.dead == false){
             if(this.health <= 0){
                 this.dead = true;
                 this.node.setOpacity(0);
                 
                 if(global.getLevelPressed() == 0){
                      if(this.game.mny == 0){
                         this.game.mny = this.game.mny + 50;
                         this.game.money.string = "Money: " + this.game.mny;

                         this.game.money.node.runAction(cc.fadeIn(1.0));
                     }else{
                         this.game.mny = this.game.mny + 50;
                         this.game.money.string = "Money: " + this.game.mny;
                     }
                 }else{
                    this.game.mny = this.game.mny + 50;
                    this.game.lblMoney.string = "Money: " + this.game.mny;
                 }
                

             }
            if (this.getEndDistance() < 2 && this.dead == false) {
                this.onTouch();
                this.node.setOpacity(0);
                return;
            }
        }
         
     },
    
    move: function(delay, tutorial) {
        this.node.runAction(cc.sequence(new cc.DelayTime(delay * 1.5),this.pathFinder.getComponent('PathFinder').createPath(this.speed, tutorial)));
        this.scheduleOnce(function() { this.node.setOpacity(255); } , delay * 1.5 );
    },
    
    getEndDistance: function () {
        // judge the distance according to the position of the player node
        if(global.getLevelPressed() == 0){
            var end = this.pathFinder.getComponent('PathFinder').getEndingPoint(true);
        }else{
            var end = global.getEndingPoint();
        }
        
        // calculate the distance between two nodes according to their positions
        var dist = cc.pDistance(this.node.position, end);
        return dist;
    },
    
    onTouch: function(){
        if(global.getLevelPressed() == 0){
            this.game.hp = this.game.hp - 1;
            this.game.health.string = "Health: " + this.game.hp;
            this.dead = true;
            if(this.game.mny == 0){
                this.game.mny = this.game.mny + 50;
                this.game.money.string = "Money: " + this.game.mny;
                this.game.money.node.runAction(cc.fadeIn(1.0));
            }else{
                this.game.mny = this.game.mny + 50;
                this.game.money.string = "Money: " + this.game.mny;
            }
        }else{
            this.game.hp = this.game.hp - 1;
            this.game.lblHealth.string = "Health: " + this.game.hp;
            this.dead = true;
        }
    },
    
    startMovingSlower: function(){
        var x = this.node.x;
        var y = this.node.y;
        this.node.runAction(this.pathFinder.getComponent('PathFinder').createSlowPath(this.speed / 2, x, y));
    },
});

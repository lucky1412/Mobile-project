cc.Class({
    extends: cc.Component,

    properties: {
        type: "standard",
        chosenEnemy: null,
        range: 200,
        busy: false,
        damage: 30,
    },

    // use this for initialization
    onLoad: function () {
        var sprite = this.getComponent(cc.Sprite);
        if(this.type == "standard"){
            cc.loader.loadRes("turret_basic", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
        }else if(this.type == "fire"){
            cc.loader.loadRes("turret_fire", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
        }else if(this.type == "ice"){
            cc.loader.loadRes("turret_ice", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
        }else if(this.type == "electric"){
            cc.loader.loadRes("turret_electric", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
        }else if(this.type == "death"){
            cc.loader.loadRes("turret_death", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
        }else if(this.type == "poison"){
            cc.loader.loadRes("turret_poison", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
        }else if(this.type == "veggy"){
            cc.loader.loadRes("turret_veggy", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
        }else if(this.type == "stun"){
            cc.loader.loadRes("turret_stun", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
        }
        
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
             if(this.game != null){
                 if(this.chosenEnemy == null && this.game.enemies.length != 0){
                     this.lookForNewTarget();
                 }
                 if(this.chosenEnemy != null && !this.checkStillInRange()){
                     this.lookForNewTarget();
                 }
                 if(this.chosenEnemy != null){
                     if(this.busy == false){
                         this.attackEnemy();
                     }  
                 }
             }
    },
    
    lookForNewTarget: function() {
        var closest = null;
        var closestRange = 1000;
        if(this.game.enemies != null){
            if(this.game.enemies.length != 0){
                for(let i = 0 ; i < this.game.enemies.length ; i++){
                    if(this.game.enemies[i].getComponent('Enemy').dead == false){
                        if(i == 0){
                            closest = 0;
                            closestRange = this.getEnemyDistance(this.game.enemies[i]);
                        }else{
                            var dist = this.getEnemyDistance(this.game.enemies[i]);
                            if(dist < closestRange){
                                closestRange = dist;
                                closest = i;
                            }
                        }
                    }
                }
                if(closestRange <= this.range){
                    this.chosenEnemy = this.game.enemies[closest];
                }
            }
        }
    },
    
    getEnemyDistance: function(enemy) {
        // judge the distance according to the position of the player node
        var enemyPos = enemy.getPosition();
        // calculate the distance between two nodes according to their positions
        var dist = cc.pDistance(this.node.position, enemyPos);
        return dist;
    },
    
    checkStillInRange: function(){
        if(this.getEnemyDistance(this.chosenEnemy) <= this.range && this.chosenEnemy.getComponent('Enemy').dead == false){
            return true;
        }
        this.chosenEnemy = null;
        return false;
    },
    
    attackEnemy: function() {
        this.busy = true;
        var bullet = null;
        bullet = cc.instantiate(this.game.bulletPrefab);
        
        bullet.getComponent('Bullet').game = this.game;
        bullet.parent = this.game.node;
        
        var fileName = "bullet_" + this.type;
        var sprite = bullet.getComponent(cc.Sprite);
        cc.loader.loadRes(fileName, function(err, data) {
            this.spriteFrame = new cc.SpriteFrame(data);
        }.bind(sprite));
        
        bullet.setPosition(this.node.position);
        bullet.getComponent('Bullet').focusedEnemy = this.chosenEnemy;
        bullet.getComponent('Bullet').owner = this;
        
        bullet.runAction(cc.moveTo(0.1,this.chosenEnemy.x,this.chosenEnemy.y));
        this.scheduleOnce(function() { this.busy = false } , 0.8);
    },
    
    destroyEffect: function(effect){
        this.scheduleOnce(function(){effect.destroy()}, 0.1);
    }
});

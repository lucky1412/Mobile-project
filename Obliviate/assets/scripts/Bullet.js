cc.Class({
    extends: cc.Component,

    properties: {
        type: "standard",
        focusedEnemy: null,
        owner: null,
    },

    // use this for initialization
    onLoad: function () {
        
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
         if(this.focusedEnemy != null){
             if(this.getEnemyDistance() < 50){
                 this.focusedEnemy.getComponent('Enemy').health = this.focusedEnemy.getComponent('Enemy').health - this.owner.getComponent('Turret').damage;
                 this.applyEffect();
                 this.node.destroy();
             }
         }
     },
    
    getEnemyDistance: function () {
        // judge the distance according to the position of the player node
        var end = this.focusedEnemy.getPosition();
        // calculate the distance between two nodes according to their positions
        var dist = cc.pDistance(this.node.position, end);
        return dist;
    },
    
    applyEffect: function(){
        switch(this.owner.getComponent('Turret').type){
            case "electric":
                var number = null;
                var enemies = this.owner.getComponent('Turret').game.enemies;
                for(let i = 0 ; i < enemies.length ; i++){
                    if(this.focusedEnemy == enemies[i]){
                        number = i;
                    }
                }
                
                if(number == 0){
                    if(enemies[number].getComponent('Enemy').type == "boss"){
                        if(enemies[number] != null){
                            this.createElectric(enemies[number]);
                        }
                    }else{
                        if(enemies[number] != null && enemies[number + 1] != null){
                            if(enemies[number + 1].getComponent('Enemy').dead == false){
                                this.createElectric(enemies[number]);
                                this.createElectric(enemies[number + 1]);
                            }
                        }
                    }
                    
                }else if(number == enemies.length - 1){
                    if(enemies[number] != null && enemies[number - 1] != null){
                        if(enemies[number - 1].getComponent('Enemy').dead == false){
                            this.createElectric(enemies[number]);
                            this.createElectric(enemies[number - 1]);

                        }else if(enemies[number].getComponent('Enemy').dead == false){
                            this.createElectric(enemies[number]);
                        }
                    }
                    
                }else{
                    
                    this.createElectric(enemies[number]);
                    
                    if(enemies[number + 1].getComponent('Enemy').dead == false && enemies[number + 1] != null){
                        
                        this.createElectric(enemies[number + 1]);
                        
                    }
                    if(enemies[number - 1].getComponent('Enemy').dead == false && enemies[number - 1] != null){
                        
                        this.createElectric(enemies[number - 1]);
                        
                    }
                }
                break;
        }  
    },
    
    createElectric: function(enemy){
        var electric = new cc.Node();
        electric.parent = this.owner.getComponent('Turret').game.node;
                        
        var fileName = "effect_" + this.owner.getComponent('Turret').type;
        var sprite = electric.addComponent(cc.Sprite);
        cc.loader.loadRes(fileName, function(err, data) {
            this.spriteFrame = new cc.SpriteFrame(data);
        }.bind(sprite));
                        
        electric.setPosition(enemy.getPosition());
        
        //damage the enemy
        if(enemy != null){
            this.focusedEnemy.getComponent('Enemy').health = this.focusedEnemy.getComponent('Enemy').health - 10;
        }
                    
        this.owner.getComponent('Turret').destroyEffect(electric);
    },
});

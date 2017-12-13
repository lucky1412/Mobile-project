var global = require("GlobalFile")
cc.Class({
    extends: cc.Component,

    properties: {
        spawnerPointsTutorial : null,
        turretTypes: null,
        spawnEnemyCount: null,
        spawnerPosition: null,
        enemyTypesTutorial: null,
    },

    // use this for initialization
    onLoad: function () {
        this.spawnerPointsTutorial = [
            [
                [96,70,0],
                [160,70,0],
                [224,70,0],
                [96,130,0],
                [160,130,1],
                [224,130,0],
                [97,193,0],
                [160,191,0],
                [224,191,0]
            ],
            [
                [-217.1,70,0],
                [-153.1,70,0],
                [-89.1,70,0],
                [-217.1,130,0],
                [-153.1,130,1],
                [-89.1,130,0],
                [-216.1,193,0],
                [-152.1,191,0],
                [-88.1,191,0]
            ]
        ];
        this.turretTypes = ["standard", "fire", "ice", "electric"];
        this.spawnerPositionTutorial = [-350,281];
        this.enemyTypesTutorial = [
            [5,"standard"],
            [2,"standard",2,"speed",3,"standard",1,"tank"],
            [3,"standard",2,"speed",2,"standard",1,"tank",1,"speed",1,"standard"],
            [4,"standard",3,"speed",2,"standard",2,"tank",3,"standard"],
            [1,"boss"]
        ];
        this.busy = false;
        this.times = 0;
    },
    
    spawnWaveTutorial: function() {
        
        //take length of specific wave / 2
        var waveLength = this.enemyTypesTutorial[this.game.wv - 1].length / 2;
        var count = 0;
        //loop for that amount
        for(let i = 0 ; i < waveLength ; i++){ //0 1 2 3
            var correctPlace = i * 2; // 0 2 4 6
            var amountOfEnemies = this.enemyTypesTutorial[this.game.wv - 1][correctPlace]; // 
            //loop for 0,2,4,6,8...
            for(let j = 0 ; j < amountOfEnemies ; j++){
                var type = this.enemyTypesTutorial[this.game.wv - 1][correctPlace + 1]; 
                //create enemy
                var enemy = cc.instantiate(this.game.enemyPrefab);
                //add to array
                this.game.enemies[count] = enemy;
                //set parent
                enemy.parent = this.game.node;
                //give correct sprite
                var fileName = "enemy_" + type; 
                var sprite  = enemy.getComponent(cc.Sprite);
                cc.loader.loadRes(fileName, function(err, data) {
                    this.spriteFrame = new cc.SpriteFrame(data);
                }.bind(sprite));
                //give correct type
                enemy.getComponent('Enemy').type = type;
                //set opacity
                enemy.setOpacity(0);
                //set position
                enemy.setPosition(cc.p(this.spawnerPositionTutorial[0], this.spawnerPositionTutorial[1]));
                //give game, pathfinder, pathfinder game
                enemy.getComponent('Enemy').game = this.game;
                enemy.getComponent('Enemy').pathFinder = this.game.pathFinder;
                enemy.getComponent('Enemy').pathFinder.getComponent('PathFinder').game = this.game;
                //give correct speed
                //give correct health
                switch(type){
                    case "standard":
                        enemy.getComponent('Enemy').speed = 2;
                        enemy.getComponent('Enemy').health = 100;
                        break;
                    case "speed":
                        enemy.getComponent('Enemy').speed = 1;
                        enemy.getComponent('Enemy').health = 50;
                        break;
                    case "tank":
                        enemy.getComponent('Enemy').speed = 3;
                        enemy.getComponent('Enemy').health = 170;
                        break;
                    case "boss":
                        enemy.getComponent('Enemy').speed = 5;
                        enemy.getComponent('Enemy').health = 800;
                        break;
                }
                //apply wave health modifier
                enemy.getComponent('Enemy').health = enemy.getComponent('Enemy').health * this.game.wv;
                //call move method
                enemy.getComponent('Enemy').move(count, true);
                count++;
            }
        }
    },
    
    spawnTurretTutorial: function(){
        var count = 0;
        
        for(let i = 0 ; i < 2 ; i++){
            for(let j = 0 ; j < 9 ; j++){
                if(this.spawnerPointsTutorial[i][j][2] == 1){
                    count++;
                }
            }
        }
        
        if(count < 18){
            var randomtype = Math.floor(Math.random() * this.turretTypes.length);
            var type = this.turretTypes[randomtype];

            var randomSpawn = null;
            var randomPlace = null;

            do {
                randomSpawn = Math.floor(Math.random() * 2);
                randomPlace = Math.floor(Math.random() * 9);
            }while (this.spawnerPointsTutorial[randomSpawn][randomPlace][2] == 1);

            this.spawnerPointsTutorial[randomSpawn][randomPlace][2] = 1;
            var turret = cc.instantiate(this.game.turretPrefab);
            this.game.turrets[this.game.turrets.length] = turret;
            turret.getComponent('Turret').game = this.game;
            turret.getComponent('Turret').type = type;
            turret.setOpacity(0);
            turret.parent = this.game.node;
            
            this.game.turretTypes[this.game.turretTypes.length] = type;
            if(this.game.upgrades.length != 0){
                this.game.checkTowerSection(type);
            }

            turret.runAction(cc.scaleTo(0.1, 1.5, 1.5));
            turret.setPosition(cc.p(this.spawnerPointsTutorial[randomSpawn][randomPlace][0],this.spawnerPointsTutorial[randomSpawn][randomPlace][1]));
            turret.runAction(cc.sequence(cc.fadeIn(0.5),cc.scaleTo(0.5, 1, 1)));
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    
    spawnWave: function() {
        var enemyTypeData = global.getWorld1EnemyTypesSpecificLevel();
        var currentWave = this.game.wv;
        var currentEnemyType = enemyTypeData[currentWave - 1];
        var diffTypes = currentEnemyType.length / 2;
        var count = 0;
        
        //loop over all diff typed
        for(let i = 0 ; i < diffTypes ; i++){
            //find correct place for amount
            var correctPlace = i * 2;
            //get the enemy amount per type
            var enemyAmount = currentEnemyType[correctPlace];
            //loop over every same type
            for(let j = 0 ; j < enemyAmount ; j++){
                //get the type
                var type = currentEnemyType[correctPlace + 1];
                //create the prefab
                var enemy = cc.instantiate(this.game.enemyPrefab);
                //add to game arraycount
                this.game.enemies[count] = enemy;
                //set the parent
                enemy.parent = this.game.node;
                //give correct sprite
                var fileName = "enemy_" + type; 
                var sprite  = enemy.getComponent(cc.Sprite);
                cc.loader.loadRes(fileName, function(err, data) {
                    this.spriteFrame = new cc.SpriteFrame(data);
                }.bind(sprite));
                //give correct type
                enemy.getComponent('Enemy').type = type;
                //set opacity
                enemy.setOpacity(0);
                //set position
                var spawnX = global.getSpawnerPointX();
                var spawnY = global.getSpawnerPointY();
                enemy.setPosition(cc.p(spawnX, spawnY));
                //give game/pathfinder
                enemy.getComponent('Enemy').game = this.game;
                enemy.getComponent('Enemy').pathFinder = this.game.pathFinder;
                enemy.getComponent('Enemy').pathFinder.getComponent('PathFinder').game = this.game;
                //give correct speed/health
                switch(type){
                    case "standard":
                        enemy.getComponent('Enemy').speed = 4;
                        enemy.getComponent('Enemy').health = 100;
                        break;
                    case "speed":
                        enemy.getComponent('Enemy').speed = 2;
                        enemy.getComponent('Enemy').health = 50;
                        break;
                    case "tank":
                        enemy.getComponent('Enemy').speed = 8;
                        enemy.getComponent('Enemy').health = 300;
                        break;
                    case "boss":
                        enemy.getComponent('Enemy').speed = 10;
                        enemy.getComponent('Enemy').health = 800;
                        break;
                }
                
                //check for spotted
                this.checkSpotted(count, type, "enemy");
                
                //apply wave modifier
                enemy.getComponent('Enemy').health = enemy.getComponent('Enemy').health * this.game.wv;
                //move the enemy
                enemy.getComponent('Enemy').move(count, false);
                //up the count
                count++;
            }
        }
    },
    
    spawnTurret: function(){
        //set count
        var count = 0;
        //check amount of turrets in this level
        var amountOfTurretsInTotal = global.getAmountOfTurrets();
        //check amount of free turrets in this level
        var amountOfFreeTurretsInTotal = global.getAmountOfFreeTurrets();
        //if free turrets
        if(amountOfFreeTurretsInTotal > 0){
            //get random type
            var allTypes = global.getAllTowerTypes();
            var randomtype = Math.floor(Math.random() * allTypes.length);
            var type = allTypes[randomtype];
            //var type = "ice";
            //get a random number for the turret, do while it is a free one, check global file
            var towerPositions = global.getTurretPositions();
            var random = 0;
            do {
                random = Math.floor(Math.random() * amountOfTurretsInTotal);
            }while (towerPositions[random][2] == true);
            
            towerPositions[random][2] = true;
            global.setTowerPositions(random);
            
            //create prefab
            var turret = cc.instantiate(this.game.turretPrefab);
            //give correct type
            turret.getComponent('Turret').type = type;
            //add to game array
            this.game.turrets[this.game.turrets.length] = turret;
            //set parent
            turret.parent = this.game.node;
            //give game
            turret.getComponent('Turret').game = this.game;
            //set opacity
            turret.setOpacity(0);

            //check for tower upgrade section
            this.game.turretTypes.push(type);
            this.game.checkTowerSection(type);
            
            //check for spotted
            this.checkSpotted(0, type, "turret");
            
            //scale
            turret.runAction(cc.scaleTo(0.1, 1.5, 1.5));
            //set position
            turret.setPosition(cc.p(towerPositions[random][0],towerPositions[random][1]));
            //fade in
            turret.runAction(cc.sequence(cc.fadeIn(0.5),cc.scaleTo(0.5, 1, 1)));
        }
    },
    
    checkSpotted: function(time, type, object){
        var types = [];
        if(object == "enemy"){
            types = global.getAllSpottedEnemies();
        }else{
            types = global.getAllSpottedTowers();
        }
        
        for(let i = 0 ; i < types.length ; i++){
            if(types[i][0] == type){
                if(types[i][1] == false){
                    if(object == "enemy"){
                        global.setEnemySpotted(type);
                        
                    }else{
                         global.setTowerSpotted(type);
                    }
                    this.createSpottedSection(time, object, type);
                }
            }
        }
    },
    
    createSpottedSection: function(time, object, type){
        if(this.busy == false){
            this.busy = true;
            this.scheduleOnce(function(){
                this.game.spotted.setOpacity(255);
                var spottedNode = this.game.spotted.getChildByName("lblSpotted");
                var lblSpotted = spottedNode.getComponent(cc.Label);
                lblSpotted.string = "New " + object + " spotted";
                var typeNode = this.game.spotted.getChildByName("lblType");
                var lblType = typeNode.getComponent(cc.Label);
                lblType.string = "Type: " + type;
                var spriteNode = this.game.spotted.getChildByName("tower");
                var sprite = spriteNode.getComponent(cc.Sprite);

                var fileName = "";
                if(type == "standard" && object == "turret"){
                    fileName = object + "_basic";
                }else{
                    fileName = object + "_" + type;
                }

                cc.loader.loadRes(fileName, function(err, data) {
                    this.spriteFrame = new cc.SpriteFrame(data);
                }.bind(sprite));

                var move = new cc.MoveBy(1, cc.p(-320.5,0));
                var easeAction = new cc.EaseBackOut( move );
                this.game.spotted.runAction(easeAction);
                this.scheduleOnce(function(){
                    var move = new cc.MoveBy(1, cc.p(320.5,0));
                    var easeAction = new cc.EaseBackIn( move );
                    this.game.spotted.runAction(easeAction);
                    this.scheduleOnce(function(){
                        this.game.spotted.setOpacity(0);
                        this.busy = false;
                    }, 1);
                }, 3);
            }, time * 1.5);
        }else{
            this.scheduleOnce(function(){
                this.busy = false;
                this.createSpottedSection(time, object, type);
            }, (time * 1.5) + 4);
        }
    },
});

var world1Unlocked = false;
var world2Unlocked = false;
var world3Unlocked = false;

var enemySpotted = [
    ["standard", false],
    ["speed", false],
    ["tank", false],
    ["boss", false],
];
var towerSpotted = [
    ["standard", false],
    ["fire", false],
    ["ice", false],
    ["electric", false],
    ["veggy", false],
    ["stun", false],
    ["poison", false],
    ["death", false]
];

var turretTypes = ["standard", "fire", "ice", "electric"];

var boughtTowers = [
    ["veggy", false],
    ["stun", false],
    ["poison", false],
    ["death", false]
];

var boughtLevels = [
    [28, false],
    [29, false],
    [30, false]
];

var worldPressed = 0;
var levelPressed = 0;

var levelAmountPerWorld = [30, 30, 30];

//level, cleared, locked, seconds, grade, preview pic
var world1Data = [
    [1, false, false, 0, null, null], [2, false, true, 0, null, null], [3, false, true, 0, null, null], [4, false, true, 0, null, null], 
    [5, false, true, 0, null, null], [6, false, true, 0, null, null], [7, false, true, 0, null, null], [8, false, true, 0, null, null], 
    [9, false, true, 0, null, null], [10, false, true, 0, null, null], [11, false, true, 0, null, null], [12, false, true, 0, null, null], 
    [13, false, true, 0, null, null], [14, false, true, 0, null, null], [15, false, true, 0, null, null], [16, false, true, 0, null, null], 
    [17, false, true, 0, null, null], [18, false, true, 0, null, null], [19, false, true, 0, null, null], [20, false, true, 0, null, null],
    [21, false, true, 0, null, null], [22, false, true, 0, null, null], [23, false, true, 0, null, null], [24, false, true, 0, null, null], 
    [25, false, true, 0, null, null],[26, false, true, 0, null, null], [27, false, true, 0, null, null], [28, false, true, 0, null, null], 
    [29, false, true, 0, null, null], [30, false, true, 0, null, null]
];

// [level] [wave] [aantal, type, aantal, type]
var world1EnemyTypes = [
    [ //5 , 10, 10, 10, 15, 15, 15, 20, 20, 1
        [5, "standard"],[10, "standard"],[3, "standard", 3, "speed", 2, "standard", 2, "speed"],
        [3, "standard", 1, "tank", 1, "speed", 3, "standard", 1, "tank", 1, "speed"],[3, "speed", 4, "standard", 3, "speed", 2, "tank", 3, "standard"],
        [1, "standard", 1, "tank", 1, "speed",2, "standard", 2, "tank", 2, "speed", 3, "standard", 1, "tank", 2, "speed"],
        [5, "standard", 3, "tank", 3, "speed", 4, "standard"],[5, "standard", 5, "speed", 2, "tank", 3, "speed", 5, "standard"],
        [3, "standard", 4, "tank", 2, "speed", 4, "standard", 1, "tank", 2, "speed", 4, "standard"],[1, "boss"]
    ],
    [
        [5, "standard"],[10, "standard"],[3, "standard", 3, "speed", 2, "standard", 2, "speed"],
        [3, "standard", 1, "tank", 1, "speed", 3, "standard", 1, "tank", 1, "speed"],[3, "speed", 4, "standard", 3, "speed", 2, "tank", 3, "standard"],
        [1, "standard", 1, "tank", 1, "speed",2, "standard", 2, "tank", 2, "speed", 3, "standard", 1, "tank", 2, "speed"],
        [5, "standard", 3, "tank", 3, "speed", 4, "standard"],[5, "standard", 5, "speed", 2, "tank", 3, "speed", 5, "standard"],
        [3, "standard", 4, "tank", 2, "speed", 4, "standard", 1, "tank", 2, "speed", 4, "standard"],[1, "boss"]
    ],
    [
        [5, "standard"],[10, "standard"],[3, "standard", 3, "speed", 2, "standard", 2, "speed"],
        [3, "standard", 1, "tank", 1, "speed", 3, "standard", 1, "tank", 1, "speed"],/*[3, "speed", 4, "standard", 3, "speed", 2, "tank", 3, "standard"],
        [1, "standard", 1, "tank", 1, "speed",2, "standard", 2, "tank", 2, "speed", 3, "standard", 1, "tank", 2, "speed"],
        [5, "standard", 3, "tank", 3, "speed", 4, "standard"],[5, "standard", 5, "speed", 2, "tank", 3, "speed", 5, "standard"],
        [3, "standard", 4, "tank", 2, "speed", 4, "standard", 1, "tank", 2, "speed", 4, "standard"],*/[1, "boss"]
    ],
    [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
    [
        [5, "standard"],[10, "standard"],[3, "standard", 3, "speed", 2, "standard", 2, "speed"],
        [3, "standard", 1, "tank", 1, "speed", 3, "standard", 1, "tank", 1, "speed"],[1, "boss"]
    ]
];

//world, level, x, y
var spawnPoints = [
    [
        [-350,-93],[350,-94],[-350,260],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[-350,260],[],[]
    ],
    [],
    []
];

//world, level, x, y
var endPoints = [
    [
        [350,260],[-350,94],[350,66],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[350,66],[],[]
    ],
    [],
    []
];

//world, level, 
var correctPath = [
    [
        [
            [170,-93],[170,45],[40,45],[40,260],[350,260]
        ],
        [
            [47,-94],[-129,212],[-129,-94],[-350,94]
        ],
        [
            [202,260],[202,-71],[-78,-71],[-78,66],[350,66]
        ],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
        [
            [202,260],[202,-71],[-78,-71],[-78,66],[350,66]
        ],
    ],[],[]
];

//world level
var amountOfTurrets = [
    [
        [14],[11],[15],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[15],[],[],
    ],[],[]
];

var turretPositions = [
    [
        [
            [-40, -24, false],[27, -24, false],[96, -24, false],[-109, -24, false],[-176, -24, false],[-243, -24, false],[-40, 38, false],[-40, 103, false],[-40, 166, false],[-40, 230, false],[124,121,false],[124,185,false],[192,121,false],[192,185,false]
        ],
        [
            [-275, -69, false],[-205, 98, false],[-204, 171, false],[-206, 244, false],[-56, -70, false],[-48, 244, false],[5, 161, false],[58, 69, false],[116, -17, false],[191, -17, false],[264, -17,false]
        ],
        [
            [-231, 196, false],[-158, 196, false],[-82, 196, false],[-10, 196, false],[63, 196, false],[139, 196, false],[-10, 133, false],[63, 133, false],[139, 133, false],[-10, -3, false],[63,-3,false],[139,-3,false],[-145,-3,false],[278,-3,false],[278, 164, false]
        ],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
        [
            [-231, 196, false],[-158, 196, false],[-82, 196, false],[-10, 196, false],[63, 196, false],[139, 196, false],[-10, 133, false],[63, 133, false],[139, 133, false],[-10, -3, false],[63,-3,false],[139,-3,false],[-145,-3,false],[278,-3,false],[278, 164, false]
        ],[],[],
    ],[],[]
];

var globalFile = {
    
    getWorld1UnL:function()
    {
        return world1Unlocked;
    },
    
    setWorld1UnL: function()
    {
        world1Unlocked = true;
    },
    
    getWorld2UnL:function()
    {
        return world2Unlocked;
    },
    
    setWorld2UnL: function()
    {
        world2Unlocked = true;
    },
    
    getWorld3UnL:function()
    {
        return world3Unlocked;
    },
    
    setWorld3UnL: function()
    {
        world3Unlocked = true;
    },
    
    getAllSpottedEnemies:function()
    {
        return enemySpotted;
    },
    
    getAllSpottedTowers:function()
    {
        return towerSpotted;
    },
    
    getAllBoughtTowers: function(){
        return boughtTowers;
    },
    
    getAllBoughtLevels: function(){
        return boughtLevels;
    },
    
    setEnemySpotted: function(type){
        for(let i = 0 ; i < enemySpotted.length ; i++){
            if(enemySpotted[i][0] == type){
                enemySpotted[i][1] = true;
                break;
            }
        }
    },
    
    setTowerSpotted: function(type){
        for(let i = 0 ; i < towerSpotted.length ; i++){
            if(towerSpotted[i][0] == type){
                towerSpotted[i][1] = true;
                break;
            }
        }
    },
        
    setTowerBought: function(type){
        for(let i = 0 ; i < boughtTowers.length ; i++){
            if(boughtTowers[i][0] == type){
                boughtTowers[i][1] = true;
                turretTypes.push(type);
                break;
            }
        }
    },
    
    setLevelBought: function(level){
        world1Data[level - 1][2] = false;
        for(let i = 0 ; i < boughtLevels.length ; i++){
            if(boughtLevels[i][0] == level){
                boughtLevels[i][1] = true;
                break;
            }
        }
    },
    
    getWorldPressed: function()
    {
        return worldPressed;
    },
    
    setWorldPressed: function(number)
    {
        worldPressed = number;
    },
    
    getLevelPressed: function()
    {
        return levelPressed;
    },
    
    setLevelPressed: function(number)
    {
        levelPressed = number;
    },
    
    getLevelAmountPerWorld: function()
    {
        return levelAmountPerWorld[worldPressed - 1];
    },
    
    getAmountClearedWorld1: function()
    {
        var count = 0;
        for(let i = 0 ; i < levelAmountPerWorld[0] ; i++){
            if(world1Data[i][1] == true){
                count++;
            }
        }
        return count;
    },
    
    getAmountUnlockedWorld1: function()
    {
        var count = 0;
        for(let i = 0 ; i < levelAmountPerWorld[0] ; i++){
            if(world1Data[i][2] == false){
                count++;
            }
        }
        return count;
    },
    
    getWorld1Data: function()
    {
        return world1Data;
    },
    
    getLevelDataWorld1: function(level)
    {
        return world1Data[level - 1];
    },
    
    setLevelClearWorld1: function()
    {
        world1Data[levelPressed - 1][1] = true;
        world1Data[levelPressed][2] = false;
    },
    
    setLevelPointsWorld1: function(seconds, grade){
        world1Data[levelPressed - 1][3] = seconds;
        world1Data[levelPressed - 1][4] = grade;
    },
    
    getWorld1EnemyTypesSpecificLevel: function() {
        return world1EnemyTypes[levelPressed - 1];
    },
    
    getSpawnerPointX: function() {
        return spawnPoints[worldPressed - 1][levelPressed - 1][0];
    },
    
    getSpawnerPointY: function() {
        return spawnPoints[worldPressed - 1][levelPressed - 1][1];
    },
    
    getAllTowerTypes: function() {
        return turretTypes;
    },
    
    getEndingPoint: function() {
        return cc.p(endPoints[worldPressed - 1][levelPressed - 1][0], endPoints[worldPressed - 1][levelPressed - 1][1]);
    },
    
    getCorrectPath: function() {
        return correctPath[worldPressed - 1][levelPressed - 1];
    },
    
    getAmountOfTurrets: function() {
        return amountOfTurrets[worldPressed - 1][levelPressed - 1];
    },
    
    getAmountOfFreeTurrets: function() {
        var count = 0;
        var positions = turretPositions[worldPressed - 1][levelPressed - 1];
        for(let i = 0 ; i < positions.length ; i++){
            if(positions[i][2] == false){
                count++;
            }
        }
        return count;
    },
    
    getTurretPositions: function() {
        return turretPositions[worldPressed - 1][levelPressed - 1];
    },
    
    setTowerPositions: function(place) {
        turretPositions[worldPressed - 1][levelPressed - 1][place][2] = true;
    },
    
    resetTowerPlacement: function(){
        for(let i = 0 ; i < turretPositions[worldPressed - 1][levelPressed - 1].length ; i++){
            turretPositions[worldPressed - 1][levelPressed - 1][i][2] = false;
        }
    },
    
    getSeconds: function() {
      return world1Data[levelPressed - 1][3];  
    },
    
    getGrade: function() {
        return world1Data[levelPressed - 1][4];
    },
    
    saveGame: function() {
        cc.sys.localStorage.clear();
        //unlocked
        cc.sys.localStorage.setItem( JSON.stringify("world1") , world1Unlocked );
        cc.sys.localStorage.setItem( JSON.stringify("world2") , world2Unlocked );
        cc.sys.localStorage.setItem( JSON.stringify("world3") , world3Unlocked );
        
        //spotted
        cc.sys.localStorage.setItem( JSON.stringify("enemySpotted1") , enemySpotted[0][1]);
        cc.sys.localStorage.setItem( JSON.stringify("enemySpotted2") , enemySpotted[1][1]);
        cc.sys.localStorage.setItem( JSON.stringify("enemySpotted3") , enemySpotted[2][1]);
        cc.sys.localStorage.setItem( JSON.stringify("enemySpotted4") , enemySpotted[3][1]);
        
        cc.sys.localStorage.setItem( JSON.stringify("towerSpotted1") , towerSpotted[0][1]);
        cc.sys.localStorage.setItem( JSON.stringify("towerSpotted2") , towerSpotted[1][1]);
        cc.sys.localStorage.setItem( JSON.stringify("towerSpotted3") , towerSpotted[2][1]);
        cc.sys.localStorage.setItem( JSON.stringify("towerSpotted4") , towerSpotted[3][1]);
        cc.sys.localStorage.setItem( JSON.stringify("towerSpotted5") , towerSpotted[4][1]);
        cc.sys.localStorage.setItem( JSON.stringify("towerSpotted6") , towerSpotted[5][1]);
        cc.sys.localStorage.setItem( JSON.stringify("towerSpotted7") , towerSpotted[6][1]);
        cc.sys.localStorage.setItem( JSON.stringify("towerSpotted8") , towerSpotted[7][1]);
        
        //turrettypes
        cc.sys.localStorage.setItem( JSON.stringify("typesLength") , turretTypes.length );
        for(let i = 0 ; i < turretTypes.length ; i++){
            var key = "type" + i;
            var JSONKey = JSON.stringify(key);
            cc.sys.localStorage.setItem( JSONKey , turretTypes[i]);
        }
        
        //bought
        cc.sys.localStorage.setItem( JSON.stringify("boughtLevels1") , boughtLevels[0][1] );
        cc.sys.localStorage.setItem( JSON.stringify("boughtLevels2") , boughtLevels[1][1] );
        cc.sys.localStorage.setItem( JSON.stringify("boughtLevels3") , boughtLevels[2][1] );
        
        cc.sys.localStorage.setItem( JSON.stringify("boughtTowers1") , boughtTowers[0][1] );
        cc.sys.localStorage.setItem( JSON.stringify("boughtTowers2") , boughtTowers[1][1] );
        cc.sys.localStorage.setItem( JSON.stringify("boughtTowers3") , boughtTowers[2][1] );
        cc.sys.localStorage.setItem( JSON.stringify("boughtTowers4") , boughtTowers[3][1] );
        
        //world data
        for(let i = 0 ; i < 4 ; i++){
            for(let j = 0 ; j < 6 ; j++){
                var key = "world1Data_" + i + "_" + j;
                var JSONKey = JSON.stringify(key);
                cc.sys.localStorage.setItem( JSONKey , world1Data[i][j]);
            }
        }
    },
    
    loadGame: function() {
        world1Unlocked = (cc.sys.localStorage.getItem( JSON.stringify("world1")) === "true");
        world2Unlocked = (cc.sys.localStorage.getItem( JSON.stringify("world2")) === "true");
        world3Unlocked = (cc.sys.localStorage.getItem( JSON.stringify("world3")) === "true");
        
        enemySpotted[0][1] = (cc.sys.localStorage.getItem( JSON.stringify("enemySpotted1")) === "true");
        enemySpotted[1][1] = (cc.sys.localStorage.getItem( JSON.stringify("enemySpotted2")) === "true");
        enemySpotted[2][1] = (cc.sys.localStorage.getItem( JSON.stringify("enemySpotted3")) === "true");
        enemySpotted[3][1] = (cc.sys.localStorage.getItem( JSON.stringify("enemySpotted4")) === "true");
        
        towerSpotted[0][1] = (cc.sys.localStorage.getItem( JSON.stringify("towerSpotted1")) === "true");
        towerSpotted[1][1] = (cc.sys.localStorage.getItem( JSON.stringify("towerSpotted2")) === "true");
        towerSpotted[2][1] = (cc.sys.localStorage.getItem( JSON.stringify("towerSpotted3")) === "true");
        towerSpotted[3][1] = (cc.sys.localStorage.getItem( JSON.stringify("towerSpotted4")) === "true");
        towerSpotted[4][1] = (cc.sys.localStorage.getItem( JSON.stringify("towerSpotted5")) === "true");
        towerSpotted[5][1] = (cc.sys.localStorage.getItem( JSON.stringify("towerSpotted6")) === "true");
        towerSpotted[6][1] = (cc.sys.localStorage.getItem( JSON.stringify("towerSpotted7")) === "true");
        towerSpotted[7][1] = (cc.sys.localStorage.getItem( JSON.stringify("towerSpotted8")) === "true"); 
        
        var length = parseInt(cc.sys.localStorage.getItem( JSON.stringify("typesLength")));
        for(let i = 0 ; i < length ; i++){
            var key = "type" + i;
            var JSONKey = JSON.stringify(key);
            turretTypes[i] = cc.sys.localStorage.getItem( JSONKey ); 
        }
        
        boughtLevels[0][1] = (cc.sys.localStorage.getItem( JSON.stringify("boughtLevels1")) === "true");
        boughtLevels[1][1] = (cc.sys.localStorage.getItem( JSON.stringify("boughtLevels2")) === "true");
        boughtLevels[2][1] = (cc.sys.localStorage.getItem( JSON.stringify("boughtLevels3")) === "true");
        
        boughtTowers[0][1] = (cc.sys.localStorage.getItem( JSON.stringify("boughtTowers1")) === "true");
        boughtTowers[1][1] = (cc.sys.localStorage.getItem( JSON.stringify("boughtTowers2")) === "true");
        boughtTowers[2][1] = (cc.sys.localStorage.getItem( JSON.stringify("boughtTowers3")) === "true");
        boughtTowers[3][1] = (cc.sys.localStorage.getItem( JSON.stringify("boughtTowers4")) === "true");
        
        for(let i = 0 ; i < 4 ; i++){
            var key = "world1Data_" + i + "_" + 0;
            var JSONKey = JSON.stringify(key);
            world1Data[i][0] = parseInt(cc.sys.localStorage.getItem( JSONKey ));
            
            var key = "world1Data_" + i + "_" + 1;
            var JSONKey = JSON.stringify(key);
            world1Data[i][1] = (cc.sys.localStorage.getItem( JSONKey ) === "true");
            
            var key = "world1Data_" + i + "_" + 2;
            var JSONKey = JSON.stringify(key);
            world1Data[i][2] = (cc.sys.localStorage.getItem( JSONKey ) === "true");
            
            var key = "world1Data_" + i + "_" + 3;
            var JSONKey = JSON.stringify(key);
            world1Data[i][3] = parseInt(cc.sys.localStorage.getItem( JSONKey ));
            
            var key = "world1Data_" + i + "_" + 4;
            var JSONKey = JSON.stringify(key);
            world1Data[i][4] = cc.sys.localStorage.getItem( JSONKey );
            
            var key = "world1Data_" + i + "_" + 5;
            var JSONKey = JSON.stringify(key);
            world1Data[i][5] = cc.sys.localStorage.getItem( JSONKey ); 
        }
    },
    
    loadGame1: function() {
        world1Unlocked = true;
    },
    
    loadGame2: function() {
        world1Unlocked = true;
        world1Data[0][1] = true;
        world1Data[0][2] = false;
        world1Data[0][3] = 201;
        world1Data[0][4] = "grade_B";
        world1Data[0][5] = null;
        world1Data[1][1] = true;
        world1Data[1][2] = false;
        world1Data[1][3] = 223;
        world1Data[1][4] = "grade_D";
        world1Data[1][5] = null;
        world1Data[2][2] = false;
    }
}

module.exports = globalFile;
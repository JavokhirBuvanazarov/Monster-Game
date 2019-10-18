new Vue({
   el:'#app',
   data:{
       gameIsRunning:false,
       playerHealth:100,
       monsterHealth:100,
       turns:[]
   },
    methods:{
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack(){
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text:'Player hits the Monster for :' + damage
            });
            if(this.checkWin()){
                return;
            }
            this.monsterAttack();
        },
        specialAttack(){
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text:'Player hits the Monster hard for :' + damage
            });
            if(this.checkWin()){
                return;
            }
            this.monsterAttack();
        },
        monsterAttack(){
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text:'Monster hits the Player for :' + damage
            });
            this.checkWin();
        },
        heal(){
            if( this.playerHealth <= 90){
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: false,
                text:'Player heals for 10:'
            });
            this.monsterAttack();
        },
        giveUp(){
            this.gameIsRunning = false;
        },
        calculateDamage(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin(){
            if(this.monsterHealth <= 0){
                if(confirm('You won! New Game?')){
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0){
                if(confirm('You lost! New Game?')){
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});

// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

// Wrap the game logic in a startGame() function
//      When the player is defeated or there are no more enemies, call an endGame() function that:
//      Alerts the player's total stats
//      Asks the player if they want to play again
//      If yes, call startGame() to restart the game
// After the player skips or defeats an enemy (and there are still more robots to fight):
//      Ask the player if they want to "shop"
//      If no, continue as normal
//      If yes, call the shop() function
//      In the shop() function, ask player if they want to "refill" health, "upgrade" attack, or "leave" the shop
//      If refill, subtract money points from player and increase health
//      If upgrade, subtract money points from player and increase attack power
//      If leave, alert goodbye and exit the function
//      If any other invalid option, call shop() again

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;
// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth, playerMoney);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
console.log(enemyNames.length);

// for(var i = 0; i < enemyNames.length; i++) {
//     console.log(enemyNames[i]);
//   }

// console.log(enemyNames[i]);
// console.log(i);
// console.log(enemyNames[i] + " is at " + i + " index");

var enemyHealth = 50;
var enemyAttack = 12;


var fight = function (enemyName) {

    // repeat and execute as long as the enemy robot is alive 
    while (enemyHealth > 0 && playerHealth > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        console.log(promptFight);
        // if player choses to skip
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm user wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                // subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney)
                break;
            }
        }

        //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
        enemyHealth = enemyHealth - playerAttack;
        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            playerMoney = playerMoney + 20;
            //leave loop since enemy is dead
            break;

        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
        playerHealth = playerHealth - enemyAttack;
        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        // check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;

        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
};


//when fight function is called, it passes thru each enemyName (it's able to pass numerically bc of first parentheses)
var startGame = function () {
    // debugger;
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            var pickedEnemyName = enemyNames[i];

            enemyHealth = 50;

            fight(pickedEnemyName);

            //if we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                if (storeConfirm) {
                    shop();
                }
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    endGame();
};

var endGame = function () {
    window.alert("the game has now ended. Let's see how you did!")
    if (playerHealth > 0) {
        window.alert("Great Job, you've survived the game! You now have a score of " + playerMoney + ".")
    }
    else {
        window.alert("You've lost your robot in battle.")
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!")
    }
};

var shop = function () {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");
                //increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }

            break;
        case "UPGRADE":
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");
                //increase attack deacrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }

            break;
        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            //call shop again to force player to pick valid option
            shop();

            break;
    }
};

// fight(enemyNames[i]);
startGame();






        // // if no (false), ask question again by running fight() again
        // else {
        //     fight();
        // }
        //         } else {
        //     // window.alert("You need to pick a valid option. Try again!");
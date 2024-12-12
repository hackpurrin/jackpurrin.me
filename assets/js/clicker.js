let money = 0;
let mpc = 1;
let mpcCost = 10;
let mps = 0;
let mpsCost = 50;

const moneyDisplay = document.getElementById("money");
const mpcDisplay = document.getElementById("mpc");
const mpcCostDisplay = document.getElementById("mpcCost");
const mpsDisplay = document.getElementById("mps");
const mpsCostDisplay = document.getElementById("mpsCost");

function saveGame() {
    +localStorage.setItem("savedMoney", money);
    +localStorage.setItem("savedMPC", mpc);
    +localStorage.setItem("savedMPCC", mpcCost);
    +localStorage.setItem("savedMPS", mps);
    +localStorage.setItem("savedMPSC", mpsCost);
    updateDisplay()
}

function loadGame() {
    money = +localStorage.getItem("savedMoney");
    mpc = +localStorage.getItem("savedMPC");
    mpcCost = +localStorage.getItem("savedMPCC");
    mps = +localStorage.getItem("savedMPS");
    mpsCost = +localStorage.getItem("savedMPSC");
    updateDisplay()
}

function resetGame() {
  localstorage.clear("savedMoney");
  localstorage.clear("savedMPC");
  localstorage.clear("savedMPCC");
  localstorage.clear("savedMPS");
  localstorage.clear("savedMPSC");
}

function updateDisplay() {
  moneyDisplay.textContent = money;
  mpcDisplay.textContent = mpc;
  mpcCostDisplay.textContent = mpcCost;
  mpsDisplay.textContent = mps;
  mpsCostDisplay.textContent = mpsCost;
}

function clickCookie() {
  money += mpc; // Increase money by MPC
  updateDisplay();
  saveGame();
}

function upgradeMPC() {
  if (money >= mpcCost) {
    money -= mpcCost;
    mpc++; // Increase MPC
    mpcCost *= 1.3; // Increase cost for next upgrade
    mpcCost = Math.ceil(mpcCost); 
    updateDisplay();
    saveGame();
  } else {
  }
}

function buyMPS() {
  if (money >= mpsCost) {
    money -= mpsCost;
    mps++; // Increase MPS
    mpsCost *= 1.3; // Increase cost for next purchase
    mpsCost = Math.ceil(mpsCost); 
    // Automatically add money every second
    setInterval(function() {
      money += mps;
      updateDisplay();
      saveGame();
    }, 1000);
    updateDisplay();
  } else {
  }
}

updateDisplay();

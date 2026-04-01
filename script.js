let inventory = {};
let goals = [];

function addItem() {
    const name = document.getElementById("itemName").value;
    const amount = parseInt(document.getElementById("itemAmount").value);

    if (!name || isNaN(amount)) return;

    if (!inventory[name]) {
        inventory[name] = 0;
    }

    inventory[name] += amount;
    renderInventory();
}

function renderInventory() {
    const list = document.getElementById("inventoryList");
    list.innerHTML = "";

    for (let item in inventory) {
        const li = document.createElement("li");
        li.textContent = item + ": " + inventory[item];
        list.appendChild(li);
    }
}

function addGoal() {
    const goal = document.getElementById("goalName").value;

    if (!goal) return;

    goals.push(goal);
    renderGoals();
}

function renderGoals() {
    const list = document.getElementById("goalList");
    list.innerHTML = "";

    goals.forEach(goal => {
        const li = document.createElement("li");
        li.textContent = goal;
        list.appendChild(li);
    });
}

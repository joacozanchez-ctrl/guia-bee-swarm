// DEBUG
console.log(itemsData);

// ===== STATE =====
let inventory = {};
let goals = [];

// ===== INIT =====
function init() {
    renderInventory();
    renderItems();
    renderGoals();
}

// ===== INVENTORY =====
function renderInventory() {
    const container = document.getElementById("inventory");
    container.innerHTML = "";

    itemsData.forEach(item => {
        if (!inventory[item.name]) inventory[item.name] = 0;

        const div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
            <span>${item.name}</span>
            <div>
                <button onclick="changeAmount('${item.name}', -1)">-</button>
                <input type="number" value="${inventory[item.name]}" 
                       onchange="setAmount('${item.name}', this.value)" style="width:50px;">
                <button onclick="changeAmount('${item.name}', 1)">+</button>
            </div>
        `;

        container.appendChild(div);
    });
}

function changeAmount(name, value) {
    inventory[name] = Math.max(0, (inventory[name] || 0) + value);
    renderInventory();
    renderGoals();
}

function setAmount(name, value) {
    inventory[name] = Math.max(0, parseInt(value) || 0);
    renderGoals();
}

// ===== ITEMS =====
function renderItems() {
    const container = document.getElementById("items");
    container.innerHTML = "";

    itemsData.forEach(item => {
        const div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
            <span>${item.name}</span>
            <button onclick="addGoal('${item.name}')">Agregar</button>
        `;

        container.appendChild(div);
    });
}

// ===== GOALS =====
function addGoal(name) {
    if (!goals.includes(name)) {
        goals.push(name);
        renderGoals();
    }
}

function removeGoal(name) {
    goals = goals.filter(g => g !== name);
    renderGoals();
}

// ===== 🌳 ÁRBOL CON COMPARACIÓN =====
function getRecipeTree(itemName, multiplier = 1) {
    const item = itemsData.find(i => i.name === itemName);

    if (!item || !item.recipe) return null;

    let result = [];

    for (let mat in item.recipe) {
        const totalAmount = item.recipe[mat] * multiplier;
        const have = inventory[mat] || 0;
        const missing = Math.max(0, totalAmount - have);

        const subItem = itemsData.find(i => i.name === mat);

        let status = "";
        if (missing === 0) {
            status = "✅";
        } else {
            status = `❌ faltan ${missing}`;
        }

        if (subItem && subItem.recipe) {
            const subTree = getRecipeTree(mat, totalAmount);

            let subText = "";
            if (subTree) {
                subText = " (" + subTree.join(" | ") + ")";
            }

            result.push(`${mat}: ${totalAmount} ${status}${subText}`);
        } else {
            result.push(`${mat}: ${totalAmount} ${status}`);
        }
    }

    return result;
}

// ===== RENDER GOALS =====
function renderGoals() {
    const container = document.getElementById("goals");
    container.innerHTML = "";

    goals.forEach(goal => {
        const item = itemsData.find(i => i.name === goal);

        let text = "";

        if (item && item.recipe) {
            const tree = getRecipeTree(goal, 1);

            if (tree) {
                text = tree.join("<br>");
            }
        }

        const div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
            <div>
                <strong>${goal}</strong><br>
                <small>${text || "Sin receta"}</small>
            </div>
            <button onclick="removeGoal('${goal}')">X</button>
        `;

        container.appendChild(div);
    });
}

// ===== START =====
window.onload = init;

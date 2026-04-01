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

// ===== 🌳 ÁRBOL CLARO Y SIMPLE =====
function getRecipeTree(itemName, multiplier = 1, level = 0) {
    const item = itemsData.find(i => i.name === itemName);
    if (!item || !item.recipe) return "";

    let result = "";

    for (let mat in item.recipe) {
        const totalAmount = item.recipe[mat] * multiplier;
        const have = inventory[mat] || 0;
        const missing = Math.max(0, totalAmount - have);

        const subItem = itemsData.find(i => i.name === mat);

        let status = missing === 0 ? "(OK)" : `(Faltan ${missing})`;

        let symbol = level === 0 ? ">" : "-";

        let nameStyle = level === 0
            ? "font-weight:bold; color:#000;"
            : "color:#555;";

        let amountColor = missing === 0 ? "#2e7d32" : "#c62828";

        result += `
            <div style="margin-left:${level * 20}px;">
                <span style="${nameStyle}">
                    ${symbol} ${mat}
                </span>: 
                <span style="color:${amountColor}">
                    ${totalAmount} ${status}
                </span>
            </div>
        `;

        if (subItem && subItem.recipe) {
            result += getRecipeTree(mat, totalAmount, level + 1);
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
            text = getRecipeTree(goal, 1);
        }

        const div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
            <div>
                <strong>${goal}</strong>
                <div style="margin-top:5px;">
                    ${text || "Sin receta"}
                </div>
            </div>
            <button onclick="removeGoal('${goal}')">X</button>
        `;

        container.appendChild(div);
    });
}

// ===== START =====
window.onload = init;        container.appendChild(div);
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
            <span style="font-size:20px;">${item.emoji || "📦"}</span>
            <span style="margin-left:8px;">${item.name}</span>
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

// ===== 🌳 ÁRBOL PRO VISUAL =====
function getRecipeTree(itemName, multiplier = 1, level = 0) {
    const item = itemsData.find(i => i.name === itemName);
    if (!item || !item.recipe) return "";

    let result = "";

    for (let mat in item.recipe) {
        const totalAmount = item.recipe[mat] * multiplier;
        const have = inventory[mat] || 0;
        const missing = Math.max(0, totalAmount - have);

        const subItem = itemsData.find(i => i.name === mat);

        let status = missing === 0 ? "✅" : `❌ ${missing}`;
        let symbol = level === 0 ? "◆" : "•";

        let color = missing === 0 ? "#2e7d32" : "#c62828";

        let nameStyle = level === 0
            ? `font-weight:bold; color:#111;`
            : `color:#666;`;

        const emoji = subItem?.emoji || "📦";

        result += `
            <div style="margin-left:${level * 20}px; display:flex; align-items:center; gap:6px;">
                <span>${emoji}</span>
                <span style="${nameStyle}">
                    ${symbol} ${mat}
                </span>
                <span style="color:${color}">
                    (${totalAmount} ${status})
                </span>
            </div>
        `;

        if (subItem && subItem.recipe) {
            result += getRecipeTree(mat, totalAmount, level + 1);
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
            text = getRecipeTree(goal, 1);
        }

        const div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
            <div>
                <span style="font-size:22px;">${item?.emoji || "🎯"}</span>
                <strong style="margin-left:8px;">${goal}</strong>
                <div style="margin-top:5px;">
                    ${text || "Sin receta"}
                </div>
            </div>
            <button onclick="removeGoal('${goal}')">X</button>
        `;

        container.appendChild(div);
    });
}

// ===== START =====
window.onload = init;

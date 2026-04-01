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
}

function setAmount(name, value) {
    inventory[name] = Math.max(0, parseInt(value) || 0);
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

// ===== 🔥 CALCULO RECURSIVO =====
function calculateRequirements(itemName, multiplier = 1, result = {}) {
    const item = itemsData.find(i => i.name === itemName);

    // Si no existe o no tiene receta → material base
    if (!item || !item.recipe) {
        result[itemName] = (result[itemName] || 0) + multiplier;
        return result;
    }

    // Recorrer receta
    for (let mat in item.recipe) {
        const amount = item.recipe[mat] * multiplier;

        const subItem = itemsData.find(i => i.name === mat);

        if (subItem && subItem.recipe) {
            // Tiene receta → seguir bajando
            calculateRequirements(mat, amount, result);
        } else {
            // Material base
            result[mat] = (result[mat] || 0) + amount;
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

        let missingText = "";

        if (item) {
            const requirements = calculateRequirements(goal);

            for (let mat in requirements) {
                const needed = requirements[mat];
                const have = inventory[mat] || 0;
                const missing = Math.max(0, needed - have);

                if (missing > 0) {
                    missingText += `${mat}: faltan ${missing} | `;
                }
            }
        }

        const div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
            <div>
                <strong>${goal}</strong><br>
                <small>${missingText || "✅ Completo"}</small>
            </div>
            <button onclick="removeGoal('${goal}')">X</button>
        `;

        container.appendChild(div);
    });
}

// ===== START (IMPORTANTE) =====
window.onload = init;
function changeAmount(name, value) {
    inventory[name] = Math.max(0, (inventory[name] || 0) + value);
    renderInventory();
}

function setAmount(name, value) {
    inventory[name] = Math.max(0, parseInt(value) || 0);
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

function renderGoals() {
    const container = document.getElementById("goals");
    container.innerHTML = "";

    goals.forEach(goal => {
        const item = itemsData.find(i => i.name === goal);

        let missingText = "";

        if (item && item.recipe) {
            for (let mat in item.recipe) {
                const needed = item.recipe[mat];
                const have = inventory[mat] || 0;
                const missing = Math.max(0, needed - have);

                if (missing > 0) {
                    missingText += `${mat}: faltan ${missing} | `;
                }
            }
        }

        const div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
            <div>
                <strong>${goal}</strong><br>
                <small>${missingText || "✅ Completo o sin receta"}</small>
            </div>
            <button onclick="removeGoal('${goal}')">X</button>
        `;

        container.appendChild(div);
    });
}

function removeGoal(name) {
    goals = goals.filter(g => g !== name);
    renderGoals();
}

// ===== START =====
window.onload = init;

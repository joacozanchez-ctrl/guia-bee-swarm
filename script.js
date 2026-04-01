
        if (item.recipe) {
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
                <small>${missingText || "✅ Completo"}</small>
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
init();

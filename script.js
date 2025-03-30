const levelData = {
    240: { "完成コスト": 100, "ガチャ回数": 2.7 },
    250: { "完成コスト": 115, "ガチャ回数": 3.1 },
    260: { "完成コスト": 130, "ガチャ回数": 3.5 },
    270: { "完成コスト": 150, "ガチャ回数": 4 },
    280: { "完成コスト": 170, "ガチャ回数": 4.6 },
    290: { "完成コスト": 190, "ガチャ回数": 5.1 },
    300: { "完成コスト": 215, "ガチャ回数": 5.8 },
    310: { "完成コスト": 240, "ガチャ回数": 6.4 },
    320: { "完成コスト": 265, "ガチャ回数": 7.1 },
    330: { "完成コスト": 290, "ガチャ回数": 7.8 },
    340: { "完成コスト": 320, "ガチャ回数": 8.6 },
    350: { "完成コスト": 350, "ガチャ回数": 9.4 },
    360: { "完成コスト": 380, "ガチャ回数": 10.2 },
    370: { "完成コスト": 410, "ガチャ回数": 11 },
    380: { "完成コスト": 440, "ガチャ回数": 11.8 },
    390: { "完成コスト": 470, "ガチャ回数": 12.6 },
    400: { "完成コスト": 500, "ガチャ回数": 13.4 },
    410: { "完成コスト": 530, "ガチャ回数": 14.2 },
    420: { "完成コスト": 560, "ガチャ回数": 15 },
    430: { "完成コスト": 590, "ガチャ回数": 15.8 },
    440: { "完成コスト": 620, "ガチャ回数": 16.6 },
    450: { "完成コスト": 650, "ガチャ回数": 17.4 },
    460: { "完成コスト": 680, "ガチャ回数": 18.2 },
    470: { "完成コスト": 710, "ガチャ回数": 19 },
    480: { "完成コスト": 740, "ガチャ回数": 19.8 },
    490: { "完成コスト": 770, "ガチャ回数": 20.6 },
    500: { "完成コスト": 800, "ガチャ回数": 21.4 },
    510: { "完成コスト": 830, "ガチャ回数": 22.2 },
    520: { "完成コスト": 860, "ガチャ回数": 23 },
    530: { "完成コスト": 900, "ガチャ回数": 24 },
    540: { "完成コスト": 940, "ガチャ回数": 25.1 },
    550: { "完成コスト": 980, "ガチャ回数": 26.2 },
    560: { "完成コスト": 1020, "ガチャ回数": 27.2 },
    570: { "完成コスト": 1060, "ガチャ回数": 28.3 },
    580: { "完成コスト": 1100, "ガチャ回数": 29.4 },
    590: { "完成コスト": 1140, "ガチャ回数": 30.4 },
    600: { "完成コスト": 1180, "ガチャ回数": 31.5 }
};

function calculateCost() {
    const levelInput = document.getElementById("singleLevelInput");
    const completionCostSpan = document.getElementById("completionCost");
    const gachaCountSpan = document.getElementById("gachaCount");

    const level = parseInt(levelInput.value);

    if (level in levelData) {
        completionCostSpan.textContent = levelData[level]["完成コスト"];
        gachaCountSpan.textContent = levelData[level]["ガチャ回数"] + " 周";
    } else {
        completionCostSpan.textContent = "該当なし";
        gachaCountSpan.textContent = "該当なし";
    }
}

function calculateRequiredPulls() {
    const currentLevelInput = document.getElementById("currentLevelInput");
    const targetLevelInput = document.getElementById("targetLevelInput");
    const requiredPullsArea = document.getElementById("requiredPullsArea");

    const currentLevel = parseInt(currentLevelInput.value);
    const targetLevel = parseInt(targetLevelInput.value);

    if (isNaN(currentLevel) || isNaN(targetLevel)) {
        requiredPullsArea.textContent = "レベルを正しく入力してください。";
        return;
    }

    if (!(currentLevel in levelData) || !(targetLevel in levelData)) {
        requiredPullsArea.textContent = "入力されたレベルはデータに存在しません。";
        return;
    }

    if (currentLevel >= targetLevel) {
        requiredPullsArea.textContent = "目標レベルは現在のレベルより高く設定してください。";
        return;
    }

    const currentCompletionCost = levelData[currentLevel]["完成コスト"];
    const targetCompletionCost = levelData[targetLevel]["完成コスト"];

    const requiredEvolutionCount = targetCompletionCost - currentCompletionCost;
    const expectedRequiredPulls = (requiredEvolutionCount / 50) * 74;
    const requiredCycles = expectedRequiredPulls / 50;

    requiredPullsArea.textContent = `目標レベルに達するまであと ${requiredCycles.toFixed(2)} 周、あと ${requiredEvolutionCount} 個です。`;
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        calculateRequiredPulls();
    }
}

function handleKeyPressSingle(event) {
    if (event.key === "Enter") {
        calculateCost();
    }
}

function focusTargetLevel(event) {
    if (event.key === "Enter") {
        document.getElementById("targetLevelInput").focus();
    }
}
let result = '';
let big = '';
let small = '';
let cockroach = '';
let history = [];

function setResult(val) {
    result = val;
}

function setEye(type, val) {
    if (type === 'big') big = val;
    if (type === 'small') small = val;
    if (type === 'cockroach') cockroach = val;
}

function addEntry() {
    if (!result || !big || !small || !cockroach) {
        alert("กรุณาใส่ผลครบทั้ง 4 ช่อง");
        return;
    }
    const pattern = big + small + cockroach;
    const prev = getStats(pattern);
    const ask = pattern;
    const suggestion = suggestByPattern(pattern, prev);

    history.unshift({ result, big, small, cockroach, ask, suggestion, stats: prev });
    renderTable();
    result = big = small = cockroach = '';
}

function getStats(pattern) {
    let P = 0, B = 0;
    for (let item of history) {
        if (item.big + item.small + item.cockroach === pattern) {
            if (item.result === 'P') P++;
            if (item.result === 'B') B++;
        }
    }
    return { P, B };
}

function suggestByPattern(pattern, stats) {
    if (stats.P > stats.B) return 'ตาม P';
    if (stats.B > stats.P) return 'ตาม B';
    return '⚠️ ไม่ชัดเจน';
}

function renderTable() {
    const tbody = document.getElementById('historyBody');
    tbody.innerHTML = '';
    history.forEach((item, i) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${item.result}</td>
            <td>${item.big}</td>
            <td>${item.small}</td>
            <td>${item.cockroach}</td>
            <td>${item.ask}</td>
            <td>${item.suggestion}</td>
            <td>P=${item.stats.P} / B=${item.stats.B}</td>
        `;
        tbody.appendChild(row);
    });
}

function resetAll() {
    history = [];
    document.getElementById('historyBody').innerHTML = '';
}

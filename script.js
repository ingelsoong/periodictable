const elements = [
    { number: 1, symbol: 'H', name: 'Hydrogen', atomicWeight: 1.008 },
    { number: 2, symbol: 'He', name: 'Helium', atomicWeight: 4.0026 },
    { number: 3, symbol: 'Li', name: 'Lithium', atomicWeight: 6.94 },
    // Add more elements here...
];

function createPeriodicTable() {
    const table = document.getElementById('periodic-table');
    elements.forEach(element => {
        const elementDiv = document.createElement('div');
        elementDiv.className = 'element';
        elementDiv.innerHTML = `<strong>${element.symbol}</strong><br>${element.name}`;
        elementDiv.onclick = () => showElementInfo(element);
        table.appendChild(elementDiv);
    });
}

function showElementInfo(element) {
    const infoDiv = document.getElementById('element-info');
    infoDiv.innerHTML = `
        <h2>${element.name} (${element.symbol})</h2>
        <p>Atomic Number: ${element.number}</p>
        <p>Atomic Weight: ${element.atomicWeight}</p>
    `;
    infoDiv.classList.remove('hidden');
}

createPeriodicTable();

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const historyToggle = document.getElementById('history-toggle');
const body = document.body;

// Match history
let matchHistory = [];
let historyVisible = false;

// Check if theme preference is saved in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon();
} else {
    // Default to system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDarkScheme.matches) {
        body.setAttribute('data-theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
    }
    updateThemeIcon();
}

// Update theme icon based on current theme
function updateThemeIcon() {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) {
        if (body.getAttribute('data-theme') === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// Toggle theme when button is clicked
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
    });
}

// Toggle history modal when button is clicked (if it exists)
if (historyToggle) {
    historyToggle.addEventListener('click', () => {
        historyVisible = !historyVisible;
        updateHistoryDisplay();
    });
}

// Close history modal
const closeHistory = document.getElementById('close-history');
const historyModal = document.getElementById('history-modal');

function closeHistoryModal() {
    if (historyModal) {
        historyModal.style.display = 'none';
        historyVisible = false;
    }
}

if (closeHistory) {
    closeHistory.addEventListener('click', closeHistoryModal);
}

// Close history modal when clicking outside
if (historyModal) {
    historyModal.addEventListener('click', (e) => {
        if (e.target === historyModal) {
            closeHistoryModal();
        }
    });
}

// Brain/History toggle functionality
let isShowingNetwork = false;
const brainToggle = document.getElementById('brain-toggle');
const networkModal = document.getElementById('network-modal');
const closeNetwork = document.getElementById('close-network');
const matchHistoryView = document.getElementById('match-history-view');
const networkView = document.getElementById('network-view');

if (brainToggle) {
    brainToggle.addEventListener('click', () => {
        isShowingNetwork = !isShowingNetwork;

        if (isShowingNetwork) {
            // Switch to network view
            matchHistoryView.style.display = 'none';
            networkView.style.display = 'flex';

            // Change icon to history
            const icon = brainToggle.querySelector('i');
            icon.classList.remove('fa-brain');
            icon.classList.add('fa-history');

            console.log('=== RNN AI Information ===');
            console.log('Current pattern:', pattern);
            console.log('Pattern length:', patternLen);
            console.log('User choices history:', usrChoices);
            console.log('AI choices history:', aiChoices);
            console.log('Match history:', matchHistory);
            console.log('Current score:', score);
            console.log('Game count:', gameCount);

            // If we have a pattern, show AI prediction details
            if (pattern.length > 0) {
                try {
                    const net = new brain.recurrent.LSTMTimeStep();
                    net.train([pattern], { iterations: 200, log: false });
                    const prediction = net.run(pattern);
                    const roundedPrediction = Math.round(prediction);
                    const clampedPrediction = Math.max(1, Math.min(3, roundedPrediction));

                    console.log('AI prediction (raw):', prediction);
                    console.log('AI prediction (rounded):', roundedPrediction);
                    console.log('AI prediction (clamped):', clampedPrediction);
                    console.log('AI will counter with:', clampedPrediction === 1 ? 'Paper (2)' : clampedPrediction === 2 ? 'Scissors (3)' : 'Rock (1)');

                    // Log the neural network model details
                    const modelJSON = net.toJSON();
                    console.log('Neural network model:', modelJSON);

                    // Show network visualization inline
                    showNetworkVisualizationInline(net, pattern);
                } catch (error) {
                    console.error('Error generating AI prediction:', error);
                }
            } else {
                console.log('No pattern available yet - AI will make random choice');
            }
            console.log('========================');
        } else {
            // Switch back to match history
            matchHistoryView.style.display = 'flex';
            networkView.style.display = 'none';

            // Change icon back to brain
            const icon = brainToggle.querySelector('i');
            icon.classList.remove('fa-history');
            icon.classList.add('fa-brain');
        }
    });
}

// Close network modal
function closeNetworkModal() {
    if (networkModal) {
        networkModal.style.display = 'none';
    }
}

if (closeNetwork) {
    closeNetwork.addEventListener('click', closeNetworkModal);
}

// Close modal when clicking outside
if (networkModal) {
    networkModal.addEventListener('click', (e) => {
        if (e.target === networkModal) {
            closeNetworkModal();
        }
    });
}

// Close modals with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeNetworkModal();
        closeHistoryModal();
    }
});

// Function to create LSTM unit visualization inline
function showNetworkVisualizationInline(net, currentPattern) {
    if (typeof vis === 'undefined') {
        console.error('vis.js library not loaded');
        return;
    }

    // Get inline network container
    const container = document.getElementById('network-container-inline');
    container.innerHTML = '';
    
    // Create nodes and edges for single LSTM unit visualization
    const nodes = new vis.DataSet();
    const edges = new vis.DataSet();
    
    // Add external inputs/outputs
    nodes.add([
        { id: 'x_t', label: 'x_t', group: 'input', x: -200, y: 0 },
        { id: 'h_t_prev', label: 'h_{t-1}', group: 'input', x: -200, y: 100 },
        { id: 'c_t_prev', label: 'C_{t-1}', group: 'input', x: -200, y: 200 },
        { id: 'h_t', label: 'h_t', group: 'output', x: 200, y: 100 },
        { id: 'c_t', label: 'C_t', group: 'output', x: 200, y: 200 },
        { id: 'y_t', label: 'y_t', group: 'output', x: 200, y: 0 }
    ]);
    
    // Add LSTM unit container (background)
    nodes.add([
        { id: 'lstm_unit', label: 'LSTM Unit', group: 'container', x: 0, y: 100, width: 300, height: 250 }
    ]);
    
    // Add internal LSTM components (positioned inside the unit)
    const lstmComponents = [
        { id: 'forget_gate', label: 'f_t', group: 'gate', x: -80, y: 20 },
        { id: 'input_gate', label: 'i_t', group: 'gate', x: -80, y: 80 },
        { id: 'candidate', label: 'C̃_t', group: 'gate', x: -80, y: 140 },
        { id: 'output_gate', label: 'o_t', group: 'gate', x: -80, y: 200 },
        { id: 'cell_state', label: 'C_t', group: 'state', x: 80, y: 140 },
        { id: 'hidden_state', label: 'h_t', group: 'state', x: 80, y: 80 }
    ];
    
    nodes.add(lstmComponents);
    
    // Add connections from inputs to gates
    const inputConnections = [
        { from: 'x_t', to: 'forget_gate', label: '', color: { color: '#ff6b6b' } },
        { from: 'x_t', to: 'input_gate', label: '', color: { color: '#ff6b6b' } },
        { from: 'x_t', to: 'candidate', label: '', color: { color: '#ff6b6b' } },
        { from: 'x_t', to: 'output_gate', label: '', color: { color: '#ff6b6b' } },
        { from: 'h_t_prev', to: 'forget_gate', label: '', color: { color: '#4ecdc4' } },
        { from: 'h_t_prev', to: 'input_gate', label: '', color: { color: '#4ecdc4' } },
        { from: 'h_t_prev', to: 'candidate', label: '', color: { color: '#4ecdc4' } },
        { from: 'h_t_prev', to: 'output_gate', label: '', color: { color: '#4ecdc4' } }
    ];
    
    // Add internal connections
    const internalConnections = [
        { from: 'forget_gate', to: 'cell_state', label: 'f_t', color: { color: '#45b7d1' } },
        { from: 'input_gate', to: 'cell_state', label: 'i_t', color: { color: '#45b7d1' } },
        { from: 'candidate', to: 'cell_state', label: 'C̃_t', color: { color: '#45b7d1' } },
        { from: 'c_t_prev', to: 'cell_state', label: 'C_{t-1}', color: { color: '#96ceb4' } },
        { from: 'cell_state', to: 'hidden_state', label: 'C_t', color: { color: '#96ceb4' } },
        { from: 'output_gate', to: 'hidden_state', label: 'o_t', color: { color: '#45b7d1' } }
    ];
    
    // Add output connections
    const outputConnections = [
        { from: 'hidden_state', to: 'h_t', label: '', color: { color: '#feca57' } },
        { from: 'cell_state', to: 'c_t', label: '', color: { color: '#feca57' } },
        { from: 'hidden_state', to: 'y_t', label: '', color: { color: '#feca57' } }
    ];
    
    edges.add([...inputConnections, ...internalConnections, ...outputConnections]);
    
    // Define groups with colors and shapes
    const groups = {
        input: { 
            color: { background: '#ff6b6b', border: '#ff5252' }, 
            font: { color: 'white', size: 12 },
            shape: 'ellipse',
            size: 30
        },
        output: { 
            color: { background: '#feca57', border: '#ff9800' }, 
            font: { color: 'white', size: 12 },
            shape: 'ellipse',
            size: 30
        },
        container: {
            color: { background: 'rgba(100, 100, 100, 0.1)', border: '#666666' },
            font: { color: '#333333', size: 16 },
            shape: 'box',
            margin: 20,
            widthConstraint: 300,
            heightConstraint: 250
        },
        gate: { 
            color: { background: '#45b7d1', border: '#2196f3' }, 
            font: { color: 'white', size: 10 },
            shape: 'ellipse',
            size: 25
        },
        state: { 
            color: { background: '#96ceb4', border: '#4caf50' }, 
            font: { color: 'white', size: 10 },
            shape: 'ellipse',
            size: 25
        }
    };
    
    // Network options
    const options = {
        nodes: {
            shape: 'ellipse',
            margin: 5,
            font: { size: 10 },
            borderWidth: 2,
            shadow: true,
            size: 30
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.8 } },
            font: { size: 11, color: 'white', background: 'rgba(0,0,0,0.7)' },
            color: { color: '#848484', highlight: '#ff6b6b' },
            width: 3,
            smooth: { type: 'continuous' }
        },
        groups: groups,
        physics: {
            enabled: false  // Disable physics for fixed layout
        },
        interaction: {
            hover: true,
            tooltipDelay: 200,
            dragNodes: false,
            dragView: true,
            zoomView: true
        },
        layout: {
            improvedLayout: false
        }
    };
    
    // Create the network
    const network = new vis.Network(container, { nodes, edges }, options);
    
    // Add legend
    const legend = document.createElement('div');
    legend.style.cssText = `
        position: absolute;
        top: 5px;
        right: 5px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 10px;
        border-radius: 8px;
        font-size: 10px;
        z-index: 1001;
        max-width: 180px;
    `;
    legend.innerHTML = `
        <h4 style="margin: 0 0 8px 0; color: #feca57; font-size: 11px;">LSTM Components</h4>
        <div style="display: flex; align-items: center; margin: 4px 0; font-size: 9px;"><div style="width: 12px; height: 12px; background: #ff6b6b; margin-right: 6px; border-radius: 50%;"></div>Inputs</div>
        <div style="display: flex; align-items: center; margin: 4px 0; font-size: 9px;"><div style="width: 12px; height: 12px; background: #45b7d1; margin-right: 6px; border-radius: 50%;"></div>Gates</div>
        <div style="display: flex; align-items: center; margin: 4px 0; font-size: 9px;"><div style="width: 12px; height: 12px; background: #96ceb4; margin-right: 6px; border-radius: 50%;"></div>States</div>
        <div style="display: flex; align-items: center; margin: 4px 0; font-size: 9px;"><div style="width: 12px; height: 12px; background: #feca57; margin-right: 6px; border-radius: 50%;"></div>Outputs</div>
        <div style="margin-top: 8px; font-size: 9px; color: #ccc;">
            Pattern: [${currentPattern.join(', ')}]
        </div>
    `;
    container.appendChild(legend);
}

// Keep old function for modal (if still needed)
function showNetworkVisualization(net, currentPattern) {
    if (typeof vis === 'undefined') {
        console.error('vis.js library not loaded');
        return;
    }

    networkModal.style.display = 'flex';

    // Get network container
    const container = document.getElementById('network-container');
    container.innerHTML = '';

    // Create nodes and edges for single LSTM unit visualization
    const nodes = new vis.DataSet();
    const edges = new vis.DataSet();

    // Add external inputs/outputs
    nodes.add([
        { id: 'x_t', label: 'x_t', group: 'input', x: -200, y: 0 },
        { id: 'h_t_prev', label: 'h_{t-1}', group: 'input', x: -200, y: 100 },
        { id: 'c_t_prev', label: 'C_{t-1}', group: 'input', x: -200, y: 200 },
        { id: 'h_t', label: 'h_t', group: 'output', x: 200, y: 100 },
        { id: 'c_t', label: 'C_t', group: 'output', x: 200, y: 200 },
        { id: 'y_t', label: 'y_t', group: 'output', x: 200, y: 0 }
    ]);

    // Add LSTM unit container (background)
    nodes.add([
        { id: 'lstm_unit', label: 'LSTM Unit', group: 'container', x: 0, y: 100, width: 300, height: 250 }
    ]);

    // Add internal LSTM components (positioned inside the unit)
    const lstmComponents = [
        { id: 'forget_gate', label: 'f_t', group: 'gate', x: -80, y: 20 },
        { id: 'input_gate', label: 'i_t', group: 'gate', x: -80, y: 80 },
        { id: 'candidate', label: 'C̃_t', group: 'gate', x: -80, y: 140 },
        { id: 'output_gate', label: 'o_t', group: 'gate', x: -80, y: 200 },
        { id: 'cell_state', label: 'C_t', group: 'state', x: 80, y: 140 },
        { id: 'hidden_state', label: 'h_t', group: 'state', x: 80, y: 80 }
    ];

    nodes.add(lstmComponents);

    // Add connections from inputs to gates
    const inputConnections = [
        { from: 'x_t', to: 'forget_gate', label: '', color: { color: '#ff6b6b' } },
        { from: 'x_t', to: 'input_gate', label: '', color: { color: '#ff6b6b' } },
        { from: 'x_t', to: 'candidate', label: '', color: { color: '#ff6b6b' } },
        { from: 'x_t', to: 'output_gate', label: '', color: { color: '#ff6b6b' } },
        { from: 'h_t_prev', to: 'forget_gate', label: '', color: { color: '#4ecdc4' } },
        { from: 'h_t_prev', to: 'input_gate', label: '', color: { color: '#4ecdc4' } },
        { from: 'h_t_prev', to: 'candidate', label: '', color: { color: '#4ecdc4' } },
        { from: 'h_t_prev', to: 'output_gate', label: '', color: { color: '#4ecdc4' } }
    ];

    // Add internal connections
    const internalConnections = [
        { from: 'forget_gate', to: 'cell_state', label: 'f_t', color: { color: '#45b7d1' } },
        { from: 'input_gate', to: 'cell_state', label: 'i_t', color: { color: '#45b7d1' } },
        { from: 'candidate', to: 'cell_state', label: 'C̃_t', color: { color: '#45b7d1' } },
        { from: 'c_t_prev', to: 'cell_state', label: 'C_{t-1}', color: { color: '#96ceb4' } },
        { from: 'cell_state', to: 'hidden_state', label: 'C_t', color: { color: '#96ceb4' } },
        { from: 'output_gate', to: 'hidden_state', label: 'o_t', color: { color: '#45b7d1' } }
    ];

    // Add output connections
    const outputConnections = [
        { from: 'hidden_state', to: 'h_t', label: '', color: { color: '#feca57' } },
        { from: 'cell_state', to: 'c_t', label: '', color: { color: '#feca57' } },
        { from: 'hidden_state', to: 'y_t', label: '', color: { color: '#feca57' } }
    ];

    edges.add([...inputConnections, ...internalConnections, ...outputConnections]);

    // Define groups with colors and shapes
    const groups = {
        input: {
            color: { background: '#ff6b6b', border: '#ff5252' },
            font: { color: 'white', size: 12 },
            shape: 'ellipse',
            size: 30
        },
        output: {
            color: { background: '#feca57', border: '#ff9800' },
            font: { color: 'white', size: 12 },
            shape: 'ellipse',
            size: 30
        },
        container: {
            color: { background: 'rgba(100, 100, 100, 0.1)', border: '#666666' },
            font: { color: '#333333', size: 16 },
            shape: 'box',
            margin: 20,
            widthConstraint: 300,
            heightConstraint: 250
        },
        gate: {
            color: { background: '#45b7d1', border: '#2196f3' },
            font: { color: 'white', size: 10 },
            shape: 'ellipse',
            size: 25
        },
        state: {
            color: { background: '#96ceb4', border: '#4caf50' },
            font: { color: 'white', size: 10 },
            shape: 'ellipse',
            size: 25
        }
    };

    // Network options
    const options = {
        nodes: {
            shape: 'ellipse',
            margin: 5,
            font: { size: 10 },
            borderWidth: 2,
            shadow: true,
            size: 30
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.8 } },
            font: { size: 11, color: 'white', background: 'rgba(0,0,0,0.7)' },
            color: { color: '#848484', highlight: '#ff6b6b' },
            width: 3,
            smooth: { type: 'continuous' }
        },
        groups: groups,
        physics: {
            enabled: false  // Disable physics for fixed layout
        },
        interaction: {
            hover: true,
            tooltipDelay: 200,
            dragNodes: false,
            dragView: true,
            zoomView: true
        },
        layout: {
            improvedLayout: false
        }
    };

    // Create the network
    const network = new vis.Network(container, { nodes, edges }, options);

    // Add legend
    const legend = document.createElement('div');
    legend.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 15px;
        border-radius: 8px;
        font-size: 12px;
        z-index: 1001;
    `;
    legend.innerHTML = `
        <h4 style="margin: 0 0 10px 0; color: #feca57;">LSTM Unit Components</h4>
        <div style="display: flex; align-items: center; margin: 5px 0;"><div style="width: 15px; height: 15px; background: #ff6b6b; margin-right: 8px; border-radius: 50%;"></div>Inputs (x_t, h_{t-1}, C_{t-1})</div>
        <div style="display: flex; align-items: center; margin: 5px 0;"><div style="width: 15px; height: 15px; background: #45b7d1; margin-right: 8px; border-radius: 50%;"></div>Gates (f_t, i_t, o_t, C̃_t)</div>
        <div style="display: flex; align-items: center; margin: 5px 0;"><div style="width: 15px; height: 15px; background: #96ceb4; margin-right: 8px; border-radius: 50%;"></div>States (C_t, h_t)</div>
        <div style="display: flex; align-items: center; margin: 5px 0;"><div style="width: 15px; height: 15px; background: #feca57; margin-right: 8px; border-radius: 50%;"></div>Outputs (h_t, C_t, y_t)</div>
        <div style="margin-top: 10px; font-size: 10px; color: #ccc;">
            Current Pattern: [${currentPattern.join(', ')}]
        </div>
    `;
    container.appendChild(legend);
}

// Update history display (both modal and inline)
function updateHistoryDisplay() {
    const historyModal = document.getElementById('history-modal');
    const historyListInline = document.querySelector('.history-list-inline');

    // Update modal if it exists
    if (historyModal) {
        historyModal.style.display = historyVisible ? 'flex' : 'none';

        const historyList = historyModal.querySelector('.history-list');
        historyList.innerHTML = '';

        if (matchHistory.length === 0) {
            historyList.innerHTML = '<li style="text-align: center; color: var(--text-color); opacity: 0.6;">No matches played yet</li>';
        } else {
            matchHistory.slice(-10).reverse().forEach((match, index) => {
                const li = document.createElement('li');
                li.className = match.result === 'win' ? 'win' : match.result === 'lose' ? 'lose' : 'draw';

                // Create table structure
                const table = document.createElement('table');
                const row = document.createElement('tr');

                // Add user choice
                const userCell = document.createElement('td');
                userCell.className = 'history-cell';
                userCell.innerHTML = `<img src="${match.usrImg}" alt="${match.usrLabel}">`;
                row.appendChild(userCell);

                // Add vs text
                const vsCell = document.createElement('td');
                vsCell.className = 'history-cell';
                vsCell.textContent = 'vs';
                row.appendChild(vsCell);

                // Add AI choice (Font Awesome icon)
                const aiCell = document.createElement('td');
                aiCell.className = 'history-cell';
                aiCell.innerHTML = `<i class="fas ${match.aiIcon}" style="font-size: 40px;"></i>`;
                row.appendChild(aiCell);

                // Add result
                const resultCell = document.createElement('td');
                resultCell.className = 'history-cell result';
                resultCell.textContent = match.result;
                row.appendChild(resultCell);

                table.appendChild(row);
                li.appendChild(table);
                historyList.appendChild(li);
            });
        }
    }

    // Update inline history display
    if (historyListInline) {
        historyListInline.innerHTML = '';

        if (matchHistory.length === 0) {
            historyListInline.innerHTML = '<li style="text-align: center; color: var(--text-color); opacity: 0.6; font-size: 0.85em;">No matches played yet</li>';
        } else {
            matchHistory.slice(-5).reverse().forEach((match, index) => {
                const li = document.createElement('li');
                li.className = match.result === 'win' ? 'win' : match.result === 'lose' ? 'lose' : 'draw';

                // Create table structure
                const table = document.createElement('table');
                const row = document.createElement('tr');

                // Add user choice
                const userCell = document.createElement('td');
                userCell.className = 'history-cell';
                userCell.innerHTML = `<img src="${match.usrImg}" alt="${match.usrLabel}">`;
                row.appendChild(userCell);

                // Add vs text
                const vsCell = document.createElement('td');
                vsCell.className = 'history-cell';
                vsCell.textContent = 'vs';
                row.appendChild(vsCell);

                // Add AI choice (Font Awesome icon)
                const aiCell = document.createElement('td');
                aiCell.className = 'history-cell';
                aiCell.innerHTML = `<i class="fas ${match.aiIcon}"></i>`;
                row.appendChild(aiCell);

                // Add result
                const resultCell = document.createElement('td');
                resultCell.className = 'history-cell result';
                resultCell.textContent = match.result;
                row.appendChild(resultCell);

                table.appendChild(row);
                li.appendChild(table);
                historyListInline.appendChild(li);
            });
        }
    }
}

// History container now exists in DOM from HTML; no dynamic creation needed

// Update match history
function updateMatchHistory(usrChoice, aiChoice, result) {
    matchHistory.push({
        usrImg: converter(usrChoice),
        aiIcon: intToFaIcon[aiChoice],
        usrLabel: getLabel(usrChoice),
        aiLabel: getLabel(aiChoice),
        result: result
    });
    if (matchHistory.length > 10) {
        matchHistory.shift();
    }
    // Always update inline history
    updateHistoryDisplay();
}

// Handle system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newTheme = e.matches ? 'dark' : 'light';
    if (!localStorage.getItem('theme')) {
        body.setAttribute('data-theme', newTheme);
        updateThemeIcon();
    }
});

// usr variables
let usrChoice = 'r';
let currentUsrSelection = 'r'; // Track current selection before playing
var usrChoices =[];

// ai variables
let aiChoice = 'r'
var aiChoices = []
var patternLen = 10;
var pattern = [];

//score
var score = 0
let gameCount = 0
let scoreDisplay = document.getElementById('score')

//display
let usrChoiceDisplay = document.getElementById('usr-choice');
let aiChoiceDisplay = document.getElementById('ai-choice');

// Choice cycle order
const choiceCycle = ['r', 'p', 's'];

// Font Awesome icon classes for choices
const intToFaIcon = {
    1: 'fa-hand-rock',
    2: 'fa-hand-paper',
    3: 'fa-hand-scissors'
};

// Matrix animation setup - horizontal
const canvas = document.getElementById('matrix-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    // Matrix characters
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 12;
    let rows = Math.floor(canvas.height / fontSize);
    let streams = [];

    // Initialize streams with random positions
    function initStreams() {
        rows = Math.floor(canvas.height / fontSize);
        streams = [];
        for (let i = 0; i < rows; i++) {
            streams[i] = Math.random() * canvas.width;
        }
    }

    // Set canvas size
    const setCanvasSize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        // Reinitialize streams on resize
        initStreams();
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    function drawMatrix() {
        // Get current theme
        const isDark = document.body.getAttribute('data-theme') === 'dark';

        // Fade effect - white in light mode, black in dark mode
        ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Always use green for matrix effect
        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < streams.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            // Draw from right to left
            ctx.fillText(text, streams[i], i * fontSize + fontSize);

            // Reset stream to right side when it goes off left side
            if (streams[i] < -fontSize) {
                streams[i] = canvas.width;
            }
            // Move left
            streams[i] -= 2;
        }
    }

    setInterval(drawMatrix, 50);
}

// game mechanics
const choiceToInt = { r: 1, p: 2, s: 3 };
const intToImg = {
    1: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Rock-paper-scissors_%28rock%29.png',
    2: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Rock-paper-scissors_%28paper%29.png',
    3: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Rock-paper-scissors_%28scissors%29.png'
};
const intToLabel = { 1: 'Rock', 2: 'Paper', 3: 'Scissors' };

function converter(input) {
    if (typeof input === 'string') return choiceToInt[input];
    return intToImg[input];
}

function getLabel(input) {
    return intToLabel[input];
}

function manageInp(inp) {
    gameCount++;
    usrChoice = converter(inp);
    usrChoices.push(usrChoice);

    // Update user choice image with animation
    usrChoiceDisplay.style.opacity = '0';
    setTimeout(() => {
        usrChoiceDisplay.src = converter(usrChoice);
        usrChoiceDisplay.style.opacity = '1';
    }, 150);

    aiChoice = getAiChoice();
    aiChoices.push(aiChoice);

    // Update AI choice icon with animation
    aiChoiceDisplay.style.opacity = '0';
    setTimeout(() => {
        // Remove all hand icon classes
        aiChoiceDisplay.classList.remove('fa-hand-rock', 'fa-hand-paper', 'fa-hand-scissors');
        // Add the new icon class
        aiChoiceDisplay.classList.add(intToFaIcon[aiChoice]);

        // Handle special rotation for scissors
        if (aiChoice === 3) {
            aiChoiceDisplay.classList.add('scissors-rotation');
        } else {
            aiChoiceDisplay.classList.remove('scissors-rotation');
        }

        aiChoiceDisplay.style.opacity = '1';
    }, 150);

    calcScore(usrChoice, aiChoice);
    if (gameCount !== 0) {
        pattern.shift();
        pattern.push(usrChoice);
    }
}

// Toggle user choice when clicking on user's hand
if (usrChoiceDisplay) {
    usrChoiceDisplay.addEventListener('click', () => {
        const currentIndex = choiceCycle.indexOf(currentUsrSelection);
        const nextIndex = (currentIndex + 1) % choiceCycle.length;
        currentUsrSelection = choiceCycle[nextIndex];

        // Update the display image
        usrChoiceDisplay.style.opacity = '0';
        setTimeout(() => {
            const intChoice = converter(currentUsrSelection);
            usrChoiceDisplay.src = intToImg[intChoice];
            usrChoiceDisplay.style.opacity = '1';
        }, 150);
    });
}

// Play button event listener
const playButton = document.getElementById('play-button');
if (playButton) {
    playButton.addEventListener('click', () => {
        manageInp(currentUsrSelection);
    });
}

function getAiChoice() {
	if (pattern.length < 1) {
		for (let index = 1; index <= patternLen; index++) {
			pattern.push(Math.floor(Math.random() * 3) + 1)
		}
	}
	// neural network setup
	const net = new brain.recurrent.LSTMTimeStep();
	net.train([pattern], { iterations: 200, log: false });
	const humanpred = net.run(pattern);
	let roundedHumanpred = Math.round(humanpred);
	if (roundedHumanpred > 3) { roundedHumanpred = 3; }
	else if (roundedHumanpred < 1) { roundedHumanpred = 1; }
	let chosenByAI;
	switch (roundedHumanpred) {
		case 1: chosenByAI = 2; break;
		case 2: chosenByAI = 3; break;
		case 3: chosenByAI = 1; break;
	}
	return chosenByAI;
}

function calcScore(usrChoice, aiChoice) {
    let result = 'draw';
    if (usrChoice !== aiChoice) {
        const didWin = (usrChoice === 1 && aiChoice === 3) ||
                       (usrChoice === 2 && aiChoice === 1) ||
                       (usrChoice === 3 && aiChoice === 2);
        score += didWin ? 1 : -1;
        result = didWin ? 'win' : 'lose';
    }
    updateMatchHistory(usrChoice, aiChoice, result);
    scoreDisplay.textContent = score;

    // Animate score change
    scoreDisplay.style.transform = 'scale(1.2)';
    setTimeout(() => {
        scoreDisplay.style.transform = 'scale(1)';
    }, 200);

    // Update color based on score - keep it monochrome
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim();
    scoreDisplay.style.color = textColor;
}

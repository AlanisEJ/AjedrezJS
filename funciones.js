document.addEventListener('DOMContentLoaded', function () {
    let queens = [];
    let locked = false;

    // Función para generar el tablero y establecer el color de fondo
    function generateBoard(boardColor) {
        const board = document.querySelector('.board');
        board.innerHTML = ''; // Limpiar el tablero existente antes de generar uno nuevo
        for (let i = 1; i <= 8; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            row.style.backgroundColor = boardColor; // Establecer el color de fondo de la fila
            for (let j = 1; j <= 8; j++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.id = `square-${i}-${j}`;
                square.dataset.row = i;
                square.dataset.column = j;
                square.addEventListener('click', () => handleSquareClick(square));
                row.appendChild(square);
            }
            board.appendChild(row);
        }
    }

    // Función para manejar el clic en una casilla
    function handleSquareClick(square) {
        if (!locked) {
            if (!square.classList.contains('selected')) {
                square.classList.add('selected');
                queens.push(square);
            } else {
                square.classList.remove('selected');
                queens = queens.filter(q => q !== square);
            }
        }
    }

    // Resolver el problema de las 8 reinas
    document.getElementById('solveBtn').addEventListener('click', () => {
        queens.forEach(queen => queen.classList.remove('selected')); // Limpiar selección previa
        queens.forEach(queen => {
            const row = parseInt(queen.dataset.row);
            const column = parseInt(queen.dataset.column);
            // Marcar casillas en la misma fila y columna como bloqueadas
            for (let i = 1; i <= 8; i++) {
                if (i !== column) {
                    const square = document.getElementById(`square-${row}-${i}`);
                    square.classList.add('selected');
                    square.style.backgroundColor = '#ff0000'; // Cambiar color de celda en línea de ataque
                }
                if (i !== row) {
                    const square = document.getElementById(`square-${i}-${column}`);
                    square.classList.add('selected');
                    square.style.backgroundColor = '#ff0000'; // Cambiar color de celda en línea de ataque
                }
            }
            // Marcar casillas en las diagonales como bloqueadas
            for (let i = 1; i <= 8; i++) {
                const diagonal1 = column - row + i;
                if (diagonal1 >= 1 && diagonal1 <= 8 && diagonal1 !== column) {
                    const square = document.getElementById(`square-${i}-${diagonal1}`);
                    square.classList.add('selected');
                    square.style.backgroundColor = '#ff0000'; // Cambiar color de celda en línea de ataque
                }
                const diagonal2 = column + row - i;
                if (diagonal2 >= 1 && diagonal2 <= 8 && diagonal2 !== column) {
                    const square = document.getElementById(`square-${i}-${diagonal2}`);
                    square.classList.add('selected');
                    square.style.backgroundColor = '#ff0000'; // Cambiar color de celda en línea de ataque
                }
            }
        });
    });

    // Función para bloquear las celdas y cambiar su color
    document.getElementById('lockBtn').addEventListener('click', () => {
        locked = !locked;
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            if (square.classList.contains('selected')) {
                square.style.backgroundColor = locked ? '#ffcc00' : '';
            }
        });
    });

    // Cambiar color del tablero
    document.getElementById('board-color').addEventListener('change', function() {
        const newColor = this.value;
        generateBoard(newColor); // Regenerar el tablero con el nuevo color
    });

    // Función para reiniciar el juego
    document.getElementById('resetBtn').addEventListener('click', () => {
        queens.forEach(queen => queen.classList.remove('selected')); // Limpiar selección de reinas
        queens = []; // Reiniciar lista de reinas
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.classList.remove('selected'); // Eliminar cualquier clase de selección
            square.style.backgroundColor = ''; // Restaurar color de casillas
        });
        locked = false; // Desbloquear celdas si están bloqueadas
    });

    // Generar el tablero con el color inicial
    const initialColor = document.getElementById('board-color').value;
    generateBoard(initialColor);
});

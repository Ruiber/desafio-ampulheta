function create_hourglass(n) {
    let hourglass_state = [];
    let sand_amount = n - 2;

    /*O hourglass_state é um array que representa
    quanta areia tem na linha i da ampulheta
    (não contamos a borda da ampulheta como areia).
    Consideramos a primeira e a última linhas
    como n-2 para facilitar as contas mais pra frente.

    Exemplo (n = 9)
    #########    8
    #########    6
    # ##### #    4
    #  ###  #    2
    #   #   #    0
    #  # #  #    0
    # #   # #    0
    ##     ##    0
    #########    8
    */
    for (let i = 0; i < n - 1; i++) {
        hourglass_state.push(Math.max(0, sand_amount));
        sand_amount -= 2;
    }

    hourglass_state.push(n - 2);

    return hourglass_state;
}

// Função para esperar um tempo em ms que será utilizada mais a frente
function wait(time) {
    let start = Date.now();
    let now = null;
    do {
        now = Date.now()
    } while(now - start < time);
}

function print_state(hourglass_state, sleep_time=50) {
    let n = hourglass_state.length;

    for (let i = 0; i < n; i++) {
        // A cada linha, as diagonais do quadrado delimitam a ampulheta
        let left_lim = Math.min(i, n - 1 - i);
        let right_lim = Math.max(i, n - 1 - i);
        // Quantidade de areia a ser printada na linha i
        let sand_remaining = hourglass_state[i];

        // Como o quadrado possui uma borda, devemos começar e terminar com #
        process.stdout.write("#");
        for (let j = 1; j < n - 1; j++) {
            // Fora da ampulheta
            if(j < left_lim || j > right_lim) {
                process.stdout.write(" ");
            }
            // Na borda da ampulheta
            else if (j == left_lim || j == right_lim) {
                process.stdout.write("#");
            }
            // Ainda há areia a ser printada dentro da ampulheta na linha i
            else if (sand_remaining) {
                process.stdout.write("#");
                sand_remaining--;
            }
            // Não há mais areia a ser printada dentro da ampulheta na linha i
            else {
                process.stdout.write(" ");
            }
        }
        process.stdout.write("#\n");
    }
    if(sleep_time) {
        wait(sleep_time);
        console.clear();
    }
}

function play(n) {
    let hourglass_state = create_hourglass(n);
    let max_dist = Math.floor((n - 3) / 2);

    /* O algoritmo se utilizará da distância para a borda da ampulheta em cada linha.
    De forma que a distância máxima é aquela em que se encontra o meio da ampulheta
    
    Exemplo (n = 9)

    max_dist=3
      |  
    |---|
    #########
    #########
    # ##### #
    #  ###  #
    #   #   #
    #  # #  #
    # #   # #
    ##     ##
    #########

    Exemplo (n = 10)
    
    max_dist=3
      |  
    |---|
    ##########
    ##########
    # ###### #
    #  ####  #
    #   ##   #
    #   ##   #
    #  #  #  #
    # #    # #
    ##      ##
    ##########
    */
    for (let dist_border = 1; dist_border <= max_dist; dist_border++) {
        /*Enquanto houver areia na parte de cima da ampulheta para dada
        distância da borda, retiramos a areia de cima e a colocamos embaixo*/
        while(hourglass_state[dist_border]) {
            print_state(hourglass_state);
            hourglass_state[dist_border]--;
            hourglass_state[n - 1 - dist_border]++;
        }
    }

    print_state(hourglass_state, 0);
    process.stdout.write("n = " + n + "\n\n");
}

console.log('\033[2J');
let n = process.argv[2];
play(n);

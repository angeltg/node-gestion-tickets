const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;

    }

}



class TicketControl {

    constructor() {

        this.ultimo = 0; //Ultimo ticket
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        //Cada nuevo día se reinicinan las colas.
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    siguinteTicket() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `${ this.ultimo }`;
    }
    getTicketActual() {
        return `${ this.ultimo }`;
    }
    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay más tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        //Borramos el ticket de la cola
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);
        console.log('Esto es lo que pone', atenderTicket);
        //los ponemos en el inicio del array
        this.ultimos4.unshift(atenderTicket);

        //Si tiene más de 4 borramos el último
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1);
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
        //Pasamos el json a string
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}
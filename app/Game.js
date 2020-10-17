import { Quote } from './Quote.js';

class Game {

    currentStep = 0;
    lastStep = 6;

    constructor({outputWrapper, wordWrapper, categoryWrapper, lettersWrapper}) {
        this.outputWrapper = outputWrapper;
        this.wordWrapper = wordWrapper;
        this.categoryWrapper = categoryWrapper;
        this.lettersWrapper = lettersWrapper;

        const {text, category} = this.quotes[Math.floor(Math.random()*this.quotes.length)];
        this.quote = new Quote(text);
        console.log(this.quote.text);
        this.categoryWrapper.innerHTML = category;
    }

    quotes = [
        {
            text: "pasjans",
            category: "gra karciana"
        },
        {
            text: "siatkowka",
            category: "sport"
        },
        {
            text: "drukarka",
            category: "urzadzenie biurowe"
        },
        {
            text: "jbl",
            category: "naglosnienie"
        }
    ];

    guess(letter, event) {
        event.target.disabled = true;
        if(event.target.disabled) {
            event.target.style.opacity = 0;
        };
        if(this.quote.guess(letter)){
            this.drawQuote();
        } else {
            this.currentStep++;
            document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
            if(this.currentStep == this.lastStep) {
                this.loosing();
            }
        }
        
    }

    drawLetters() {
        for (let i = 0; i < 26; i++) {
            const label = (i + 10).toString(36);
            const button = document.createElement('button');
            button.innerHTML = label;
            button.addEventListener('click', (event) => this.guess(label, event));
            this.lettersWrapper.appendChild(button);
        }
    }

    drawQuote() {
        const content = this.quote.getContent();
        this.wordWrapper.innerHTML = content;
        if(!content.includes("_")){
            this.winning();
        }
    }

    start() {
        document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
        this.drawLetters();
        this.drawQuote();
    }

    winning() {
        this.wordWrapper.innerHTML = "Wygrałeś!!!";
        this.lettersWrapper.innerHTML = "";
    }

    loosing() {
        this.wordWrapper.innerHTML = "Przegrałeś!!!";
        this.categoryWrapper.innerHTML = `Prawidłowe hasło to: ${this.quote.text}`;
        this.lettersWrapper.innerHTML = "";
    }
}

const game = new Game({
    outputWrapper: document.querySelector('.hangmanScreen .output'),
    wordWrapper: document.querySelector('.hangmanGame .word'),
    categoryWrapper: document.querySelector('.hangmanGame .category'),
    lettersWrapper: document.querySelector('.hangmanGame .letters')
});

game.start();
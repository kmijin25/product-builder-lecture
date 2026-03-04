
class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const number = this.getAttribute('number');
        const color = this.getColor(number);

        const ball = document.createElement('div');
        ball.classList.add('lotto-ball');
        ball.style.backgroundColor = color;
        ball.textContent = number;

        const style = document.createElement('style');
        style.textContent = `
            .lotto-ball {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5rem;
                font-weight: bold;
                color: white;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                animation: pop-in 0.5s ease; 
            }

            @keyframes pop-in {
                0% {
                    transform: scale(0);
                }
                60% {
                    transform: scale(1.1);
                }
                100% {
                    transform: scale(1);
                }
            }
        `;

        this.shadowRoot.append(style, ball);
    }

    getColor(number) {
        if (number <= 10) return '#f1c40f'; // yellow
        if (number <= 20) return '#3498db'; // blue
        if (number <= 30) return '#e74c3c'; // red
        if (number <= 40) return '#2ecc71'; // green
        return '#9b59b6'; // purple
    }
}

customElements.define('lotto-ball', LottoBall);

const lottoNumbersDiv = document.getElementById('lotto-numbers');
const generateBtn = document.getElementById('generate-btn');

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers);
}

function displayNumbers(numbers) {
    lottoNumbersDiv.innerHTML = '';
    numbers.forEach((number, index) => {
        setTimeout(() => {
            const lottoBall = document.createElement('lotto-ball');
            lottoBall.setAttribute('number', number);
            lottoNumbersDiv.appendChild(lottoBall);
        }, index * 200);
    });
}

generateBtn.addEventListener('click', () => {
    const numbers = generateLottoNumbers();
    displayNumbers(numbers);
});

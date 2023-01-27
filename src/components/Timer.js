import { GenerateUniqueId } from "./GenerateUniqueID.js";

class Timer {
    constructor() {
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.ms = 0;
        this.timer = null;
        this.timerID = GenerateUniqueId({prefix:"timer"});
        console.log(this.timerID);
    }

    displayTimer() {
        this.ms += 10;
        if(this.ms == 1000) {
            this.ms = 0;
            this.second++;
            if(this.second == 60) {
                this.minute++;
                this.second = 0;
                if(this.minute == 60) {
                    this.hour++;
                    this.minute = 0;
                }
            }
        }

        let hrStr = (this.hour < 10) ? "0"+this.hour : this.hour;
        let minStr = (this.minute < 10) ? "0"+this.minute : this.minute;
        let secStr = (this.second < 10) ? "0"+this.second : this.second;
        let msStr = ""
        if(this.ms < 10) {
            msStr = "00" + this.ms;
        }
        else if(this.ms < 100){
            msStr = "0" + this.ms;
        }
        else {
            msStr = this.ms;
        }
   
        document.getElementById(this.timerID).innerHTML = `${hrStr}<span>hr</span>:${minStr}<span>min</span>:${secStr}<span>sec</span>:${msStr}<span>ms</span>`;
    }

    startFunction(){
        if(this.timer !== null) {
            return;
        }
        this.timer = setInterval(this.displayTimer.bind(this), 10); //call display timer after every 10sec
    }

    pauseFunction(){
        clearInterval(this.timer);
        this.timer = null;
    }

    resetFunction(){
        clearInterval(this.timer);
        this.timer = null;
        document.getElementById(this.timerID).innerHTML = `00<span>hr</span>:00<span>min</span>:00<span>sec</span>:000<span>ms</span>`;
        this.ms = 0;
        this.second = 0;
        this.minute = 0;
        this.hour = 0;
    }

    render() {
         //create
        const timerContainer = document.createElement("div");
        const timerHeading = document.createElement("h1");
        const timerValue = document.createElement("p");
        const timerBtnContainer = document.createElement("div");
        const resetBtn = document.createElement("button");
        const startBtn = document.createElement("button");
        const pauseBtn = document.createElement("button");


        //ids and classes
        timerContainer.classList.add("timerContainer");
        timerHeading.classList.add("timerHeading");
        timerValue.id = this.timerID;
        timerValue.classList.add("timerValue");
        timerBtnContainer.classList.add("timerBtnContainer");
        resetBtn.classList.add("resetBtn");
        startBtn.classList.add("startBtn");
        pauseBtn.classList.add("pauseBtn");

        //inner values
        timerHeading.innerText = "TIMER ⏳";
        timerValue.innerHTML = `00<span>hr</span>:00<span>min</span>:00<span>sec</span>:000<span>ms</span>`;
        resetBtn.innerText = "Reset";
        startBtn.innerText = "Start";
        pauseBtn.innerText = "Pause";

        //append
        timerContainer.appendChild(timerHeading);
        timerContainer.appendChild(timerValue);
        timerContainer.appendChild(timerBtnContainer);
        timerBtnContainer.appendChild(resetBtn);
        timerBtnContainer.appendChild(startBtn);
        timerBtnContainer.appendChild(pauseBtn);

        startBtn.addEventListener('click', this.startFunction.bind(this));
        resetBtn.addEventListener('click', this.resetFunction.bind(this));
        pauseBtn.addEventListener('click', this.pauseFunction.bind(this));

        return timerContainer;
    }

    mount(el) {
        // mount the rendered container in el if it's provided

        //if the obj is already mounted
        if(document.getElementById(this.timerID)) {
            return;
        }

        else if(el) {
            el.appendChild(this.render());
            return;
        }

        document.body.appendChild(this.render());
    }

}

export {Timer};
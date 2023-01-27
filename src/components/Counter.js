import { GenerateUniqueId } from "./GenerateUniqueID.js";

class Counter {

    constructor(count) {
        this.count = count || 0;
        this.counterID = GenerateUniqueId({prefix:"counter"});
        console.log(this.counterID);
    }

    incrementCounter() {
        this.count = this.count + 1;
        this.updateCounter();
    }

    decrementCounter() {
        this.count = this.count - 1;
        this.updateCounter();
    }

    updateCounter() {
        document.getElementById(this.counterID).innerText = `count : ${this.count}`;
    }

    render() {
        // create the html component and return the container

        const counterContainer = document.createElement("div");
        const counterHeading = document.createElement("h1");
        const counterValue = document.createElement("p");
        const incBtn = document.createElement("button");
        const decBtn = document.createElement("button");

        counterContainer.classList.add("counterContainer");
        counterHeading.classList.add("counterHeading");
        counterValue.id = this.counterID;
        counterValue.classList.add("counterValue");
        incBtn.id = "increment";
        decBtn.id = "decrement";

        counterHeading.innerText = "Counter Component";
        counterValue.innerText = `count : ${this.count}`;
        incBtn.innerText = "+";
        decBtn.innerText = "-";

        counterContainer.appendChild(counterHeading);
        counterContainer.appendChild(counterValue);
        counterContainer.appendChild(incBtn);
        counterContainer.appendChild(decBtn);

        incBtn.addEventListener('click', this.incrementCounter.bind(this));
        decBtn.addEventListener('click', this.decrementCounter.bind(this));

        return counterContainer;
    }

    mount(el) {
        // mount the rendered container in el if it's provided

        //if the obj is already mounted
        if(document.getElementById(this.counterID)) {
            return;
        }

        else if(el) {
            el.appendChild(this.render());
            return;
        }

        document.body.appendChild(this.render());
    }
}

export {Counter};


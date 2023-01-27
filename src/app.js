import { Counter } from "./components/Counter.js";
import { Timer } from "./components/Timer.js";

const c1 = new Counter();
c1.mount(document.getElementById("root"));

const c2 = new Counter();
c2.mount(document.getElementById("root"));

const t1 = new Timer();
t1.mount(document.getElementById("root"));

const t2 = new Timer();
t2.mount(document.getElementById("root"));
export default class Timer {
  constructor(root){
    root.innerHTML = Timer.getHTML();

    this.el = {
        // STUDY TIMER 
      minutes: root.querySelector(".timer-part-min"),
      seconds: root.querySelector(".timer-part-sec"),
      control: root.querySelector(".timer-btn-control"),
      reset: root.querySelector(".timer-btn-reset"),
        // BREAK TIMER
      minutes2: root.querySelector(".timer-part-min2"),
      seconds2: root.querySelector(".timer-part-sec2"),
      control2: root.querySelector(".timer-btn-control2"),
      reset2: root.querySelector(".timer-btn-reset2"),
    };

    // STUDY timer
    this.interval = null;
    this.remainingSeconds = 1500;
    // BREAK timer
    this.interval2 = null;
    this.remainingSeconds2 = 300;

    // STUDY timer
    this.el.control.addEventListener('click', () => {
      if (this.interval === null) {
        this.start();
      } else {
        this.stop();
      }
    });

    // BREAK timer
    this.el.control2.addEventListener('click', () => {
      if (this.interval2 === null) {
        this.start2();
      } else {
        this.stop2();
      }
    });

    // STUDY TIMER
    this.el.reset.addEventListener('click', () => {
      const inputMinutes = prompt("Enter number of minutes: ");

      if (inputMinutes < 60) {
        this.stop();
        this.remainingSeconds = inputMinutes * 60;
        this.updateInterfaceTime();
      }
    });

    // BREAK TIMER
    this.el.reset2.addEventListener('click', () => {
      const inputMinutes2 = prompt("Enter number of minutes: ");

      if (inputMinutes2 < 60) {
        this.stop2();
        this.remainingSeconds2 = inputMinutes2 * 60;
        this.updateInterfaceTime2();
      }
    });
  }

  // STUDY TIMER
  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  // BREAK TIMER
  updateInterfaceTime2() {
    const minutes2 = Math.floor(this.remainingSeconds2 / 60);
    const seconds2 = this.remainingSeconds2 % 60;

    this.el.minutes2.textContent = minutes2.toString().padStart(2, "0");
    this.el.seconds2.textContent = seconds2.toString().padStart(2, "0");
  }

  // STUDY TIMER
  updateInterfaceControls() {
    if (this.interval === null){
      this.el.control.innerHTML = `<span class="material-symbols-rounded">play_arrow</span>`;
      this.el.control.classList.add("timer-btn-start");
      this.el.control.classList.remove("timer-btn-stop");
    } else {
      this.el.control.innerHTML = `<span class="material-symbols-rounded">pause</span>`;
      this.el.control.classList.add("timer-btn-stop");
      this.el.control.classList.remove("timer-btn-start");
    }
  }

  // BREAK TIMER
  updateInterfaceControls2() {
    if (this.interval2 === null){
      this.el.control2.innerHTML = `<span class="material-symbols-rounded">play_arrow</span>`;
      this.el.control2.classList.add("timer-btn-start2");
      this.el.control2.classList.remove("timer-btn-stop2");
    } else {
      this.el.control2.innerHTML = `<span class="material-symbols-rounded">pause</span>`;
      this.el.control2.classList.add("timer-btn-stop2");
      this.el.control2.classList.remove("timer-btn-start2");
    }
  }

  // STUDY TIMER 
  start() {
    if (this.remainingSeconds === 0) return;
    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateInterfaceTime();

      if (this.remainingSeconds === 0) {
        this.stop();
      }
    }, 1000);

    this.updateInterfaceControls();
  }

  // BREAK TIMER
  start2() {
    if (this.remainingSeconds2 === 0) return;
    this.interval2 = setInterval(() => {
      this.remainingSeconds2--;
      this.updateInterfaceTime2();

      if (this.remainingSeconds2 === 0) {
        this.stop2();
      }
    }, 1000);

    this.updateInterfaceControls2();
  }

  // STUDY TIMER
  stop() {
    clearInterval(this.interval);

    this.interval = null;

    this.updateInterfaceControls();
  }

  // BREAK TIMER
  stop2() {
    clearInterval(this.interval2);

    this.interval2 = null;

    this.updateInterfaceControls2();
  }

  // HTML CODE WHICH IS GOING TO BE imported to timer-main.js  
  static getHTML(){
    return `
    <h1> Pomodoro Timer </h2>
    <div class="container-timer"> 
    <h2 class="timer-heading"> Work Timer </h2> 
    <span class="timer-part timer-part-min">25</span>
    <span class="timer-part">:</span>
    <span class="timer-part timer-part-sec">00</span>

    <button type="button" class="timer-btn timer-btn-control timer-btn-start">
      <span class="material-symbols-rounded">play_arrow</span>
    </button>

    <button type="button" class="timer-btn timer-btn-reset">
      <span class="material-symbols-rounded">settings</span>
    </button>
    </div>

    <div class="container-timer2"> 
    <h2 class="timer-heading2"> Break Timer </h2> 
    <span class="timer-part2 timer-part-min2">05</span>
    <span class="timer-part2">:</span>
    <span class="timer-part2 timer-part-sec2">00</span>

    <button type="button" class="timer-btn2 timer-btn-control2 timer-btn-start2">
      <span class="material-symbols-rounded">play_arrow</span>
    </button>

    <button type="button" class="timer-btn2 timer-btn-reset2">
      <span class="material-symbols-rounded">settings</span>
    </button>
    </div>
    `;
  }
}  


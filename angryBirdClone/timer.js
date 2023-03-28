class Timer {
    constructor(inputSeconds) {
        this.interval = null;
        this.remainingSeconds = inputSeconds;

    }
  
    displayTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
        return (minutes+":"+seconds);
    }
    start() {
        if (this.remainingSeconds === 0) 
            return;
        this.interval = setInterval(() => {
            this.remainingSeconds--;
            if (this.remainingSeconds === 0) {
                this.stop();
            }
        }, 1000);
    }
  
    stop() {
      clearInterval(this.interval);
      this.interval = null;
    }
}
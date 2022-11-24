import EventEmitter from "events";
import moment from "moment";
moment.locale('ru')
class Handler {
    static #timers = [];
    static interval = null;

    static setTimer(timer) {
        this.#timers.push(timer);
    }

    static #leftTimeToString(time) {
        const timer = {
            seconds: Math.floor((time / 1000) % 60),
            minutes: Math.floor((time / 1000 / 60) % 60),
            hours: Math.floor((time / (1000 * 60 * 60)) % 24),
            days: Math.floor(time / (1000 * 60 * 60 * 24)),
        }
        return `Осталось ${timer.days} дней и ${timer.hours}:${timer.minutes}:${timer.seconds}`;
    }

    static handler() {
        const now = Date.now();
        if (!this.#timers.length) {
            console.log("Не заданы дата и время!");
            clearInterval(this.interval);
        } else {
            this.#timers.forEach(target => {
                const diffTime = now - target.timeToSeconds();
                if (diffTime > 0) {
                    console.log(target.time,Handler.#leftTimeToString(diffTime));
                } else {
                    console.log(target.time,  "Отсчет законен");
                    this.#timers = this.#timers.filter(item => item !== target);
                }
            })
        }
    }
}


class Time {
    constructor(timeString) {
        this.time = timeString;
    }

    timeToSeconds() {
        let [hour, day, month, year] = this.time.split('-');

        if (year.toString().length === 2) {
            year = Number(`20${year}`);
        }
        
        const date = new Date(year, month - 1, day, hour);
        return date.getTime();
    }
}


const run = () => {
    class TimeEmitter extends EventEmitter {}
    const emitter = new TimeEmitter();

    emitter.on('getTimers', Handler.handler.bind(Handler));

    Handler.interval = setInterval(() => emitter.emit('getTimers'), 1000);

    const args = process.argv.slice(2);

    args.forEach(item => {
        Handler.setTimer(new Time(item));
    })
    
}

run()
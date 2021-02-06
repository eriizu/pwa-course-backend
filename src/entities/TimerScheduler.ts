import { Timer } from "./Timer";
import moment from "moment";

export class TimerSheduler {
  timeout: NodeJS.Timeout | null;

  constructor() {
    this.timeout = null;
  }

  async onSchedule() {}

  async start() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    let next = await Timer.getNextOccurence();
    if (next) {
      let now = moment().valueOf();
      let target = moment(next.next).valueOf();
      this.timeout = setTimeout(this.onSchedule.bind(this), target - now);
    }
  }
}

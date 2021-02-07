import { Timer } from "./Timer";
import { Push, PushPayload } from "./Push";
import moment from "moment";

export class TimerSheduler {
  timeout: NodeJS.Timeout | null;
  static scheduler: TimerSheduler | null;

  constructor() {
    this.timeout = null;
  }

  static enable() {
    if (!this.scheduler) {
      this.scheduler = new TimerSheduler();
      this.scheduler.schedule().catch(console.error);
    }
    return this.scheduler;
  }

  static disable() {
    if (this.scheduler && this.scheduler.timeout) {
      clearTimeout(this.scheduler.timeout);
    }
  }

  async onSchedule() {
    let dues = await Timer.findDue();
    console.log("due tasks");
    console.log(dues);
    for (let due of dues) {
      let pl: PushPayload = {
        notification: {
          title: "PWA: Timer ended",
          body: `${due.id} was due on ${moment(due.next).toLocaleString()}`,
          data: { url: "public.eiss.fr" },
        },
      };
      Push.notifyAll().catch(console.warn);
      due.bumpAndSave().catch(console.error);
    }
    this.schedule();
  }

  async schedule() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    let next = await Timer.getNextOccurence();
    if (next) {
      let now = moment().valueOf();
      let target = moment(next.next).valueOf();
      console.log(moment(target).toLocaleString());
      console.log(`delta ${target - now}`);
      this.timeout = setTimeout(this.onSchedule.bind(this), target - now);
    }
  }
}

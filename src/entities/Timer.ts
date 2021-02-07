import moment from "moment";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  LessThanOrEqual,
} from "typeorm";
import { format } from "date-fns";
import {
  MoreThanOrEqualDate,
  LessThanOrEqualDate,
  EDateType,
} from "../DateCompare";

export class Interval {
  constructor(interval?: Partial<Interval>) {
    this.months = 0;
    this.hours = 0;
    if (interval) Object.assign(this, interval);
  }

  @Column()
  months: number;

  @Column()
  hours: number;
}

@Entity()
export class Timer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column(() => Interval)
  repeats: Interval;

  @Column()
  next: Date;

  constructor(next: Date, interval?: Partial<Interval>) {
    super();
    this.repeats = new Interval(interval);
    this.next = next;
  }

  bump() {
    let new_next = moment(this.next);
    if (this.repeats.hours) new_next.add(this.repeats.hours, "hours");
    if (this.repeats.months) new_next.add(this.repeats.months, "months");
    this.next = new_next.toDate();
  }

  async bumpAndSave() {
    const id = this.id;
    if (this.repeats.hours || this.repeats.months) {
      this.bump();
      console.log(`bumping ${this.id}.`);
      await this.save();
    } else {
      console.log(`removing ${this.id} as it isn't supposed to repeat.`);
      await this.remove();
    }
    console.log(`complete with: ${id}.`);
  }

  static async getNextOccurence() {
    return this.findOne({
      order: { next: "ASC" },
    });
  }

  // private static nowToDBDate() {
  //   return format(new Date(), "yyyy-MM-dd kk:mm:ss.SSS");
  // }

  static async findDue() {
    try {
      return await this.find({
        where: { next: LessThanOrEqual(new Date()) },
      });
    } catch (err) {
      // console.warn(err);
      let search = new Date().toISOString().replace("T", " ").replace("Z", "");
      return this.find({
        where: { next: LessThanOrEqual(search) },
      });
    }
  }
}

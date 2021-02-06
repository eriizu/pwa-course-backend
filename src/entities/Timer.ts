import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  LessThanOrEqual,
} from "typeorm";

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

  static async getNextOccurence() {
    return this.findOne({ order: { next: "ASC" } });
  }

  static async findDue() {
    return this.find({
      where: { next: LessThanOrEqual(new Date().toISOString()) },
    });
  }
}

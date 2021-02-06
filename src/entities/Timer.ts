import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

import { PartialFields } from "../PartialFields";

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
  constructor(next: Date, interval?: Partial<Interval>) {
    super();
    this.repeats = new Interval(interval);
    this.next = next;
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column(() => Interval)
  repeats: Interval;

  @Column()
  next: Date;
}

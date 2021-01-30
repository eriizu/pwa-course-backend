import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:sysadmin@eiss.fr",
  "BPdTu_dImk8UZqr1-paVPIUjGjaWbLRRRlXTt4D7FqzxtVAvvzdyQd7eeIboxZdX2Jx_-oVKXSOhTQG-XXOuRwo",
  "YMC6vjtkDKwgHnyvJKwAfHOMm8PLpK1MIit15HFli2A"
);

@Entity()
export class Push extends BaseEntity {
  constructor(resgistration: string) {
    super();
    this.resgistration = resgistration;
  }

  @PrimaryGeneratedColumn()
  id?: number;

  // @Column()
  // user: string;

  @Column()
  resgistration: string;

  async notify() {
    const subscription: Parameters<
      typeof webpush.sendNotification
    >[0] = JSON.parse(this.resgistration);

    const payload = {
      notification: {
        title: "Testing testing one two three",
        body: "bonjoir",
        data: {
          url: "https://e89.eiss.fr",
        },
      },
    };

    return await webpush.sendNotification(
      subscription,
      JSON.stringify(payload)
    );
  }

  static async notifyAll() {
    const registrations = await this.find({});

    for (let pushEntry of registrations) {
      try {
        await pushEntry.notify();
      } catch (err) {
        console.warn(err);
        pushEntry.remove().catch(console.warn);
      }
    }
  }
}

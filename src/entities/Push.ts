import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:sysadmin@eiss.fr",
  "BPdTu_dImk8UZqr1-paVPIUjGjaWbLRRRlXTt4D7FqzxtVAvvzdyQd7eeIboxZdX2Jx_-oVKXSOhTQG-XXOuRwo",
  "YMC6vjtkDKwgHnyvJKwAfHOMm8PLpK1MIit15HFli2A"
);

export interface PushPayload {
  notification: {
    title: string;
    body: string;
    data: {
      url: string;
    };
  };
}

const DEFAULT_PAYLOAD: PushPayload = {
  notification: {
    title: "PWA: default notification",
    body: "this is sent when the business code failed to provide contents for",
    data: {
      url: "https://e89.eiss.fr",
    },
  },
};

@Entity()
export class Push extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  // @Column()
  // user: string;

  @Column()
  resgistration: string;

  constructor(resgistration: string) {
    super();
    this.resgistration = resgistration;
  }

  async notify(payload: PushPayload = DEFAULT_PAYLOAD) {
    const subscription: Parameters<
      typeof webpush.sendNotification
    >[0] = JSON.parse(this.resgistration);

    return await webpush.sendNotification(
      subscription,
      JSON.stringify(payload)
    );
  }

  static async notifyAll(payload: PushPayload = DEFAULT_PAYLOAD) {
    const registrations = await this.find({});

    for (let pushEntry of registrations) {
      try {
        await pushEntry.notify(payload);
      } catch (err) {
        console.warn(err);
        pushEntry.remove().catch(console.warn);
      }
    }
  }
}

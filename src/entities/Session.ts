import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// export class DiscordUser {
//   @Column()
//   id!: string;

//   @Column()
//   username!: string;

//   @Column()
//   discriminator!: string;

//   @Column()
//   avatar?: string;

//   @Column()
//   locale?: string;
// }

// @Entity()
// export class Session extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id?: number;

//   // @Column()
//   // user: string;

//   @Column()
//   access_token: string;

//   @Column()
//   refresh_token: string;

//   @Column()
//   discord_user_id: string;

//   constructor(access_token: string, refresh_token: string) {
//     super();
//     this.access_token = access_token;
//     this.refresh_token = refresh_token;
//   }
// }

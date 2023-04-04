import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../user/entities';
import { ChatChannel } from './chatChannel.entity';
import { Factory } from 'nestjs-seeder';

@Entity()
export class DmChannel {
  @Factory((faker) => faker.datatype.number({ min: 1, max: 100 }))
  @PrimaryColumn({ type: 'int' })
  first_user_id: number;

  @Factory((faker) => faker.datatype.number({ min: 1, max: 100 }))
  @PrimaryColumn({ type: 'int' })
  second_user_id: number;

  @Factory((faker) => faker.datatype.number({ min: 1, max: 100 }))
  @Column({ type: 'int' })
  channel_id: number;

  @ManyToOne(() => User, (user) => user.dmList1)
  @JoinColumn({ name: 'first_user_id' })
  first_user: User;

  @ManyToOne(() => User, (user) => user.dmList2)
  @JoinColumn({ name: 'second_user_id' })
  second_user: User;

  @ManyToOne(() => ChatChannel, (channel) => channel.dmList)
  @JoinColumn({ name: 'channel_id' })
  channel: ChatChannel;
}

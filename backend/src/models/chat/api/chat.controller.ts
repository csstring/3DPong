import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ChatChannel } from '../entities';
import { ChatUserService } from './services/chatUser.service';
import { ChatService } from './services';
import { ChannelUser } from '../entities';
import { ChannelBanList, ChannelMuteList } from '../entities';
import { ChannelDto, JoinDto, UserIdDto } from '../dto/channel.dto';
import { DmDto } from '../dto/dm.dto';

@Controller('/chat')
export class ChatController {
  constructor(private chatService: ChatService, private userService: ChatUserService) {}

  @Get()
  getMyChannels(): Promise<ChatChannel[]> {
    return this.chatService.getMyChannels(16);
  }
  함;
  @Get('/search')
  getAllChannels(): Promise<ChatChannel[]> {
    return this.chatService.getAllChannels();
  }

  @Get('/search/:string')
  searchChannelsByChannelName(@Param('string') str: string): Promise<ChatChannel[]> {
    return this.chatService.searchChannelsByChannelName(str);
  }

  @Get('/:channelId/log')
  getMessageLogs(
    @Query('take') take = 1,
    @Query('skip') skip = 1,
    @Param('channelId', ParseIntPipe) channelId: number
  ) {
    take = take > 20 ? 20 : take;
    return this.chatService.getMessageLogs(take, skip, channelId, 1);
  }

  @Get('/:channelId/users')
  getUsersInfo(@Param('channelId', ParseIntPipe) channelId: number): Promise<ChannelUser[]> {
    return this.chatService.getChatUsers(channelId);
  }

  @Get('/:channelId/mutelist')
  getMutelist(@Param('channelId', ParseIntPipe) channelId: number): Promise<ChannelMuteList[]> {
    return this.chatService.getMutelist(channelId, 1);
  }

  @Get('/:channelId/banlist')
  getBanlist(@Param('channelId', ParseIntPipe) channelId: number): Promise<ChannelBanList[]> {
    return this.chatService.getBanlist(channelId, 1);
  }

  @Post('/')
  async createChatRoom(@Body() channelDto: ChannelDto): Promise<ChatChannel> {
    const user = await this.userService.getUser(18);
    return this.chatService.createChatRoom(channelDto, user);
  }

  @Put('/:channelId/update')
  async updateChatRoom(
    @Param('channelId', ParseIntPipe) channelId: number,
    @Body() channelDto: ChannelDto
  ): Promise<void> {
    const user = await this.userService.getUser(82);
    return this.chatService.updateChatRoom(channelId, channelDto, user);
  }

  @Post('/join')
  joinChannelUser(@Body() joinDto: JoinDto): Promise<ChannelUser> {
    return this.chatService.joinChannelUser(joinDto, 76);
  }

  @Put('/:channelId/out')
  leaveChannel(@Param('channelId', ParseIntPipe) channelId: number) {
    return this.chatService.leaveChannel(51, channelId);
  }

  @Put('/:channelId/role')
  changeRole(@Param('channelId', ParseIntPipe) channelId: number, @Body() userIdDto: UserIdDto) {
    return this.chatService.changeRole(channelId, 1, userIdDto);
  }

  @Delete('/:channelId')
  deleteChatRoom(@Param('channelId', ParseIntPipe) channelId): Promise<void> {
    return this.chatService.deleteChatRoom(channelId);
  }

  @Post('/dm')
  async createDmRoom(@Body() dmDto: DmDto): Promise<ChatChannel> {
    const first_user = await this.userService.getUser(18);
    const second_user_id = await this.userService.getUser(dmDto.user_id);
    return this.chatService.createDmRoom(second_user_id, first_user);
  }
}

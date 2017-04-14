import {stub} from 'sinon'

import chatService from 'src/server/services/chatService'

export default {
  enable() {
    stub(chatService, 'createChannel', () => Promise.resolve({}))
    stub(chatService, 'createChannelMessage', () => Promise.resolve({}))
    stub(chatService, 'createDirectMessage', () => Promise.resolve({}))
    stub(chatService, 'createResponseMessage', () => Promise.resolve({}))
    stub(chatService, 'deleteChannel', () => Promise.resolve(true))
    stub(chatService, 'inviteToChannel', () => Promise.resolve({}))
    stub(chatService, 'sendChannelMessage', () => Promise.resolve({}))
    stub(chatService, 'sendDirectMessage', () => Promise.resolve({}))
    stub(chatService, 'sendResponseMessage', () => Promise.resolve({}))
    stub(chatService, 'sendMultiPartyDirectMessage', () => Promise.resolve({}))
  },

  disable() {
    chatService.createChannel.restore()
    chatService.createChannelMessage.restore()
    chatService.createDirectMessage.restore()
    chatService.createResponseMessage.restore()
    chatService.deleteChannel.restore()
    chatService.inviteToChannel.restore()
    chatService.sendChannelMessage.restore()
    chatService.sendDirectMessage.restore()
    chatService.sendResponseMessage.restore()
    chatService.sendMultiPartyDirectMessage.restore()
  },
}

import { SendNotificationUseCase } from './send-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notification-repository'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: SendNotificationUseCase

describe('send notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to send a notification', async () => {
    const notification = await sut.execute({
      recipientId: 'author-id',
      title: 'Notification title',
      content: 'Notification content',
    })

    expect(notification.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      notification.value?.notification,
    )
  })
}) //

import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-question-answer'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('delete comment answer', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete a answer comment', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(answerComment)

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(1)

    await sut.execute({
      authorId: answerComment.authorId.toString(),
      answerCommentId: answerComment.id.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user answer comment', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityId('author-2'),
    })

    await inMemoryAnswerCommentsRepository.create(answerComment)

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(1)

    await expect(() =>
      sut.execute({
        authorId: 'author-1',
        answerCommentId: answerComment.id.toString(),
      }),
    ).rejects.toBeInstanceOf(Error)
  })
}) //

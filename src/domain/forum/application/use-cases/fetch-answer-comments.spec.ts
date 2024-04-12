import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { FetchAnswerCommentsAnswersUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from 'test/factories/make-question-answer'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsAnswersUseCase

describe('fetch answer comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsAnswersUseCase(
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to fetch answer comments', async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('1'),
      }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('1'),
      }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('1'),
      }),
    )

    const { answerComments } = await sut.execute({
      answerId: '1',
      page: 1,
    })

    expect(answerComments).toHaveLength(3)
  })

  it('should be able to fetch paganated answer comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityId('1'),
        }),
      )
    }

    const { answerComments } = await sut.execute({
      page: 2,
      answerId: '1',
    })

    expect(answerComments).toHaveLength(2)
  })
}) //

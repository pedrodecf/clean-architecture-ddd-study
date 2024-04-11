import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('create question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: 'author-id',
      title: 'Question title',
      content: 'Question content',
    })

    expect(question.id).toBeTruthy()
    expect(question.content).toEqual('Question content')
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  })
}) //

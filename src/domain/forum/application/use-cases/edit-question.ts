import { QuestionRepository } from '../repositories/question-repository'

interface EditQuestionUseCaseRequest {
  questionId: string
  title: string
  content: string
  authorId: string
}

interface EditQuestionUseCaseResponse {}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('You are not the author of this question')
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return {}
  }
}

import { AnswerComment } from '../../enterprise/entities/answer-comments'
import { AnswerCommentRepository } from '../repositories/answer-comments-repository'

interface FetchAnswerCommentsAnswersUseCaseRequest {
  page: number
  answerId: string
}

interface FetchAnswerCommentsAnswersUseCaseResponse {
  answerComments: AnswerComment[]
}

export class FetchAnswerCommentsAnswersUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}

  async execute({
    page,
    answerId,
  }: FetchAnswerCommentsAnswersUseCaseRequest): Promise<FetchAnswerCommentsAnswersUseCaseResponse> {
    const answerComments =
      await this.answerCommentRepository.findManyByAnswerId(answerId, {
        page,
      })

    return {
      answerComments,
    }
  }
}

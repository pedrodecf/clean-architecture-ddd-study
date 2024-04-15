import { Either, right } from '@/core/either'
import { AnswerComment } from '../../enterprise/entities/answer-comments'
import { AnswerCommentRepository } from '../repositories/answer-comments-repository'

interface FetchAnswerCommentsAnswersUseCaseRequest {
  page: number
  answerId: string
}

type FetchAnswerCommentsAnswersUseCaseResponse = Either<
  null,
  { answerComments: AnswerComment[] }
>

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

    return right({ answerComments })
  }
}

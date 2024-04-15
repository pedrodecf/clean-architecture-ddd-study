import { Either, right } from '@/core/either'
import { QuestionComment } from '../../enterprise/entities/question-comments'
import { QuestionCommentRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentsAnswersUseCaseRequest {
  page: number
  questionId: string
}

type FetchQuestionCommentsAnswersUseCaseResponse = Either<
  null,
  { questionComments: QuestionComment[] }
>

export class FetchQuestionCommentsAnswersUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionCommentsAnswersUseCaseRequest): Promise<FetchQuestionCommentsAnswersUseCaseResponse> {
    const questionComments =
      await this.questionCommentRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({ questionComments })
  }
}

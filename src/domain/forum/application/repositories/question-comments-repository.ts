import { PaginationParams } from '@/core/repositories/paginations-params'
import { QuestionComment } from '../../enterprise/entities/question-comments'

export interface QuestionCommentRepository {
  create(questionComment: QuestionComment): Promise<void>
  findById(id: string): Promise<QuestionComment | null>
  delete(questionComment: QuestionComment): Promise<void>
  findManyByQuestionId(
    questionId: string,
    options: PaginationParams,
  ): Promise<QuestionComment[]>
}

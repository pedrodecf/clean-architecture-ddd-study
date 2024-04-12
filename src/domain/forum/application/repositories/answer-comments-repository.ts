import { PaginationParams } from '@/core/repositories/paginations-params'
import { AnswerComment } from '../../enterprise/entities/answer-comments'

export interface AnswerCommentRepository {
  create(answerComment: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  delete(answerComment: AnswerComment): Promise<void>
  findManyByAnswerId(
    answerId: string,
    options: PaginationParams,
  ): Promise<AnswerComment[]>
}

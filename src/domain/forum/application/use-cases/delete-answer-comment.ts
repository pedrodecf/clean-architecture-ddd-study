import { AnswerCommentRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepositoy: AnswerCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentRepositoy.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Answer not found')
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('You can only delete your own comments')
    }

    await this.answerCommentRepositoy.delete(answerComment)

    return {}
  }
}

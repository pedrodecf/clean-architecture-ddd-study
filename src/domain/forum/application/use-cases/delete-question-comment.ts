import { QuestionCommentRepository } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepositoy: QuestionCommentRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentRepositoy.findById(questionCommentId)

    if (!questionComment) {
      throw new Error('Question not found')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('You can only delete your own comments')
    }

    await this.questionCommentRepositoy.delete(questionComment)

    return {}
  }
}

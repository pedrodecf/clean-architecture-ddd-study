import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerRepository } from '../repositories/answer-repository'
import { AnswerCommentRepository } from '../repositories/answer-comments-repository'
import { AnswerComment } from '../../enterprise/entities/answer-comments'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerCommentRepositoy: AnswerCommentRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.answerCommentRepositoy.create(answerComment)

    return {
      answerComment,
    }
  }
}

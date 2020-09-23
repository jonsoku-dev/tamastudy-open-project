import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePostCommentRequest } from './create-post-comment.request';

@InputType()
export class EditPostCommentRequest extends PartialType(
  CreatePostCommentRequest,
) {}

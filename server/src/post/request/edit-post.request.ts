import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePostRequest } from './create-post.request';

@InputType()
export class EditPostRequest extends PartialType(CreatePostRequest) {}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OpenchatService } from './openchat.service';
import { GetOpenchatListFilterDto } from './dto/getOpenchatListFilter.dto';
import { GetOpenchatListResponseDto } from './dto/getOpenchatListResponse.dto';
import { CreateOpenchatRequestDto } from './dto/createOpenchatRequest.dto';
import { Openchat } from './openchat.entity';
import { EditOpenchatRequestDto } from './dto/editOpenchatRequest.dto';
import { ParseStringPipe } from '../common/pipes/parse-string.pipe';

@Resolver()
export class OpenchatResolver {
  constructor(private readonly openchatService: OpenchatService) {}

  @Query(() => [GetOpenchatListResponseDto])
  getOpenchatList(@Args() getOpenchatListFilter: GetOpenchatListFilterDto) {
    return this.openchatService.getOpenchatList(getOpenchatListFilter);
  }

  @Mutation(() => Openchat)
  createOpenchat(
    @Args('input') createOpenchatRequestDto: CreateOpenchatRequestDto,
  ) {
    return this.openchatService.createOpenchat(createOpenchatRequestDto);
  }

  @Mutation(() => String)
  editOpenchat(
    @Args('openchatId', ParseStringPipe) openchatId: string,
    @Args('input') editOpenchatRequestDto: EditOpenchatRequestDto,
  ) {
    return this.openchatService.editOpenchat(
      openchatId,
      editOpenchatRequestDto,
    );
  }

  @Mutation(() => String)
  deleteOpenchat(@Args('openchatId', ParseStringPipe) openchatId: string) {
    return this.openchatService.deleteOpenchat(openchatId);
  }
}

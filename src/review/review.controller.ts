import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post, UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { CreateReviewDto } from "./dto/create-review.dto";
import { ReviewService } from "./review.service";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { UserEmail } from "../decorators/user-email.decorator";

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto ){
      return await this.reviewService.create(dto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string){
    const deletedDoc = await this.reviewService.delete(id)
    if (!deletedDoc){
      throw new HttpException('Отзыв не найден', HttpStatus.NOT_FOUND)
    }

  }

  @UseGuards(JwtAuthGuard)
  @Get('byProduct/:productId')
  async get(@Param('productId') productId:string, @UserEmail() email:string){
    console.log(email);
    const product = await this.reviewService.findByProductId(productId)
    if (!product){
      throw new HttpException('Пост не найден', HttpStatus.NOT_FOUND)
    }
    return product
  }


  @Delete('/:id')
  async deleteByProductId(@Param('id') id: string){
      return this.reviewService.deleteByProductId(id)
  }

}

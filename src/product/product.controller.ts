import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  HttpCode,
  HttpException,
  HttpStatus,
  UseGuards, UsePipes, ValidationPipe
} from "@nestjs/common";
import { ProductModel } from "./product.model/product.model";
import { FindProductDto } from "./dto/find-product.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "./product.service";

@Controller('product')
export class ProductController {

   constructor(private readonly productService: ProductService) {
   }

  @Post('create')
  async create(@Body() dto: CreateProductDto ){
     return this.productService.create(dto)
  }

  @Get(':id')
  async get(@Param('id') id: string){

     const product = await this.productService.findById(id)
    if (!product){
      throw new HttpException('Продукт не найден', HttpStatus.NOT_FOUND)
    }
    return product

  }

  @Delete(':id')
  async delete(@Param('id') id: string){
    const product = await this.productService.delete(id)
    if (!product){
      throw new HttpException('Продукт не найден', HttpStatus.NOT_FOUND)
    }
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ProductModel){
    const product = await this.productService.patch(id, dto)
    if (!product){
      throw new HttpException('Продукт не найден', HttpStatus.NOT_FOUND)
    }
    return product
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto){
      return this.productService.findWithReviews(dto)
  }
}

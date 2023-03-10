import { Injectable } from '@nestjs/common';
import { InjectModel } from "nestjs-typegoose";
import { ProductModel } from "./product.model/product.model";
import { ReturnModelType } from "@typegoose/typegoose/lib/types";
import { CreateProductDto } from "./dto/create-product.dto";
import { FindProductDto } from "./dto/find-product.dto";

@Injectable()
export class ProductService {
  constructor(@InjectModel(ProductModel) private readonly productModel: ReturnModelType<typeof ProductModel>) {}

  async create(dto: CreateProductDto){
      return this.productModel.create(dto)
  }

  async findById(id: string){
    return this.productModel.findById(id).exec()
  }

  async delete(id: string){
    return this.productModel.findByIdAndDelete(id).exec()
  }

  async patch(id: string, dto: CreateProductDto){
      return this.productModel.findByIdAndUpdate(id, dto, {new: true}).exec()
  }

  async findWithReviews(dto: FindProductDto){
     return this.productModel.aggregate([
       {$match: {
         categories: dto.category
         }},
       {
         $sort: {
           _id: 1
         }
       },
       {
         limit: dto.limit
       },
       {
         $lookup: {
            from: 'Review',
           localField: '_id',
           foreignField: 'productId',
           as: 'review'
         }
       }
     ])
  }
}

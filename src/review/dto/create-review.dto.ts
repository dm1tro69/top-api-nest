import { IsNumber, IsString } from "class-validator";


export class CreateReviewDto {
    @IsString()
    name: string

    @IsString()
    title: string

    @IsString()
    description: string

    @IsNumber()
    rating: number

    @IsString()
    productId: string
}

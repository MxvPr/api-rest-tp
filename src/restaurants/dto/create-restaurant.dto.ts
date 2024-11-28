import {Menu} from "../../menus/entities/menu.entity";
import {IsAlphanumeric, IsNotEmpty, IsNumber, IsObject, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateRestaurantDto {

    @IsNotEmpty()
    @MinLength(3, {message: "The name is too short"})
    @IsAlphanumeric(null, {message: "The name must be alphanumeric"})
    @ApiProperty({example: "McDo"})
    @IsString()
    name: string;

    @IsNotEmpty()
    @MinLength(10, {message: "The description is too short"})
    @IsAlphanumeric(null, {message: "The description must be alphanumeric"})
    @ApiProperty({example: "Le meilleur fast-food"})
    @IsString()
    description: string;

    @IsNotEmpty()
    @MinLength(3, {message: "The categorie is too short"})
    @IsAlphanumeric(null, {message: "The categorie must be alphanumeric"})
    @ApiProperty({example: "fast-food"})
    @IsString()
    categorie: string;

    @IsNotEmpty()
    @MinLength(3, {message: "The adress is too short"})
    @IsAlphanumeric(null, {message: "The adress must be alphanumeric"})
    @ApiProperty({example: "5 rue de la paix"})
    @IsString()
    adresse: string;

    @IsNotEmpty()
    @ApiProperty({
        example: [{
            id: "1",
            name: "MaxiBestOf",
            description: "Le meilleur menu de chez McDo",
            prix: 10,
            restaurant: "McDo",
        }],
    })
    @IsObject()
    menu: Menu[];

    @IsNotEmpty()
    @IsNumber(null, {message: "The note must be a number"})
    @ApiProperty({example: 10})
    @IsString()
    note: number;

    @IsNotEmpty()
    @ApiProperty({example: "10h-22h"})
    @IsString()
    horaires: string;
}

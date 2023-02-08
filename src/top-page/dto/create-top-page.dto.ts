import {TopLevelCategory} from '../top-page.model'

import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TopPageAdvantage {
	@IsString()
	title: string

	@IsString()
	description: string
}

export class HhDataDto {
	@IsNumber()
	count: number

	@IsNumber()
	juniorSalary: number

	@IsNumber()
	middleSalary: number

	@IsNumber()
	seniorSalary: number
}
export class CreateTopPageDto extends TimeStamps{

	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory

	@IsString()
	secondCategory: string

	@IsString()

	@IsString()
	title: string

	@IsString()
	category: string

	@IsOptional()
	@ValidateNested()
	@ Type(() => HhDataDto)
	hh?: HhDataDto

	@IsArray()
	@ValidateNested()
	@Type(() => HhDataDto)
	advantages: HhDataDto[]

	@IsString()
	seoText: string

	@IsString()
	tagsTitle?: string

	@IsArray()
	@IsString({each: true})
	tags: string[]
}

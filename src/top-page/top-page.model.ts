import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { prop, index } from '@typegoose/typegoose';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export class TopPageAdvantage {
	@prop()
	title: string

	@prop()
	description: string
}

export class HhData {
	@prop()
	count: number

	@prop()
	juniorSalary: number

	@prop()
	middleSalary: number

	@prop()
	seniorSalary: number
}
export interface TopPageModel extends  Base {}

@index({title: 'text', seoText: 'text'})
export class TopPageModel extends TimeStamps{

	@prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory

	@prop()
	secondCategory: string

	@prop({ unique: true })
	alias:string

	@prop()
	title: string

	@prop()
	category: string

	@prop({ type: () => HhData })
	hh?: HhData

	@prop({ type: () => [TopPageAdvantage] })
	advantages: TopPageAdvantage[]

	@prop()
	seoText: string

	@prop()
	tagsTitle?: string

	@prop({type: () => [String]})
	tags: string[]
}

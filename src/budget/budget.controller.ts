import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto, UpdateBudgetDto } from './dto/budget.dto';

@Controller('budget')
export class BudgetController {
	constructor(private readonly budgetService: BudgetService) {}

		// Budget tracking for a user (total, spent, remaining per budget)
		@Get('tracking/:userId')
		async budgetTracking(@Param('userId') userId: string) {
			const budgets = await this.budgetService.findAll();
			const userBudgets = budgets.filter(b => b.userId === userId);
			// For each budget, calculate spent and remaining
			// This assumes you have access to transactionService here, or you can move this logic to a service
			// For now, return structure for UI
			return userBudgets.map(budget => ({
				...budget,
				spent: 0, // Fill with actual spent calculation in service
				remaining: budget.amount // - spent
			}));
		}

	@Get()
	async findAll() {
		return this.budgetService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const budget = await this.budgetService.findOne(id);
		if (!budget) throw new NotFoundException('Budget not found');
		return budget;
	}


		@Post()
		@UsePipes(new ValidationPipe({ whitelist: true }))
		async create(@Body() body: CreateBudgetDto) {
			// Convert date strings to Date objects
			const data = {
				...body,
				startDate: new Date(body.startDate),
				endDate: new Date(body.endDate),
			};
			return this.budgetService.create(data);
		}


		@Put(':id')
		@UsePipes(new ValidationPipe({ whitelist: true }))
		async update(@Param('id') id: string, @Body() body: UpdateBudgetDto) {
			// Convert date strings to Date objects if present
			const data: any = { ...body };
			if (body.startDate) data.startDate = new Date(body.startDate);
			if (body.endDate) data.endDate = new Date(body.endDate);
			return this.budgetService.update(id, data);
		}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.budgetService.remove(id);
	}
}

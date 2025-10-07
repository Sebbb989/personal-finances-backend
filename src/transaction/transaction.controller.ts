import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto, UpdateTransactionDto } from './dto/transaction.dto';

@Controller('transaction')
export class TransactionController {
	constructor(private readonly transactionService: TransactionService) {}

	// Calculate user balance (income - expense)
	@Get('balance/:userId')
	async getBalance(@Param('userId') userId: string) {
		const transactions = await this.transactionService.findAll();
		const userTx = transactions.filter(tx => tx.userId === userId);
		const income = userTx.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
		const expense = userTx.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
		return { balance: income - expense, income, expense };
	}

	// Spending by category for a user (for charts)
	@Get('spending-by-category/:userId')
	async spendingByCategory(@Param('userId') userId: string) {
		const transactions = await this.transactionService.findAll();
		const userTx = transactions.filter(tx => tx.userId === userId && tx.type === 'expense');
		const byCategory = userTx.reduce((acc, tx) => {
			acc[tx.categoryId] = (acc[tx.categoryId] || 0) + tx.amount;
			return acc;
		}, {} as Record<string, number>);
		return byCategory;
	}

	@Get()
	async findAll() {
		return this.transactionService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const transaction = await this.transactionService.findOne(id);
		if (!transaction) throw new NotFoundException('Transaction not found');
		return transaction;
	}

	@Post()
	@UsePipes(new ValidationPipe({ whitelist: true }))
	async create(@Body() body: CreateTransactionDto) {
		const data: any = { ...body };
		if (body.date) data.date = new Date(body.date);
		else delete data.date;
		return this.transactionService.create(data as any);
	}

	@Put(':id')
	@UsePipes(new ValidationPipe({ whitelist: true }))
	async update(@Param('id') id: string, @Body() body: UpdateTransactionDto) {
		const data: any = { ...body };
		if (body.date) data.date = new Date(body.date);
		else delete data.date;
		return this.transactionService.update(id, data as any);
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.transactionService.remove(id);
	}
}

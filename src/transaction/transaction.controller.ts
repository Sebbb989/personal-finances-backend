import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto, UpdateTransactionDto } from './dto/transaction.dto';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
	constructor(private readonly transactionService: TransactionService) {}

	// Get the user's balance, total income, and total expenses
	@Get('balance/:userId')
	@ApiOperation({ summary: 'Get user balance, income, and expense' })
	@ApiResponse({ status: 200, description: 'User balance, income, and expense returned.' })
	async getBalance(@Param('userId') userId: string) {
		const transactions = await this.transactionService.findAll();
		const userTx = transactions.filter(tx => tx.userId === userId);
		const income = userTx.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
		const expense = userTx.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
		return { balance: income - expense, income, expense };
	}

	// Get how much a user has spent in each category (useful for charts)
	@Get('spending-by-category/:userId')
	@ApiOperation({ summary: 'Get user spending by category (for charts)' })
	@ApiResponse({ status: 200, description: 'Spending by category returned.' })
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
	@ApiOperation({ summary: 'Get all transactions' })
	@ApiResponse({ status: 200, description: 'All transactions returned.' })
	async findAll() {
		return this.transactionService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get a transaction by ID' })
	@ApiResponse({ status: 200, description: 'Transaction found.' })
	@ApiResponse({ status: 404, description: 'Transaction not found.' })
	async findOne(@Param('id') id: string) {
		const transaction = await this.transactionService.findOne(id);
		if (!transaction) throw new NotFoundException('Transaction not found');
		return transaction;
	}

	@Post()
	@ApiOperation({ summary: 'Create a new transaction' })
	@ApiResponse({ status: 201, description: 'Transaction created.' })
	@UsePipes(new ValidationPipe({ whitelist: true }))
	async create(@Body() body: CreateTransactionDto) {
		const data: any = { ...body };
		if (body.date) data.date = new Date(body.date);
		else delete data.date;
		return this.transactionService.create(data as any);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update a transaction by ID' })
	@ApiResponse({ status: 200, description: 'Transaction updated.' })
	@UsePipes(new ValidationPipe({ whitelist: true }))
	async update(@Param('id') id: string, @Body() body: UpdateTransactionDto) {
		const data: any = { ...body };
		if (body.date) data.date = new Date(body.date);
		else delete data.date;
		return this.transactionService.update(id, data as any);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a transaction by ID' })
	@ApiResponse({ status: 200, description: 'Transaction deleted.' })
	async remove(@Param('id') id: string) {
		return this.transactionService.remove(id);
	}
}

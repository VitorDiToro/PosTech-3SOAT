import { Repository } from 'typeorm';
import { DbConnection } from '../../../../infra/database/PostgreSQLConnection';
import { CreateOrderParams, IOrderRepositoryPort } from '../../../../application/ports/IOrderRepositoryPort';
import { IOrder } from '../../../../domain/entities/OrderEntity';
import { Order, OrderStatus } from '../entities/Order';

export class OrderRepository implements IOrderRepositoryPort {
	private connection: typeof DbConnection;

	constructor() {
		this.connection = DbConnection;
	}

	private getRepo(): Repository<Order> {
		return this.connection.getConnection().getRepository(Order);
	}

	async list(): Promise<IOrder[]> {
		const connection = this.getRepo();

		return connection.find({relations: ['products']});
	}

	async findById(id: string): Promise<IOrder | null> {
		const connection = this.getRepo();
		try {
			const order = await connection.createQueryBuilder('find_by_id')
				.where('id = :id', { id })
				.getOne();

			if (!order) {
				throw new Error('Order doesn\'t exists');
			}

			return order;
		} catch (error) {
			throw error;
		}
	}

	async update(id: string, status: OrderStatus): Promise<any> {
		const connection = this.getRepo();

		await connection.createQueryBuilder('update_order')
			.update()
			.where('id = :id', { id })
			.set({ status })
			.execute();
		return Promise.resolve();
	}

	async delete(id: string){
		const connection = this.getRepo();
		await connection.createQueryBuilder('delete_order')
			.delete()
			.from(Order)
			.where('id = :id', { id })
			.execute();
		return Promise.resolve();
	}
	async create(params: CreateOrderParams): Promise<IOrder> {
		const connection = this.getRepo();
		const client = connection.create(params);

		return connection.save(client);
	}
}

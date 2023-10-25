import { IClient } from '../domain/entities/ClientEntity';

export interface CreateClientParamsDto extends Omit<IClient, 'id'> {
	name: string,
	cpf: string,
	email: string
}

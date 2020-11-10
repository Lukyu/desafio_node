import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // TODO
    const { total } = this.transactionsRepository.getBalance();

    if(total < value && type == 'outcome')
      throw Error('You have no balance to make this transaction');

    const createTransaction = new Transaction({
      title,
      value,
      type
    });

    this.transactionsRepository.create(createTransaction);

    return createTransaction;
  }
}

export default CreateTransactionService;

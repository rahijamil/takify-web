import { useState } from 'react';
import moment from 'moment';
import { MdAdd, MdRemove, MdShop } from 'react-icons/md';
import { Transaction, TransactionType } from './transactionTypes';
import IconWrapper from '@/components/IconWrapper';

const TransactionItem = ({ item, isLastItem }: { item: Transaction, isLastItem?: boolean }) => {
    const [transactionId, setTransactionId] = useState<string | null>(null);

    return (
        <>
            <div
                onClick={() => setTransactionId(item.id)}
                className={`cursor-pointer p-4 hover:bg-takify-gold/10 transition ${!isLastItem && "border-b border-takify-light_grey"}`}
            >
                <div className="flex items-center gap-4">
                    <div className="bg-takify-gold/50 rounded-full w-10 h-10 flex items-center justify-center">
                        <IconWrapper icon={item.category?.icon || MdShop} className='text-base text-takify-dark_grey' />
                    </div>

                    <div className='flex items-center justify-between gap-8 flex-1'>
                        <div>
                            <p className={`font-medium text-sm text-takify-dark_grey`}>{item.note}</p>
                            <p className={`text-xs text-[#666]`}>
                                {moment(item.date).format('DD MMM YYYY')}
                            </p>
                        </div>

                        <p
                            className={` ${item.type === TransactionType.Expense ? 'text-[#ff6347]' : item.type === TransactionType.Income ? 'text-[#2e8b57]' : 'text-[#ff6347]'
                                } font-bold flex items-center`}
                        >
                            <span>
                                {(item.type == TransactionType.Expense || item.type == TransactionType.Debt) ? <MdRemove /> : <MdAdd />}
                            </span>
                            <span>
                                ${item.amount.toFixed(2)}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* {transactionId === item.id && (
                <TransactionDetails transaction={item} onClose={() => setTransactionId(null)} />
            )} */}
        </>
    );
};

export default TransactionItem;

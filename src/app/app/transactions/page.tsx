"use client";
import { supabase } from '@/config/supabaseConfig';
import React, { useEffect, useState } from 'react'
import TransactionSkeleton from './TransactionSkeleton';
import TransactionItem from './TransactionItem';
import Button from '@/components/Button';
import { MdAdd } from 'react-icons/md';
import { Transaction, TransactionType } from './transactionTypes';
import TransactionModal from './modal.transaction';

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState<boolean>(true);
  const [showAddTransaction, setShowAddTransaction] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  useEffect(() => {
    setTransactionsLoading(true);
    const fetchTransactions = async () => {
      const { data, error } = await supabase.from("transactions").select("*").limit(5);

      if (error) console.error(`Error fetching transactions: ${error.message}`);

      setTransactions(data as any);
      setTransactionsLoading(false);
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    if (showAddTransaction) {
      document.documentElement.classList.add('overflow-y-hidden');
    }
    else {
      document.documentElement.classList.remove('overflow-y-hidden');
    }
  }, [showAddTransaction])


  const handleShowAddTransaction = () => {
    setShowAddTransaction(true);
  }

  return (
    <div>
      <div className="wrapper space-y-4 md:space-y-12">
        <div className='flex items-center justify-between gap-8'>
          <h1 className='text-3xl font-bold'>Transactions</h1>
          <Button onClick={handleShowAddTransaction}>
            <span>Add</span>
            <MdAdd className="text-xl" />
          </Button>
        </div>

        <div className='space-y-4'>
          <ul className='flex gap-4'>
            {
              Object.keys(TransactionType).map((key) => (
                <li
                  key={key}
                  className={`text-takify-dark_grey font-medium flex-1 text-center pb-4 border-b border-takify-light_grey`}>
                  {key}
                </li>
              ))
            }
          </ul>

          <div className='grid grid-cols-3 gap-4'>
            {transactionsLoading ? (
              <>
                <TransactionSkeleton />
                <TransactionSkeleton />
                <TransactionSkeleton />
                <TransactionSkeleton />
                <TransactionSkeleton />
                <TransactionSkeleton />
                <TransactionSkeleton />
                <TransactionSkeleton />
                <TransactionSkeleton />
              </>
            ) :
              <>
                <div>
                  {
                    transactions.filter((transaction: any) => transaction.type == TransactionType.Expense).length > 0 ? (
                      transactions.filter((transaction: any) => transaction.type == TransactionType.Expense).map((transaction, index) => (
                        <TransactionItem
                          key={transaction.id}
                          item={transaction}
                          setTransactionId={setTransactionId}
                          transactionId={transactionId}
                          isLastItem={index === transactions.length - 1}
                        />
                      ))
                    ) : (
                      <p>No transactions found.</p>
                    )
                  }
                </div>
                <div>
                  {
                    transactions.filter((transaction: any) => transaction.type == TransactionType.Income).length > 0 ? (
                      transactions.filter((transaction: any) => transaction.type == TransactionType.Income).map((transaction, index) => (
                        <TransactionItem
                          key={transaction.id}
                          item={transaction}
                          setTransactionId={setTransactionId}
                          transactionId={transactionId}
                          isLastItem={index === transactions.length - 1}
                        />
                      ))
                    ) : (
                      <p>No transactions found.</p>
                    )
                  }
                </div>
                <div>
                  {
                    transactions.filter((transaction: any) => transaction.type == TransactionType.Debt).length > 0 ? (
                      transactions.filter((transaction: any) => transaction.type == TransactionType.Debt).map((transaction, index) => (
                        <TransactionItem
                          key={transaction.id}
                          item={transaction}
                          setTransactionId={setTransactionId}
                          transactionId={transactionId}
                          isLastItem={index === transactions.length - 1}
                        />
                      ))
                    ) : (
                      <p>No transactions found.</p>
                    )
                  }
                </div>
              </>
            }
          </div>
        </div>
      </div>

      {
        showAddTransaction && (
          <TransactionModal
            setShowAddTransaction={setShowAddTransaction}
            showAddTransaction={showAddTransaction}
          />
        )
      }

      {
        transactionId && (
          <TransactionModal
            setShowAddTransaction={setShowAddTransaction}
            showAddTransaction={showAddTransaction}
            transactionForEdit={transactions.find((transaction) => transaction.id == transactionId)}
            setTransactionId={setTransactionId}
          />
        )
      }
    </div>
  )
}

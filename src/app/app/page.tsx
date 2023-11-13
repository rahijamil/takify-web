"use client";
import React, { useEffect, useState } from 'react'
import { supabase } from '../../config/supabaseConfig'
import { MdArrowDownward, MdArrowUpward, MdWallet } from 'react-icons/md';
import TransactionSkeleton from './transactions/TransactionSkeleton';
import TransactionItem from './transactions/TransactionItem';
import Link from 'next/link';
import { Transaction } from './transactions/transactionTypes';

const SummaryCard = ({ title, amount, icon }: {
  title: string;
  amount: string;
  icon: JSX.Element;
}) => {
  return (
    <div className='bg-takify-deep_blue rounded-lg p-4 flex items-center justify-between shadow-md'>
      {icon}
      <div>
        <p className='font-semibold text-white'>{title}</p>
        <p className='text-takify-gold font-bold text-2xl'>{amount}</p>
      </div>
    </div>
  );
};

export default function App() {
  const [transactions, setTransactions] = useState<[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState<boolean>(true);

  const [financialData, setFinancialData] = useState<{
    balance: number;
    income: number;
    expenses: number;
  }>({
    balance: 0,
    income: 0,
    expenses: 0,
  });

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

  // useEffect(() => {
  //   const income = transactions
  //     .filter((transaction) => transaction.type === TransactionType.Income)
  //     .reduce((acc, curr) => acc + curr.amount, 0);

  //   const expensesByCategory: Record<string, number> = transactions
  //     .filter((transaction) => transaction.type === TransactionType.Expense)
  //     .reduce((acc: Record<string, number>, curr) => {
  //       // Extract the category name safely
  //       const categoryName = curr.category ? curr.category.name : 'Uncategorized';
  //       if (!acc[categoryName]) {
  //         acc[categoryName] = 0;
  //       }
  //       acc[categoryName] += curr.amount;
  //       return acc;
  //     }, {});

  //   const categories = Object.keys(expensesByCategory);
  //   setExpenseCategories(categories);

  //   const expenses = Object.values(expensesByCategory).reduce((acc, curr) => acc + curr, 0);

  //   setFinancialData({
  //     balance: income - expenses,
  //     income: income,
  //     expenses: expenses,
  //   });

  //   // Prepare and set data for the pie chart
  //   const preparedChartData: ChartDataItem[] = Object.keys(expensesByCategory).map((categoryName, index) => ({
  //     key: `pie-${index}`,
  //     value: expensesByCategory[categoryName],
  //     svg: { fill: colors[index % colors.length] },
  //     arc: { outerRadius: '95%', innerRadius: '60%' },
  //   }));

  //   setChartData(preparedChartData); // Update the chartData state

  //   const barData = groupExpensesByMonth(transactions);
  //   setBarChartData(barData);

  // }, [transactions]);

  return (
    <div>
      <div className="wrapper space-y-4 md:space-y-12">
        <h1 className='text-3xl font-bold hidden md:block'>Dashboard</h1>

        <div className='flex gap-8'>
          <div className='flex-1 space-y-4 md:space-y-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8'>
              <SummaryCard
                title="Current Balance"
                amount={financialData.balance.toFixed(2)}
                icon={
                  <MdWallet className="text-takify-gold text-2xl" />
                }
              />
              <SummaryCard
                title="Total Income"
                amount={financialData.income.toFixed(2)}
                icon={
                  <MdArrowUpward className="text-takify-gold text-2xl" />
                }
              />
              <SummaryCard
                title="Total Expenses"
                amount={financialData.expenses.toFixed(2)}
                icon={
                  <MdArrowDownward className="text-takify-gold text-2xl" />
                }
              />
            </div>

            <div>
              <div className='grid grid-cols-2 gap-8'>
                <div>
                  <div className='flex items-center justify-between gap-8'>
                    <h2 className='text-lg font-bold text-takify-deep_blue py-4'>Recent Transactions</h2>

                    <Link href="/app/transactions" className='text-takify-gold text-sm'>
                      View all
                    </Link>
                  </div>

                  <div className='grid grid-cols-1 rounded-lg overflow-hidden'>
                    {transactionsLoading ? (
                      <>
                        <TransactionSkeleton />
                        <TransactionSkeleton />
                        <TransactionSkeleton />
                      </>
                    ) :
                      transactions.length > 0 ? (
                        transactions.map((transaction: Transaction, index) => (
                          <TransactionItem item={transaction} isLastItem={index === transactions.length - 1} />
                        ))
                      ) : (
                        <p>No transactions found.</p>
                      )
                    }
                  </div>
                </div>

                <div>
                  <div className='flex items-center justify-between gap-8'>
                    <h2 className='text-lg font-bold text-takify-deep_blue py-4'>Recent Transactions</h2>

                    <Link href="/app/transactions" className='text-takify-gold text-sm'>
                      View all
                    </Link>
                  </div>

                  <div className='grid grid-cols-1 rounded-lg overflow-hidden'>
                    {transactionsLoading ? (
                      <>
                        <TransactionSkeleton />
                        <TransactionSkeleton />
                        <TransactionSkeleton />
                      </>
                    ) :
                      transactions.length > 0 ? (
                        transactions.map((transaction: Transaction, index) => (
                          <TransactionItem item={transaction} isLastItem={index === transactions.length - 1} />
                        ))
                      ) : (
                        <p>No transactions found.</p>
                      )
                    }
                  </div>
                </div>
              </div>

              <div>
                more section
              </div>
            </div>
          </div>


          <div className='space-y-4 md:space-y-12'>
            <div className='bg-takify-gold/50 rounded-lg p-4 aspect-square shadow-md'>
              This is a Fucking Card
            </div>
            <div className='bg-takify-gold/50 rounded-lg p-4 aspect-square shadow-md'>
              This is another Fucking Card
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

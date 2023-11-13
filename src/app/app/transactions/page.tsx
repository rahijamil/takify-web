"use client";
import { supabase } from '@/config/supabaseConfig';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import TransactionSkeleton from './TransactionSkeleton';
import TransactionItem from './TransactionItem';
import Button from '@/components/Button';
import { MdAdd, MdClose } from 'react-icons/md';
import { TransactionState, TransactionType } from './transactionTypes';
import { Category, DEBT_CATEGORY_GROUPS, EXPENSE_CATEGORY_GROUPS, INCOME_CATEGORY_GROUPS } from './categories';
import useTransactionForm from '@/hooks/useTransactionForm';
import TextInput from '@/components/TextInput';
import { BarLoader } from 'react-spinners';
import { Colors } from '@/theme/theme';
import IconWrapper from '@/components/IconWrapper';

const initialState: TransactionState = {
  type: TransactionType.Expense,
  note: '',
  category: null,
  date: "",
  amount: 0,
};

export default function Transactions() {
  const [transactions, setTransactions] = useState<[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState<boolean>(true);
  const [showAddTransaction, setShowAddTransaction] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setACtiveTab] = useState<TransactionType>(TransactionType.Expense);

  const {
    state: transaction,
    setType,
    setNote,
    setDate,
    setAmount,
    toggleCategory,
  } = useTransactionForm(initialState);

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

  const handleSelectCategory = useCallback((category: Category) => {
    toggleCategory(category);
  }, [toggleCategory]);

  const handleCloseAddTransaction = () => {
    setShowAddTransaction(false);
    setACtiveTab(TransactionType.Expense);
    toggleCategory(null);
  }

  const handleShowAddTransaction = () => {
    setShowAddTransaction(true);
    setACtiveTab(TransactionType.Expense);
  }

  const handleSubmitTransaction = async () => {
    // Construct the transaction object
    const transactionData = {
      type: transaction.type,
      note: transaction.note,
      category: transaction.category, // Ensure you have a category name or null
      date: transaction.date,
      amount: transaction.amount,
    };

    if (!transactionData.type || !transactionData.category || !transactionData.amount || !transactionData.date) {
      return;
    }

    try {

      setIsLoading(true);

      // Add a new document with a generated id to the "transactions" collection
      const { data, error } = await supabase.from("transactions").insert(transactionData).select("id").single();

      if (error) console.error(`Error adding budget: ${error.message}`);

      console.log("Transaction submitted with ID: ", data?.id);
      setIsLoading(false);
      handleCloseAddTransaction(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error adding transaction: ", error);
      setIsLoading(false);
    }
    finally {
      // setIsLoading(false);
    }
  };

  const handleTab = useCallback((key: string) => {
    setACtiveTab(TransactionType[key as keyof typeof TransactionType]);
    setType(TransactionType[key as keyof typeof TransactionType]);
  }, [setACtiveTab]);

  const renderTransactionForm = useMemo(() => {
    return (
      <div className='p-8 space-y-4'>
        <TextInput
          label='Amount'
          onChange={setAmount as any}
          value={transaction.amount}
          type='number'
        />
        <TextInput
          label='Note'
          onChange={setNote as any}
          value={transaction.note}
          type='text'
        />
        <TextInput
          label='Date'
          onChange={setDate as any}
          value={transaction.date}
          type='datetime-local'
        />

        {/* <TextInput
          label='File'
          onChange={setDate as any}
          value={transaction.}
          type='file'
        /> */}

        {
          isLoading ? (
            <div className="flex items-center justify-center">
              <BarLoader color={Colors.primary} />
            </div>
          ) : (
            <Button onClick={handleSubmitTransaction} className='w-full'>
              Add
            </Button>
          )
        }
      </div>
    )
  }, [transaction, setAmount, setNote])

  const renderAddTransactionModal = useMemo(() => (
    <div className='fixed bottom-0 left-0 right-0 top-0 bg-black/30 backdrop-blur-sm flex items-center justify-center'>
      <div className='bg-white rounded-lg overflow-hidden w-11/12 max-w-4xl'>
        <div className='flex items-center py-4 px-8'>
          <button className='hover:bg-takify-light_silver transition p-2 rounded-full cursor-pointer' onClick={handleCloseAddTransaction}>
            <MdClose className="text-xl" />
          </button>

          <div className='text-center flex-1'>
            <h1 className="text-xl font-semibold text-takify-dark_grey">Add Transaction</h1>
          </div>
        </div>

        <div className="flex">
          <div className='max-w-lg flex-1'>
            <div>
              <ul className='flex shadow-sm'>
                {
                  Object.keys(TransactionType).map((key) => (
                    <li className={`text-takify-dark_grey font-medium cursor-pointer transition flex-1 border-b-2 p-2 text-center ${activeTab == TransactionType[key as keyof typeof TransactionType] ? 'border-takify-deep_blue text-takify-deep_blue' : 'hover:text-takify-deep_blue border-transparent'}`} onClick={() => handleTab(key)}>
                      {key}
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className='p-8 pb-20 h-96 overflow-y-auto'>
              <ul className='space-y-8'>
                {
                  (activeTab == TransactionType.Expense
                    ? EXPENSE_CATEGORY_GROUPS
                    : activeTab == TransactionType.Income
                      ? INCOME_CATEGORY_GROUPS
                      : DEBT_CATEGORY_GROUPS).map((group) => (
                        <li className='space-y-2'>
                          <div className='flex items-center gap-2'>
                            <IconWrapper icon={group.icon} className='text-xl text-takify-deep_blue' />
                            <span className='text-takify-dark_grey font-semibold cursor-pointer'>{group.name}</span>
                          </div>

                          <ul key={group.id} className='grid grid-cols-4 gap-8'>
                            {
                              group.categories.map((category) => (
                                <li key={category.id} className='flex items-center justify-center flex-col cursor-pointer group' onClick={() => handleSelectCategory(category)}>
                                  <div className={`${transaction.category?.name == category.name ? "bg-takify-deep_blue" : "bg-takify-light_silver group-hover:bg-takify-light_grey"} transition w-12 h-12 flex items-center justify-center rounded-full`}>
                                    <IconWrapper icon={category.icon} className={`text-xl ${transaction.category?.name == category.name ? "text-white" : "text-takify-dark_grey"}`} />
                                  </div>
                                  <span className='text-center text-sm'>{category.name}</span>
                                </li>
                              ))
                            }
                          </ul>
                        </li>
                      ))
                }
              </ul>
            </div>
          </div>

          <div className='max-w-lg flex-1'>
            {renderTransactionForm}
          </div>
        </div>

      </div>
    </div>
  ), [showAddTransaction, activeTab, transaction]);

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
                <li className={`text-takify-dark_grey font-medium flex-1 text-center pb-4 border-b border-takify-light_grey`}>
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
                      transactions.filter((transaction: any) => transaction.type == TransactionType.Expense).map((transaction: any) => (
                        <TransactionItem item={transaction} />
                      ))
                    ) : (
                      <p>No transactions found.</p>
                    )
                  }
                </div>
                <div>
                  {
                    transactions.filter((transaction: any) => transaction.type == TransactionType.Income).length > 0 ? (
                      transactions.filter((transaction: any) => transaction.type == TransactionType.Income).map((transaction: any) => (
                        <TransactionItem item={transaction} />
                      ))
                    ) : (
                      <p>No transactions found.</p>
                    )
                  }
                </div>
                <div>
                  {
                    transactions.filter((transaction: any) => transaction.type == TransactionType.Debt).length > 0 ? (
                      transactions.filter((transaction: any) => transaction.type == TransactionType.Debt).map((transaction: any) => (
                        <TransactionItem item={transaction} />
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
          renderAddTransactionModal
        )
      }
    </div>
  )
}

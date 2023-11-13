import React, { useCallback, useState, useMemo, useEffect } from 'react'
import { Transaction, TransactionState, TransactionType } from './transactionTypes';
import { Category, DEBT_CATEGORY_GROUPS, EXPENSE_CATEGORY_GROUPS, INCOME_CATEGORY_GROUPS } from './categories';
import useTransactionForm from '@/hooks/useTransactionForm';
import TextInput from '@/components/TextInput';
import { BarLoader } from 'react-spinners';
import { Colors } from '@/theme/theme';
import IconWrapper from '@/components/IconWrapper';
import { supabase } from '@/config/supabaseConfig';
import Button from '@/components/Button';
import { MdClose } from 'react-icons/md';

const initialState: TransactionState = {
    type: TransactionType.Expense,
    note: '',
    category: null,
    date: "",
    amount: 0,
};

export default function TransactionModal({
    showAddTransaction,
    setShowAddTransaction,
    transactionForEdit,
    setTransactionId
}: {
    showAddTransaction?: boolean,
    setShowAddTransaction?: React.Dispatch<React.SetStateAction<boolean>>
    transactionForEdit?: Transaction,
    setTransactionId?: React.Dispatch<React.SetStateAction<string | null>>
}) {
    const {
        state: transaction,
        setType,
        setNote,
        setDate,
        setAmount,
        toggleCategory,
    } = useTransactionForm(initialState);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [activeTab, setACtiveTab] = useState<TransactionType>(TransactionType.Expense);

    useEffect(() => {
        if (transactionForEdit?.id) {
            setType(transactionForEdit.type);
            setNote(transactionForEdit.note);
            setAmount(transactionForEdit.amount);
            setDate(transactionForEdit.date);
            toggleCategory(transactionForEdit.category);

            setACtiveTab(transactionForEdit.type);
        }
    }, [transactionForEdit, setAmount, setDate, setNote, setType, toggleCategory]);


    const handleSelectCategory = useCallback((category: Category) => {
        toggleCategory(category);
    }, [toggleCategory]);

    const handleCloseAddTransaction = useCallback(() => {
        if (setShowAddTransaction) {
            setShowAddTransaction(false);
        }

        setACtiveTab(TransactionType.Expense);
        toggleCategory(null);


        if (transactionForEdit && setTransactionId) {
            setTransactionId(null);
        }
    }, [setShowAddTransaction, transactionForEdit, setTransactionId, toggleCategory]);

    const handleSubmitTransaction = useCallback(async () => {
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

            if (transactionForEdit?.id) {
                const { data, error } = await supabase
                    .from('transactions')
                    .update(transactionData)
                    .eq('id', transactionForEdit.id)

                if (error) console.error(`Error editing budget: ${error.message}`);
                else {
                    setIsLoading(false);
                    handleCloseAddTransaction(); // Close the modal after successful submission
                }
            } else {
                // Add a new document with a generated id to the "transactions" collection
                const { data, error } = await supabase
                    .from("transactions")
                    .insert(transactionData)

                if (error) console.error(`Error adding budget: ${error.message}`);
                else {
                    setIsLoading(false);
                    handleCloseAddTransaction(); // Close the modal after successful submission
                }
            }
        } catch (error) {
            console.error("Error adding transaction: ", error);
            setIsLoading(false);
        }
        finally {
            // setIsLoading(false);
        }
    }, [transaction, transactionForEdit, handleCloseAddTransaction]);

    const handleTab = useCallback((key: string) => {
        setACtiveTab(TransactionType[key as keyof typeof TransactionType]);
        setType(TransactionType[key as keyof typeof TransactionType]);
    }, [setACtiveTab, setType]);

    const handleDeleteTransaction = useCallback(async () => {
        if (transactionForEdit?.id) {
            if (confirm("Are you sure you want to delete this transaction?")) {
                setIsLoading(true);

                const { error } = await supabase
                    .from('transactions')
                    .delete()
                    .eq('id', transactionForEdit.id);

                if (error) console.error(`Error deleting budget: ${error.message}`)
                else {
                    setIsLoading(false);
                    handleCloseAddTransaction();
                }
            }
        }
    }, [transactionForEdit, handleCloseAddTransaction]);

    const renderTransactionForm = useMemo(() => {
        return (
            <div className='space-y-4'>
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

                <div className='flex items-center gap-4'>
                    <div className='flex-1'>
                        {
                            isLoading ? (
                                <div className="flex items-center justify-center py-4">
                                    <BarLoader color={Colors.primary} />
                                </div>
                            ) : (
                                <Button onClick={handleSubmitTransaction} className='w-full'>
                                    {
                                        transactionForEdit ? (
                                            <span>Edit Transaction</span>
                                        ) : (
                                            <span>Add Transaction</span>
                                        )
                                    }
                                </Button>
                            )
                        }
                    </div>

                    {
                        transactionForEdit && (
                            <div className='flex-1'>
                                {
                                    isLoading ? (
                                        <div className="flex items-center justify-center py-4">
                                            <BarLoader color={Colors.negative} />
                                        </div>
                                    ) : (
                                        <Button onClick={handleDeleteTransaction} className='w-full' variant="danger">
                                            {
                                                transactionForEdit && (
                                                    <span>Delete Transaction</span>
                                                )
                                            }
                                        </Button>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }, [transaction, setAmount, setNote, setDate, isLoading, transactionForEdit, handleSubmitTransaction, handleDeleteTransaction]);

    const renderAddTransactionModal = useMemo(() => (
        <div className='fixed bottom-0 left-0 right-0 top-0 bg-black/30 backdrop-blur-sm flex items-center justify-center'>
            <div className='bg-white rounded-lg overflow-hidden w-11/12 max-w-4xl'>
                <div className='flex items-center py-4 px-8'>
                    <button className='hover:bg-takify-light_silver transition p-2 rounded-full cursor-pointer' onClick={handleCloseAddTransaction}>
                        <MdClose className="text-xl" />
                    </button>

                    <div className='text-center flex-1'>
                        <h1 className="text-xl font-semibold text-takify-dark_grey">
                            {
                                transactionForEdit ? (
                                    <span>Edit Transaction</span>
                                ) : (
                                    <span>Add Transaction</span>
                                )
                            }
                        </h1>
                    </div>
                </div>

                <div className="flex">
                    <div className='max-w-lg flex-1'>
                        <div>
                            <ul className='flex shadow-sm'>
                                {
                                    Object.keys(TransactionType).map((key) => (
                                        <li
                                            key={key}
                                            className={`text-takify-dark_grey font-medium cursor-pointer transition flex-1 border-b-2 p-2 text-center ${activeTab == TransactionType[key as keyof typeof TransactionType] ? 'border-takify-deep_blue text-takify-deep_blue' : 'hover:text-takify-deep_blue border-transparent'}`} onClick={() => handleTab(key)}>
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
                                                <li
                                                    key={group.id}
                                                    className='space-y-2'>
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

                    <div className='max-w-lg flex-1 p-8'>
                        {renderTransactionForm}
                    </div>
                </div>
            </div>
        </div>
    ), [showAddTransaction, activeTab, transaction, renderTransactionForm, handleCloseAddTransaction, handleTab, handleSelectCategory, transactionForEdit]);


    return (
        <>
            {renderAddTransactionModal}
        </>
    )
}

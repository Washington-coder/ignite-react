import * as Dialog from "@radix-ui/react-dialog";
import {
    CloseButton,
    Content,
    Overlay,
    TransactionType,
    TransactionTypeButton,
} from "./styles";
import {
    ArrowCircleDown,
    ArrowCircleUp,
    X
} from "phosphor-react";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const newTransactionSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = z.infer<typeof newTransactionSchema>

export function NewTransactionModal() {
    const createTransaction = useContextSelector(TransactionsContext, (context) => {
        return context.createTransaction;
    })

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting }
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionSchema),
        defaultValues: {
            type: 'income'
        }
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
        createTransaction(data)
        reset()
    }

    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>

                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input
                        type="text"
                        placeholder="Descrição"
                        required
                        {...register('description')}
                    />
                    <input
                        type="number"
                        placeholder="Preço"
                        required
                        {...register('price', { valueAsNumber: true })}
                    />
                    <input
                        type="text"
                        placeholder="Categoria"
                        required
                        {...register('category')}
                    />

                    <Controller
                        control={control}
                        name="type"
                        render={(({ field }) => {
                            return (
                                <TransactionType
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <TransactionTypeButton value='income' variant="income">
                                        <ArrowCircleUp size={24} />
                                        Entrada
                                    </TransactionTypeButton>
                                    <TransactionTypeButton value='outcome' variant="outcome">
                                        <ArrowCircleDown size={24} />
                                        Saída
                                    </TransactionTypeButton>
                                </TransactionType>
                            );
                        })}
                    />

                    <button type='submit' disabled={isSubmitting}>
                        Cadastrar
                    </button>
                </form>

            </Content>
        </Dialog.Portal>
    );
}
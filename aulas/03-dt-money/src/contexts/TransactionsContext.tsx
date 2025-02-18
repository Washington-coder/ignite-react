import { createContext, useEffect, useState } from 'react'

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

interface TransactionContextType {
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionsProviderProps {
    children: React.ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    async function fetchTransactions(query?: string ) {
        const url = new URL('http://localhost:3333/transactions');
    
        if (query) {
            url.searchParams.append('q', query);
        }
    
        console.log("URL gerada:", url.toString()); // Debugando a URL gerada
    
        const response = await fetch(url);
        const data = await response.json();
    
        console.log("Resposta do servidor:", data); // Debugando a resposta
    
        setTransactions(data);
    }    

    useEffect(() => {
        fetchTransactions()
    }, [])

    return (
        <TransactionsContext.Provider value={{ 
            transactions,
            fetchTransactions
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}
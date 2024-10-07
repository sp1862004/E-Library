import { createContext, useContext, useState, useEffect } from 'react';
import { get, ref, remove, set } from 'firebase/database';
import db from '../../firebase';  

const BooksContext = createContext();

export const useBooks = () => useContext(BooksContext);

export const BooksProvider = ({ children }) => {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const dbRef = ref(db, "BooksList");  
        const snapshot = await get(dbRef);
        let bookArray = [];
        if (snapshot.exists()) {
            for (const key in snapshot.val()) {
                const book = snapshot.val()[key];
                bookArray.push({ id: key, ...book });
            }
        }
        setBooks(bookArray);  
    };

    const handleDelete = async (id) => {
        const dbRef = ref(db, `BooksList/${id}`);  
        await remove(dbRef);
        fetchBooks();  
    };

    const updateBook = async (id, updatedData) => {
        const dbRef = ref(db, `BooksList/${id}`);
        await set(dbRef, updatedData);
        fetchBooks();  
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <BooksContext.Provider value={{ books, handleDelete, updateBook }}>
            {children}
        </BooksContext.Provider>
    );
};

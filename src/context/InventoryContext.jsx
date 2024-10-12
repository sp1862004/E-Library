import { createContext, useContext, useState, useEffect } from 'react';
import { get, ref, remove, set } from 'firebase/database';
import db from '../../firebase';  

const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    // Fetch inventory items from Firebase
    const fetchItems = async () => {
        const dbRef = ref(db, "InventoryList");  // Changed to "InventoryList"
        const snapshot = await get(dbRef);
        let itemArray = [];
        if (snapshot.exists()) {
            for (const key in snapshot.val()) {
                const item = snapshot.val()[key];
                itemArray.push({ id: key, ...item });
            }
        }
        setItems(itemArray);  // Update state with inventory items
    };

    // Handle delete operation for inventory items
    const handleDelete = async (id) => {
        const dbRef = ref(db, `InventoryList/${id}`);  // Changed to "InventoryList"
        await remove(dbRef);
        fetchItems();  // Refresh items list after deletion
    };

    // Update an inventory item
    const updateItem = async (id, updatedData) => {
        const dbRef = ref(db, `InventoryList/${id}`);  // Changed to "InventoryList"
        await set(dbRef, updatedData);
        fetchItems();  // Refresh items list after update
    };

    useEffect(() => {
        fetchItems();  // Fetch inventory items when the component mounts
    }, []);

    return (
        <InventoryContext.Provider value={{ items, handleDelete, updateItem }}>
            {children}
        </InventoryContext.Provider>
    );
};

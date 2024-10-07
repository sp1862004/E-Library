import React, { useEffect, useState } from 'react';
import { useBooks } from '../../context/BooksContext'; 
import { ref, onValue } from 'firebase/database';
import db from '../../../firebase'; 
import { Link } from 'react-router-dom';
import 'animate.css';

const BooksList = () => {
    const { handleDelete } = useBooks(); 
    const [books, setBooks] = useState([]); 
    const [searchTerm, setSearchTerm] = useState(''); 

    useEffect(() => {
        const booksRef = ref(db, 'BooksList'); 
        onValue(booksRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const bookList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setBooks(bookList);
            }
        });
    }, []);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <div className="row d-flex justify-content-center mt-4">
                <div className="col-md-8">
                    <input
                        type="text"
                        className="form-control shadow-lg p-3 mb-5 bg-light rounded"
                        placeholder="Search books by title or author..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="row">
                {filteredBooks.map((book) => {
                    return (
                        <div key={book.id} className="col-md-3 mb-5">
                            <div className="card h-100 shadow-lg border-0 animated animate__fadeIn">
                                <img 
                                    src={book.imageUrl} 
                                    className="card-img-top" 
                                    alt={book.title} 
                                    style={{ height: '200px', objectFit: 'cover' }} 
                                />
                                <div className="card-body">
                                    <h5 className="card-title text-primary">{book.title}</h5>
                                    <p className="card-text">
                                        <strong>Author:</strong> {book.author}<br />
                                        <strong>Rating:</strong> {book.rating} / 5<br />
                                        <strong>Price:</strong> ${book.price}<br />
                                        <strong>Publication Date:</strong> {new Date(book.publicationDate).toLocaleDateString()}<br />
                                    </p>
                                    <Link to={`/BookDetails/${book.id}`} className="btn btn-primary">Show More</Link>
                                    <button 
                                        onClick={() => handleDelete(book.id)} 
                                        className="btn btn-danger ms-3"
                                    >
                                        Delete
                                    </button>
                                </div>
                               
                            </div>
                        </div>
                    );
                })}

                {filteredBooks.length === 0 && (
                    <div className="text-center fs-1 mt-5 text-danger mb-5">
                        <h5>No books found.</h5>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BooksList;

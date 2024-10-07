import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { get, ref, update } from 'firebase/database'; 
import db from '../../../firebase';
import 'animate.css'; 

const BookDetailsPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null); 
    const [userId] = useState('user1'); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchData = async () => {
            const dbRef = ref(db, `BooksList/${id}`); 
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                setBook(snapshot.val());
            } else {
                console.log("No such book found!");
            }
        };

        fetchData();
    }, [id]);

    const handleBorrow = async () => {
        const borrowRef = ref(db, `BooksList/${id}/borrowedBy/${userId}`);
        await update(borrowRef, { borrowed: true });
        alert('Book borrowed successfully!');
        navigate(`/BookShow/${id}`); 
    };

    if (!book) {
        return <p className="text-center mt-5 mb-5">Loading...</p>;
    }

    return (
        <div className="container mb-5">
            <h3 className="mt-5 mb-5">Book Details</h3>
           
            <div className="row justify-content-center">
                <div className="col-lg-12 border p-3 shadow-lg rounded animate__animated animate__fadeIn">
                    <img 
                        src={book.imageUrl} 
                        height={500} 
                        className="card-img-top shadow-lg rounded" 
                        alt={book.title} 
                    />
                    <div className="card-body">
                        <h6 className="card-title">{book.title} 
                            <span style={{ color: '#5A639C' }}> Uploaded on: {book.uploadedAt}</span>
                        </h6>
                        <p className="card-text mt-4 mb-3"><b>Author</b>: {book.author}</p>
                        <p className="card-text mt-4 mb-3"><b>Rating</b>: {book.rating} / 5</p>
                        <p className="card-text mt-4 mb-3"><b>Price</b>: ${book.price}</p>
                        <p className="card-text">{book.description}</p>
                    </div>
                    <Link 
                        to={`/edit/${id}`} 
                        className="btn btn-warning text-center py-1 mb-3 mx-auto mt-4 shadow-lg rounded"
                    >
                        Update
                    </Link>

                   
                    <div className="borrow-section mt-4">
                        <h5>Borrow this Book</h5>
                        <button onClick={handleBorrow} className="btn btn-primary mb-3">
                            Borrow
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailsPage;

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get, ref, remove } from 'firebase/database'; 
import db from '../../../firebase';
import 'animate.css'; 

const BookShowPage = () => {
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

    const handleReturn = async () => {
        try {
            const returnRef = ref(db, `BooksList/${id}/borrowedBy/${userId}`);
            await remove(returnRef); 
            alert('Book returned successfully!');
            navigate(`/BookDetails/${id}`);
        } catch (error) {
            console.error("Error returning book: ", error);
            alert('Error returning book. Please try again.');
        }
    };

    if (!book) {
        return <p className="text-center mt-5 mb-5">Loading...</p>;
    }

    return (
        <div className="container mb-5">
            <h3 className="mt-5 mb-5">Showing Book: {book.title}</h3>
           
            <div className="row justify-content-center">
                <div className="col-lg-12 border p-3 shadow-lg rounded animate__animated animate__fadeIn">
                    <img 
                        src={book.imageUrl} 
                        height={500} 
                        className="card-img-top shadow-lg rounded" 
                        alt={book.title} 
                    />
                    <div className="card-body">
                        <h6 className="card-title">{book.title}</h6>
                        <p className="card-text"><b>Author</b>: {book.author}</p>
                        <p className="card-text"><b>Rating</b>: {book.rating} / 5</p>
                        <p className="card-text"><b>Price</b>: ${book.price}</p>
                        <p className="card-text">{book.description}</p>
                    </div>
                    <div className="return-section mt-4">
                        <h5>Return this Book</h5>
                        <button onClick={handleReturn} className="btn btn-danger mb-3">
                            Return
                        </button>
                    </div>
                    <div className="pdf-viewer mt-4">
                        <h5>Animated PDF Book</h5>
                        <iframe src={book.pdfUrl} width="100%" height="600px" title="Book PDF" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookShowPage;

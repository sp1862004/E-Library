import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ref as dbRef, get, ref, set } from 'firebase/database';
import db from '../../../firebase';
import 'animate.css'; 

const UpdateBook = () => {
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const fetchData = async () => {
        try {
            const databaseRef = dbRef(db, `BooksList/${id}`); 
            const snapshot = await get(databaseRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                reset(data);
            } else {
                console.log("No such book found!");
            }
        } catch (error) {
            console.error("Error fetching document: ", error);
        }
    };

    const onSubmit = async (data) => {
        try {
            const bookRef = ref(db, `BooksList/${id}`); 
            await set(bookRef, data);
            alert("Book updated successfully!");
            reset();
            navigate('/'); // Navigate back to the book list or home page
        } catch (error) {
            console.error("Error saving document: ", error);
            alert("Error: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="animate__animated animate__fadeIn">
            <h6 className='mb-4 mt-3 text-center'>Update Book Details</h6>
            <div className="container">
                <div className="row d-flex mx-auto justify-content-center">
                    <div className="col-lg-10 mx-auto mt-3 mb-2">
                        <input type="text" className='form-control shadow py-3 border-primary' {...register('title')} autoFocus placeholder='Book Title' />
                    </div>
                    <div className="col-lg-10 mt-3">
                        <input type="text" className='form-control shadow py-3 border-primary' {...register('author')} placeholder='Author Name' />
                    </div>
                    <div className="col-lg-10 mt-3">
                        <input type="number" className='form-control shadow py-3 border-primary' {...register('rating')} min="0" max="5" placeholder='Rating (0-5)' />
                    </div>
                    <div className="col-lg-10 mt-3">
                        <input type="number" className='form-control shadow py-3 border-primary' {...register('price')} placeholder='Price' />
                    </div>
                    <div className="col-lg-10 mt-3">
                        <label htmlFor="publicationDate" className="form-label" style={{ color: '#365E32' }}>Publication Date</label>
                        <input type="date" className='form-control py-3 shadow border-primary' {...register('publicationDate')} />
                    </div>
                    <div className="col-lg-10 mt-3">
                        <input type="text" className='form-control shadow py-3 border-primary' {...register('imageUrl')} placeholder='Book Cover URL' />
                    </div>
                    <div className="col-lg-10 mt-3">
                        <textarea className="form-control shadow py-3 border-primary" {...register('description')} rows="8" placeholder="Describe the book here..."></textarea>
                    </div>
                </div>
                <button className='btn btn-success text-center mx-auto py-2 mb-3 d-grid mx-auto'>Update Book</button>
            </div>
        </form>
    );
};

export default UpdateBook;

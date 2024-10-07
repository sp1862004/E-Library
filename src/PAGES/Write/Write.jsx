import { push, ref, set } from 'firebase/database';
import { useForm } from 'react-hook-form';
import db from '../../../firebase'; 
import { useNavigate } from 'react-router-dom';
import 'animate.css';
import { useState } from 'react'; 

const Write = () => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const navigate = useNavigate();
    const [isPdfVisible, setIsPdfVisible] = useState(false); 

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue('imageUrl', reader.result); 
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePdfChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue('pdfUrl', reader.result); 
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            uploadedAt: new Date().toLocaleString(), 
        };

        const newDocRef = push(ref(db, "BooksList")); 
        set(newDocRef, formattedData)
            .then(() => {
                alert("Book added successfully");
                reset();
                navigate("/"); 
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="animate__animated animate__fadeIn">
            <h4 className='mb-4 mt-3 text-center'>Add Your Book</h4>
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
                        <label htmlFor="dateInput" className="form-label" style={{ color: '#365E32' }}>Publication Date</label>
                        <input type="date" className='form-control py-3 shadow border-primary' {...register('publicationDate')} />
                    </div>
                    <div className="col-lg-10 mt-3">
                        <label htmlFor="imageInput" className="form-label" style={{ color: '#365E32' }}>Upload Book Cover</label>
                        <input type="file" className='form-control py-3 shadow border-primary' id="imageInput" onChange={handleFileChange} />
                    </div>
                    <div className="col-lg-10 mt-3">
                        <textarea className="form-control shadow py-3 border-primary" {...register('description')} rows="8" placeholder="Describe the book here..."></textarea>
                    </div>

                    {/* New PDF Upload Button */}
                    <div className="col-lg-10 mt-3">
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={() => setIsPdfVisible(!isPdfVisible)} 
                        >
                            {isPdfVisible ? "Hide PDF Upload" : "Add PDF Upload"}
                        </button>
                    </div>

                    {/* PDF Input - Visible only when toggled */}
                    {isPdfVisible && (
                        <div className="col-lg-10 mt-3">
                            <label htmlFor="pdfInput" className="form-label" style={{ color: '#365E32' }}>Upload PDF</label>
                            <input type="file" className='form-control py-3 shadow border-primary' id="pdfInput" accept=".pdf" onChange={handlePdfChange} />
                        </div>
                    )}

                    {/* Hidden field for uploaded date and time */}
                    <input type="hidden" {...register('uploadedAt')} value={new Date().toLocaleString()} />
                </div>
            </div>
            <button className='btn btn-primary text-center mx-auto py-2 mb-3 d-grid mx-auto'>Add Book</button>
        </form>
    );
};

export default Write;

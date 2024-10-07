import React from 'react';
import 'animate.css';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { Card } from 'react-bootstrap'; 

const Row1 = () => {
    const books = [
        {
            id: 1,
            title: 'Bhagvad geeta',
            author: 'Veda Vyasa',
            description: 'The Bhagavad Gita ( Sanskrit: भगवद्गीता )  romanized: bhagavad-gītā, lit.  often referred to as the Gita , is a Hindu scripture dated to the second or first century BCE, which forms part of the Epic Mahabharata.It is a synthesis of Brahmanical(dharma) and non - Brahmanical(yoga, bhakti) traditions; and holds a unique pan - Hindu influence as the most prominent sacred text.',
            image: 'geeta.jpg', 
        },
    {
        id: 2,
        title: 'Ramayana',
        author: 'Valmiki',
        description: 'The Ramayana was an important influence on later Sanskrit poetry and the Hindu life and culture, and its main figures were fundamental to the cultural consciousness of a number of nations, both Hindu and Buddhist. Its most important moral influence was the importance of virtue, in the life of a citizen and in the ideals of the formation of a state (from Sanskrit: रामराज्य, romanized: Rāmarājya, a utopian state where Rama is king) or of a functioning society.',
        image: 'Ramji.jpg',
    },
    {
        id: 3,
        title: 'Rich Dad Poor Dad',
        author: ' Robert T. Kiyosaki ',
        description: 'Rich Dad Poor Dad is written in the style of a set of parables based on Kiyosakis life. The titular "rich dad" is his best friends father who accumulated wealth due to entrepreneurship and savvy investing, while the "poor dad" is claimed to be Kiyosakis own father who he says worked hard all his life but never obtained financial security.',
        image: 'RD.jpg',
    },
    ];

return (
    <div className='container'>
        <h2 className='text-center fs-2 mt-5 upcoming-events animate__animated animate__fadeInUp'>
            Exciting Books
        </h2>

        <Grid container spacing={4} className="mt-4">
            {books.map(book => (
                <Grid item xs={12} sm={6} md={4} key={book.id}>
                    <Card className="animate__animated animate__zoomIn p-3">
                        <Card.Img variant="top" src={book.image} alt={book.title} />
                        <Card.Body>
                            <Typography variant="h6" className="mb-2">
                                {book.title}
                            </Typography>
                            <Typography variant="subtitle2" className="text-muted mb-3">
                                by {book.author}
                            </Typography>
                            <Typography variant="body2" className="mb-3">
                                {book.description}
                            </Typography>
                            <Button variant="primary" className="w-100">
                                Read More
                            </Button>
                        </Card.Body>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </div>
);
};

export default Row1;

import React, { useState } from 'react'

export default function Gallery() {
    const [eventId, setEventId] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleFileChange = (event) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
        }
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        let url = 'https://localhost:7212/api/Gallery';

        const formData = new FormData();

        formData.append('eventId', eventId);
        formData.append('description', description);

        if (image) {
            formData.append('image', image);
        }

        const result = fetch(url, {
            method: 'POST',
            body: formData
        });

        if ((await result).status === 200) {
            alert('success');
            setEventId('');
            setDescription('');
            setImage(null);
        }
        else {
            alert('failed');
        }
    };

    return (
        <div className='gallery'>
            <form onSubmit={handleUpload}>
                Event Id : <input type='text' value={eventId} onChange={(e) => setEventId(e.target.value)} />
                Description : <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
                Image : <input type="file" onChange={handleFileChange} />

                <button type="submit">Upload</button>
            </form>
        </div>
    )
}

import { useState, useEffect } from 'react';
import axios from '../config/axios';
import RichTextEditor from './RichTextEditor';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { postId } = useParams();

    useEffect(() => {
        // Fetch the existing post data
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/posts/${postId}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                // console.log(response);  // Corrected console.log statement
                const { title, content, featuredImage } = response.data;
                setTitle(title);
                setContent(content);
                setFeaturedImage(featuredImage);
            } catch (err) {
                console.error(err);  // Log the error for debugging
                setError('An error occurred while fetching the post data');
            }
        };

        fetchPost();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title) {
            if (content) {
                try {
                    const response = await axios.put(`/api/posts/${postId}`, { title, content, featuredImage }, {
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }
                    });
                    alert('Post Updated');
                    navigate('/list-posts');
                } catch (err) {
                    console.error(err);  // Log the error for debugging
                    setError('An error occurred while updating the post');
                }
            } else {
                setError('Content is required');
            }
        } else {
            setError('Title is required');
        }
    };

    return (
        <div>
            <h2>Edit Post</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input 
                    type="text" 
                    id="title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                /><br/>

                <label htmlFor="content">Content</label>
                <RichTextEditor value={content} onChange={setContent} /><br/>

                <label htmlFor="image">Featured Image</label>
                <input 
                    type="text" 
                    id="featuredImage" 
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                /><br/><br/>

                <button type="submit">Update Post</button>
            </form>
        </div>
    );
}

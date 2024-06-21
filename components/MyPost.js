import { useState, useEffect } from 'react';
import axios from '../config/axios';
import { Link } from 'react-router-dom';

export default function MyPost() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('/api/posts/myposts', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                setPosts(response.data);
            } catch (err) {
                setError('An error occurred while fetching the posts');
            }
        })();
    }, []);

    const handleClick = (id) => {
        
    }

    return (
        <div>
            <h2>My Posts</h2>
            {error && <p>{error}</p>}
            {posts.length > 0 ? (
                <ul>
                    {posts.map(post => (
                        
                        <li key={post._id}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            {post.featuredImage && <img src={post.featuredImage} alt={post.title} />}
                            <button>
                                <Link to={`/edit-post/${post._id}`}>Edit Post</Link>
                            </button>
                            <button onClick={() => {handleClick(post._id)}}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
}

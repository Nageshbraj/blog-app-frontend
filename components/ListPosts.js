import { useState, useEffect } from 'react';
import axios from '../config/axios';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

export default function ListPosts() {
    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/posts', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                setPosts(response.data);
            } catch (err) {
                alert(err);
            }
        };

        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('/api/users/profile', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                setUserId(response.data._id);
            } catch (err) {
                console.error("Error fetching user profile:", err);
            }
        };

        fetchPosts();
        fetchUserProfile();
    }, []);

    const deletePost = async (postId) => {
        try {
            await axios.delete(`/api/posts/${postId}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            setPosts(posts.filter(post => post._id !== postId));
        } catch (err) {
            console.error("Error deleting post:", err);
            alert("Failed to delete the post");
        }
    };

    return (
        <div>
            <h2>Post List</h2>
            {posts.map((post) => (
                <PostItem
                    key={post._id}
                    postId={post._id}
                    post={post}
                    postAuthor={post.author}
                    userId={userId}
                    deletePost={deletePost}
                />
            ))}
        </div>
    );
}

function PostItem({ post, postId, userId, deletePost }) {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/api/posts/${postId}/comments`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            setComments(response.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    return (
        <div>
            <h3>Title: <span dangerouslySetInnerHTML={{ __html: post.title }} /></h3>
            <h3>Content:</h3>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            {post.featuredImage && (
                <img src={post.featuredImage} alt={post.title} />
            )}
            {post.author === userId && (
                <div>
                    <Link to={`/edit-post/${postId}`}>
                        <button>Edit Post</button>
                    </Link>
                    <button onClick={() => deletePost(postId)}>Delete Post</button>
                </div>
            )}
            <CommentForm postId={postId} refreshComments={fetchComments} />
            <CommentList comments={comments} postId={postId} postAuthor={post.author} userId={userId} refreshComments={fetchComments}/>
        </div>
    );
}

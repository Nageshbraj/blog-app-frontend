import { useState } from "react";
import axios from "../config/axios";


export default function CommentList({ comments, postId, userId, postAuthor, refreshComments }) {
    
    const [comment, setComment] = useState(null);
    const [error, setError] = useState('');
    

    const handleEdit = async (commentId) => {
        const content = prompt('Enter new content');
        const commentForm = { content };

        if (content) {
            try {
                const response = await axios.put(`/api/posts/${postId}/comments/${commentId}`, commentForm, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                const res = response.data;
                if (res._id === commentId) {
                    setComment({ ...comment, content: commentForm.content });
                    setError(''); // Clear any previous error
                    refreshComments()
                } else {
                    setError('Failed to update comment');
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    setError(`Failed to update comment: ${error.response.data.error}`);
                } else {
                    setError('An unknown error occurred');
                }
            }
        }
    };

    const handleDelete = async (commentId) => {
        const userConfirm = window.confirm("Are you sure?");
        if (userConfirm) {
            try {
                await axios.delete(`/api/posts/${postId}/comments/${commentId}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                setComment(null); // Remove the comment from the UI upon successful deletion
                setError(''); // Clear any previous delete error
                refreshComments()
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    setError(`Failed to delete comment: ${error.response.data.error}`);
                } else {
                    setError('An unknown error occurred');
                }
            }
        }
    };


    return (
        <div>
            <h4>Comments</h4>
            <ul>
                {comments.map((comment) => {
                    return <li key={comment._id}>{comment.content}
                    { comment.author === userId && (
                        <>
                        <button onClick={() => handleEdit(comment._id)}>Edit</button>
                        <button onClick={() => handleDelete(comment._id)}>Delete</button>
                    </>
                    )}  
                    {postAuthor === userId && comment.author !== userId && (
                        <button onClick={() => handleDelete(comment._id)}>Delete</button>
                    )}
                    </li> 
                })}
            </ul>
        </div>
    );
}


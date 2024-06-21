import { useState } from "react";
import axios from "../config/axios";

export default function CommentForm({ postId, refreshComments }) {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const commentData = { content };
        try {
            await axios.post(`/api/posts/${postId}/comments`, commentData, {
                headers: { Authorization: localStorage.getItem('token') }
            });
            setContent('');
            refreshComments();
        } catch (error) {
            console.log(error);
        }
    };

    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="content"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                /><br/>
                <button type="submit">Comment</button>
            </form>
        </div>
    );
}
import { useState } from 'react'
import axios from '../config/axios'
import RichTextEditor from './RichTextEditor'
import { useNavigate } from 'react-router-dom'


export default function AddPost() {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [featuredImage, setFeaturedImage] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        if(title){
            if(content){
                try {
                    const response = await axios.post('/api/posts', { title, content, featuredImage }, {
                        headers: {
                                Authorization: localStorage.getItem('token')
                            }
                        })
                        console.log(response.data);
                        alert('post Created');
                        setTitle('')
                        setContent('')
                        setFeaturedImage('')

                    } catch (err) {
                        setError('An error occurred while creating the post')
                    }
            } else {
                setError('content is are required')
            }
        } else {
            setError('Title is are required')
        }
    }


    return (
        <div>
            <h2>Create a New Post</h2>
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

                <label htmlFor="image">featuredImage</label>
                <input 
                    type="text" 
                    id="featuredImage" 
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                /><br/><br/>

                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}



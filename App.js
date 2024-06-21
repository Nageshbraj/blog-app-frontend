import { Routes, Route, Link} from 'react-router-dom'
import axios from './config/axios'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Account from './components/Account'
import AddPost from './components/AddPost'
import Listposts from './components/ListPosts'
import MyPost from './components/MyPost'
import EditPost from './components/EditPost'
import { useAuth } from './context/AuthContext'
import { useEffect } from 'react';

function App() {

  const { user, dispatch} = useAuth() 


  useEffect(() => {
    if(localStorage.getItem('token'))  {
      (async () => {
        const response = await axios.get('/api/users/profile', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        
        setTimeout(() => {
          dispatch({ type: 'LOGIN', payload: { account: response.data } })       
        } )
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div >
      <h2>Blog Application</h2>
      <Link to='/'>Home</Link>|

      { !user.isLoggedIn ? (
          <>
          <Link to="/register">Register</Link> |
          <Link to="/login"> Login </Link> | 
          </>
        ) : (
          <>
            <Link to="/account">Account</Link> | 
            <Link to="/list-posts">List Posts</Link> | 
            <Link to="/add-post">Add Post</Link> |
            <Link to="/my-posts">My Posts</Link> |
            <Link to="/" onClick={() => {
              localStorage.removeItem('token')
              dispatch({ type: 'LOGOUT'})
            }}> logout </Link> | 
          </>
        )}


      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/account' element={<Account/>}/>
        <Route path='/add-post' element={<AddPost/>}/>
        <Route path='/list-posts' element={<Listposts/>}/>
        <Route path='/my-posts' element={<MyPost/>}/>
        <Route path='/edit-post/:postId' element={<EditPost/>}/>
      </Routes>
    </div>
  );
}

export default App;

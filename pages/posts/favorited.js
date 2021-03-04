import styles from '../../styles/Ninjas.module.css'
import Link from 'next/link'
import Router from 'next/router'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faHeart, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";

export const getStaticProps = async () => {
    const res = await fetch('https://thawing-wave-48739.herokuapp.com/insta-api/get-all-liked-posts')
    const data = await res.json()

    return {
        props: { posts: data }
    }
}

const triggerRemoveLike = async(post) => {
    console.log(post.post_like_count)
    console.log(post.is_liked)

    var data = new URLSearchParams();
    data.append('userName', 'test@gmail.com');
    data.append('password', 'Password');
    data.append('grant_type', 'password');


    return await fetch('https://thawing-wave-48739.herokuapp.com/insta-api/toggle-like', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            'id': post._id,
            'status': post.is_liked == 1 ? 0 : 1,
            'count': post.post_like_count
          })
    })
        .then(async response => {
            // return JSON.parse(await response.text());
            console.log(await response.text() )
            Router.reload('/posts/favorited');
        })
        .catch(error => {
            console.error('Error:', error);
    });
}

const Favorited = ({ posts }) => {
    return ( 
        <div>
           {posts['messages'].map(post => (
             <Link href='#' key={post._id}>
                 <a className={styles.single}>
                     <h3 styles={{ float: 'left', position: 'relative'}}>{post.post_title} <span style={{float: 'right', marginRight: '10px'}}><FontAwesomeIcon onClick={() => triggerRemoveLike(post)} color={post.is_liked == 0 ? '#bbc0c5' : '#fc619c'} style={{ fontSize: '25px' }} icon={faTrash}></FontAwesomeIcon></span></h3>
                 </a>
             </Link>  
           ))}
        </div>
     );
}
 
export default Favorited;
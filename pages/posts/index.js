import styles from '../../styles/Ninjas.module.css'
import Router from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faHeart, faSearch } from "@fortawesome/free-solid-svg-icons";

export const getStaticProps = async () => {

    const res = await fetch('https://thawing-wave-48739.herokuapp.com/insta-api/get-all-posts')
    const data = await res.json()

    return {
        props: { posts: data }
    }
}

const Post = ({ posts }) => {

    const triggerLike = async(post) => {
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
                Router.reload('/posts');
            })
            .catch(error => {
                console.error('Error:', error);
        });
    }

    return (
        <div style={{ marginBottom: '120px', marginTop: '20px' }}>
            {posts['messages'].map(post => (
                <div key={post._id} className="card" style={{ marginBottom: '20px' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <span><img src={post.post_user_pic} style={{ width: '40px', borderRadius: '50%' }} /></span>
                        <span style={{ paddingTop: '9px', paddingLeft: '9px', position: 'absolute', fontWeight: '700' }}>{post.post_user}</span>
                    </div>
                    <img src={post.post_image} alt="Avatar" style={{ width: '100%' }} />
                    <div style={{ color: 'white', float: 'left', marginTop: '-50px', position: 'absolute', marginLeft: '20px', fontSize: '18px', fontWeight: '700' }}>{post.post_title}</div>
                    <div style={{ float: 'right', marginTop: '-50px', position: 'relative', marginRight: '20px' }}>
                        {/* <img width={28} style={{ color: '#bbc0c5' }} src="/favorite-white-18dp.svg" /> */}
                        <FontAwesomeIcon onClick={() => triggerLike(post)} color={post.is_liked == 0 ? '#bbc0c5' : '#fc619c'} style={{ fontSize: '25px' }} icon={faHeart}></FontAwesomeIcon>
                    </div>
                    <div style={{ marginTop: '5px', paddingLeft: '5px' }}>
                        <span><img width={20} style={{ color: 'white' }} src="/favorite-black-18dp.svg" /></span>
                        <span style={{ paddingTop: '0px', paddingLeft: '9px', position: 'absolute', fontWeight: '700' }}>{post.post_like_count} Likes</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Post;
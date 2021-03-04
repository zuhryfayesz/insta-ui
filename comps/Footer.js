import Link from 'next/link'
const Footer = () => {
    return (
        <footer>
            <div className="navbar grid">
            <Link href="/posts"><a className="active"><img width={35} style={{color: 'white'}} src="/home-white-18dp.svg"/></a></Link>
            <Link href="/posts/favorited"><a><img width={35} style={{color: 'white'}} src="/favorite-white-18dp.svg"/></a></Link>
                {/* <a href="#home" className="active"><img width={35} style={{color: 'white'}} src="/home-white-18dp.svg"/></a> */}
                {/* <a href="#liked" className="active"><img width={35} style={{color: 'white'}} src="/favorite-white-18dp.svg"/></a> */}
            </div>
        </footer>
    );
}

export default Footer;
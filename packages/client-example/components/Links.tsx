import Link from 'next/link';

export function Links(){

    return (
        <div style={{display:'flex',gap:'1rem'}}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/products">Products</Link>
        </div>
    )

}

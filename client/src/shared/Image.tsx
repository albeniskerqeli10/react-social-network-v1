import { Suspense } from "react"

type ImageProps = {
    src: string,
    alt: string
}

const Image = ({ src, alt}:ImageProps) => {
    return (

        <img src={src} alt={alt} loading="lazy" width="600"             className="object-cover  my-3 max-w-full max-h-full w-full	drop-shadow-md rounded-sm "
        />
    )

}

export default Image;
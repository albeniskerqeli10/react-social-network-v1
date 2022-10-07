interface AvatarProps {
  src: string;
  alt: string;
  radius?: string;
  loading?: "lazy" | "eager" | "auto";
  onClick?: () => void;
}
const Avatar = ({ src, alt, loading, onClick, radius }: AvatarProps) => {



  return (
    <img
      width="40"
      height="40"

      decoding="async"
      className={` cursor-pointer aspect-square  rounded-${radius || "full"
        } max-w-full h-full object-cover drop-shadow-md mx-2 my-1`
      }
      alt={`User Avatar`}
      onClick={onClick}
      src={`${src} `}
    />
  )
}


export default Avatar;

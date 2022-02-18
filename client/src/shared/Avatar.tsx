interface AvatarProps {
  src: string;
  alt: string;
  radius?: string;
  onClick?: () => void;
}
const Avatar = ({ src, alt, onClick, radius }: AvatarProps) => {
  return (
    <img
      width="40"
      height="40"
      className={`cursor-pointer w-10 h-10 rounded-${
        radius || "full"
      } max-w-full object-cover drop-shadow-md mx-2 my-1`}
      alt={`User Avatar | alt`}
      onClick={onClick}
      src={`${src}`}
    />
  );
};

export default Avatar;

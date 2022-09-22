interface AvatarProps {
  src: string;
  alt: string;
  radius?: string;
  loading?:"lazy"| "eager";
  onClick?: () => void;
}
const Avatar = ({ src, alt, loading,onClick, radius }: AvatarProps) => {
  return (
    <img
    loading={loading}
      width="40"
      height="40"
      className={`cursor-pointer w-10 h-10 rounded-${
        radius || "full"
      } max-w-full max-h-full object-cover drop-shadow-md mx-2 my-1`}
      alt={`User Avatar`}
      onClick={onClick}
      src={`${src}`}
    />
  );
};

export default Avatar;

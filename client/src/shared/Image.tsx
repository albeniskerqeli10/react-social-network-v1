import SmallSpinner from "./SmallSpinner";
import SuspenseWrapper from "./SuspenseWrapper";

type ImageProps = {
  src: string;
  alt: string;
};

const Image = ({ src, alt }: ImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      width="500"
      className="object-cover bg-black  my-3 w-[500px] max-w-full  h-auto"
    />
  );
};

export default Image;

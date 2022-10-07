type ImageProps = {
  src: string;
  alt: string;
};




const Image = ({ src, alt }: ImageProps) => {
  return (
    <>
      <img src={src} width="480" height="640" className="aspect-auto px-2 max-w-full max-h-full object-center  object-cover" decoding="async" />

    </>


  );
};

export default Image;

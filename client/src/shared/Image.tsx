type ImageProps = {
  src: string;
  alt: string;
};




const Image = ({ src, alt }: ImageProps) => {
  return (
    <>
      <img src={src} width="480" height="640" className="aspect-auto px-2 max-w-full h-[350px] object-center  object-cover" decoding="async" />

    </>


  );
};

export default Image;

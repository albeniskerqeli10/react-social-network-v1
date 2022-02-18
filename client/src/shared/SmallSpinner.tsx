import { AiOutlineLoading3Quarters } from "@react-icons/all-files/ai/AiOutlineLoading3Quarters";

const SmallSpinner = () => {
  return (
    <div className="w-auto z-10 flex flex-row items-center justify-center flex-wrap">
      <AiOutlineLoading3Quarters
        color="#2B6BED"
        className="animate-spin"
        size={50}
      />
    </div>
  );
};

export default SmallSpinner;

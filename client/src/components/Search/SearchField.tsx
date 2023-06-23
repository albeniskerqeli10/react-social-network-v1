interface SearchFieldProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const SearchField = ({ onChange, value }: SearchFieldProps) => {
  return (
    <input
      type="text"
      onChange={onChange}
      value={value}
      placeholder="Search.."
      className="lg:w-[200px]   w-[50%] mx-2 min-h-[40px] px-1 text-lg  bg-transparent text-gray-700 placeholder-gray-600 focus:outline-none"
    />
  );
};

export default SearchField;

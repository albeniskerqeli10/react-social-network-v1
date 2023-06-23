import { ChangeEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../types/UserInterfaces";
import { searchUsers } from "../../api/UserApi";
import { updateUsersList } from "../../redux/slices/userSlice";
import SearchField from "./SearchField";
interface SearchProps {
  data: IUser[];
}
const Search = () => {
  const [query, setQuery] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const singleQueryKey = "SINGLE USER KEY";

  const { refetch } = useQuery([singleQueryKey, query], searchUsers, {
    enabled: false,
    onSuccess: ({ data }: SearchProps) => {
      dispatch(updateUsersList(data));
    },
    onError: ({ err }) => { },
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query !== "") {
      refetch();
      navigate(`/search/${query}`);
    } else {
      navigate("/");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <SearchField value={query} onChange={handleChange} />
    </form>
  );
};

export default Search;

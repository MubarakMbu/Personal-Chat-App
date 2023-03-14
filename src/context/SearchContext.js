import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [searchValue, setsearchValue] = useState("");
  const getAndSetSearchValue = (value)=>{
    setsearchValue(value)
  }
  return (
    <SearchContext.Provider value={{ searchValue, getAndSetSearchValue}}>
      {children}
    </SearchContext.Provider>
  );
};
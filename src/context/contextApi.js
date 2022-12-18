
import React,{createContext, useState, useEffect} from 'react';
import {fetchDataFromAPI} from '../utils/api';

export const Context = createContext();

export const AppContext = (props) => {

    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState(false);
    const [selectCategories, setSelectCategories] = useState('New');
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(()=>{
        fetchSelectedCtegoryData(selectCategories)

    },[selectCategories])

    const fetchSelectedCtegoryData = (query) => {
        setLoading(true)
        fetchDataFromAPI(`search/?q=${query}`).then(({contents})=>{
            console.log("API response",contents)
            setSearchResults(contents)
            setLoading(false)
        })
    }

  return (
      <Context.Provider value={{
          loading,
          setLoading,
          searchResults,
          setSearchResults,
          selectCategories,
          setSelectCategories,
          mobileMenu,
          setMobileMenu
      }}>
          {props.children}
      </Context.Provider>
  )
}

// export default AppContext
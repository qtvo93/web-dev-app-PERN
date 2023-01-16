import React, { Fragment, useState, useEffect } from "react";
import * as MdIcons from "react-icons/md";

const SearchBar = ({searchQuery, setSearchQuery}) => {

    return (
    <Fragment>
      <div className="d-flex mt-5 justify-content-around" style={{fontFamily: 'Source Sans Pro', display: 'inline'}}>
      
      <h4 style={{position: 'relative'}}> <MdIcons.MdSearch size={20}/> Search Todo: </h4>
      <input className="d-flex form-control"
       style={{position: 'relative', width: '350px'}}
       key="search-bar"
       value={searchQuery}
       placeholder={"Search"}
       onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="btn btn-primary" onClick={()=>setSearchQuery("")}>Clear Search</button>
      </div>
    </Fragment>
    );
  }
  
  export default SearchBar;
import React from 'react';
import './styles.scss';

const SearchBar = ({searchKeyword, title}) => {
    const updateKeyword = (keyCode, val) => {
        if(keyCode === 13 && val.length > 0) {
            searchKeyword({key: val});
        }
    };

    return (
        <div className="search-bar d-flex">
            <h2>{title}</h2>
            <input type="text" placeholder="Search..." id="keyword" onKeyUp={(e) => updateKeyword(e.keyCode, e.target.value)} />
        </div>
    );
}

export default SearchBar;
import React from 'react';
import './styles.scss';

const SearchBar = ({searchKeyword, title}) => {
    /* Search callback is called only when use presses Enter, then the rest
    of the keyword is fetched from the target. If the user presses Enter before
    pressing any other key, the call is not made */
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
import React from "react";
import PropTypes from 'prop-types';

import style from "./SearchBar.module.css";

const SearchBar = ({ handleMakeRequest }) => (
    <header className={style.searchBar}>
        <form className={style.searchForm} onSubmit={handleMakeRequest}>
            
            <input className={style.searchFormInput}
                class="input"
                type="text"
                autocomplete="off"
                autofocus
                placeholder="Search images and photos"
                name="searchValue"
            />

            <button type="submit" className={style.searchFormButton}>
                <span className={style.searchFormButtonLabel}>Search</span>
            </button>
            
        </form>
    </header>
);

SearchBar.propTypes = {
handleMakeRequest: PropTypes.func.isRequired,
};

export default SearchBar;
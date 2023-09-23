import PropTypes from 'prop-types';

import style from './Button.module.css';

const Button = ({ handleMoreImage }) => {
    return (
        <button type="button" className={style.button} onClick={() => handleMoreImage()}>
            Load more
        </button>
    );
};

export default Button;

Button.propTypes = {
    handleMoreImage: PropTypes.func.isRequired,
};
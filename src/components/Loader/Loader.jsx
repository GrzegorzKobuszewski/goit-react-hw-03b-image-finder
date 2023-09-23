import { Grid }  from 'react-loader-spinner';

import style from "./Loader.module.css";

const Loader = () => {
    return (
        <div className={style.overlay}>
            <Grid
                height="100"
                width="100"
                color="#005500"
                ariaLabel="grid-loading"
                radius="12"
                wrapperStyle={{}}
                className={style.loader}
                visible={true}
                text="Loading content..."
            />
        </div>
    );
};

export default Loader;
import React from "react";
import PropTypes from "prop-types";

const PageHeader = props => {
    return (
        <div className="page-header">
            <h2 className="page-header__title page-header__title--center">
                {props.children}
            </h2>
        </div>
    )
};

PageHeader.propTypes = {
    children: PropTypes.any.isRequired
};

export default PageHeader;
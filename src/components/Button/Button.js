import React from "react";
import PropTypes from "prop-types";

import "./Button.scss";

const Button = props => {
    const onClick = (props.onClick) ? () => props.onClick() : null;

    return (
        <button className="button" onClick={onClick}>
            {props.children}
        </button>
    )
};

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.any.isRequired
};

export default Button;
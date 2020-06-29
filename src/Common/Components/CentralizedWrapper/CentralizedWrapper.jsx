import React from "react";
import PropTypes from "prop-types";
import "./CentralizedWrapper.scss";

const WrapperTypes = { AbsoluteFill: "AbsoluteFill" };

const CentralizedWrapper = ({ wrapperType, children, height }) => {

  const wraperStyle = {};
  if (height !== null) {
    wraperStyle.maxHeight = `${height}px`;
    wraperStyle.height = "100%";
  }

  return (
    <div className={`CentralizedWrapper CentralizedWrapper-${wrapperType}`}>
      <div className="CentralizedWrapper_Child" style={wraperStyle}>
        {children}
      </div>
    </div>
  );
};

CentralizedWrapper.propTypes = {
  wrapperType: PropTypes.oneOf(Object.keys(WrapperTypes)),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  height: PropTypes.number,
};

CentralizedWrapper.defaultProps = {
  wrapperType: WrapperTypes.AbsoluteFill,
  height: null,
};

export default CentralizedWrapper;
export { WrapperTypes };

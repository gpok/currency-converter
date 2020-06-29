import React, { useState } from "react";
import "./SidePanelContainer.scss";
import PropTypes from "prop-types";

const SidePanelContainer = ({ children, sidePanel, sideHeader }) => {
  const [opened, setOpened] = useState(false);

  const SidePanelStyle = {};
  if (opened) SidePanelStyle.width = "340px";

  return (
    <div className="SidePanelContainer">
      <div className="SidePanelContainer_Content">
        <div className="SidePanelContainer_Content_Main">{children}</div>
        <div className="SidePanelContainer_Content_Side" style={SidePanelStyle}>
          <div style={{ width: "300px" }}>
            {typeof sidePanel === "function"
              ? sidePanel({ opened })
              : sidePanel}
          </div>
        </div>
      </div>
      <button
        type="button"
        className={`SidePanelContainer_Button${
          opened ? " SidePanelContainer_Button-Opened" : ""
        }`}
        onClick={() => {
          setOpened(!opened);
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <p>&#x274C;</p>
        {sideHeader}
      </button>
    </div>
  );
};

SidePanelContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  sidePanel: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
  sideHeader: PropTypes.string,
};

SidePanelContainer.defaultProps = {
  sidePanel: "",
  sideHeader: "SIDE",
};

export default SidePanelContainer;

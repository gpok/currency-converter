import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./CustomSelect.scss";

const CustomSelect = ({ input, options }) => {
  const selectElement = useRef(null);
  const selectElementList = useRef(null);
  const [isListShown, setListShawn] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function scrollToValue(value) {
    if (!selectElementList.current) return;
    const elementToScrollTo = selectElementList.current.querySelector(
      `[data-value^="${value}"]`
    );
    if (elementToScrollTo) {
      selectElementList.current.scrollTop = elementToScrollTo.offsetTop;
      input.onChange(elementToScrollTo.dataset.value);
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleClickOutside(e) {
    if (selectElement && !selectElement.current.contains(e.target)) {
      setListShawn(false);
      input.onBlur();
    }
  }
  function handleClickSelect(e) {
    if (!isListShown) setListShawn(!isListShown);
    if (!selectElementList.current) return;

    let keyToFind = null;
    if (e.keyCode === 38) {
      const index = options.findIndex((obj) => obj.value === input.value);
      if (index > 0) {
        keyToFind = options[index - 1].value;
      }
    } else if (e.keyCode === 40) {
      const index = options.findIndex((obj) => obj.value === input.value);
      if (index < options.length - 1) {
        keyToFind = options[index + 1].value;
      }
    } else if (e.key && e.key.length === 1 && e.key.match(/[a-z]/i)) {
      keyToFind = e.key.toUpperCase();
    }
    if (keyToFind !== null) scrollToValue(keyToFind);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
  useEffect(() => {
    if (isListShown) {
      scrollToValue(input.value);
    }
  }, [isListShown, scrollToValue, input.value]);

  return (
    <div
      className="CustomSelect"
      ref={selectElement}
      role="button"
      tabIndex={0}
      onMouseDown={() => {
        console.log("down");
        console.log(options);
        setListShawn(!isListShown);
      }}
      onFocus={(e) => {
        setListShawn(true);
        input.onFocus(e);
      }}
      onBlur={(e) => {
        setListShawn(false);
        input.onBlur(e);
      }}
      onKeyDown={handleClickSelect}
    >
      <div
        className={`CustomSelect_Header${
          isListShown ? " CustomSelect_Header-Opened" : ""
        }`}
      >
        {input.value}
      </div>
      {isListShown && (
        <ul
          className={`CustomSelect_List${
            isListShown ? " CustomSelect_Header-Opened" : ""
          }`}
          ref={selectElementList}
        >
          {options.map(({ value, label }) => (
            <li
              className={`CustomSelect_List_Element${
                input.value === value
                  ? " CustomSelect_List_Element-Selected"
                  : ""
              }`}
              data-value={value}
              key={value}
              onMouseDown={() => {
                input.onChange(value);
                setListShawn(false);
              }}
              aria-selected={input.value === value}
              role="option"
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
  ).isRequired,
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  }).isRequired,
};

CustomSelect.defaultProps = {};

export default CustomSelect;

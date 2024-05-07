import React, { useEffect, useState } from "react";

const CheckBox = ({
  checkedIcon = "check_box",
  uncheckedIcon = "check_box_outline_blank",

  defaultState = true,
  setDefaultState = null,

  forcedValue = null,
  lockOnForced = true,
  color = "#fff",
  lockedColor = "rgba(255,255,255,0.3)",

  onClick = () => {},
  style,
  ...content
}) => {
  const [isCheck, setIsCheck] = useState(defaultState);
  const [checkBoxIcon, setCheckBoxIcon] = useState(
    defaultState ? checkedIcon : uncheckedIcon
  );

  const styleCheckBox = {
    userSelect: "none",
    ...style,
  };

  useEffect(() => {
    if (setDefaultState !== null) {
      setCheckBoxIcon(defaultState ? checkedIcon : uncheckedIcon);
    } else {
      setCheckBoxIcon(isCheck ? checkedIcon : uncheckedIcon);
    }
  }, [defaultState, isCheck, checkedIcon, uncheckedIcon, setDefaultState]);

  const toggleChecked = () => {
    if (setDefaultState !== null) {
      setDefaultState(!defaultState);
    } else {
      setIsCheck(!isCheck);
    }
    onClick();
  };

  return (
    <div style={styleCheckBox} {...content}>
      <span
        className="material-symbols-outlined"
        onClick={
          lockOnForced && forcedValue !== null ? () => {} : toggleChecked
        }
        style={{
          cursor: "pointer",
          color: lockOnForced && forcedValue !== null ? lockedColor : color,
        }}
      >
        {forcedValue === null
          ? checkBoxIcon
          : forcedValue
          ? checkedIcon
          : uncheckedIcon}
      </span>
    </div>
  );
};

export default CheckBox;

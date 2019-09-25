import React, { useState } from "react";

const style = {
  color: "white"
};
const activeStyle = {
  color: "#7fff7f"
};
const SideBar = props => {
  return (
    <>
      <table className="sidebar">
        <tbody>
          <tr>
            <td valign="top">
              <table>
                <tbody>
                  {props.links.map(item => {
                    return (
                      <tr
                        onClick={() => {
                          props.action(item);
                        }}
                        key={item.name}
                      >
                        <td
                          style={
                            props.activeIndex === item.index
                              ? activeStyle
                              : style
                          }
                        >
                          {item.icon}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      {props.children}
    </>
  );
};

export default SideBar;

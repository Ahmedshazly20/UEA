import React, { useState } from "react";
import "./TabView.css";

function TabView({ tabs = {} }:{tabs:any}) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const activateTab = (index:any) => {
   
    setActiveTabIndex(index);
  };
console.log("tabs",tabs[activeTabIndex].content)
  return (
    <div className="TabView">
      <div className="body">
        {Object.keys(tabs).length === 0 ? (
          <div>No Tabs</div>
        ) : (
          <div>
            <div className="tabs">
              {tabs.map((tab:any, index:any) => (
                <label
                  key={index}
                  className={index === activeTabIndex ? "active-tab" : "tab"}
                  onClick={() => activateTab(index)}
                >
                  {tab.name}
                </label>
              ))}
            </div>
            <div className="content">{tabs[activeTabIndex].content}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TabView;
import React from "react";
import "./App.css";
import CentralizedWrapper from "../Common/Components/CentralizedWrapper/CentralizedWrapper";
import Alert from "./Alert/Alert";
import SidePanelContainer from "../Common/Components/SidePanelContainer/SidePanelContainer";
import Converter from "./Converter/Converter";
import ConversionHistory from "./ConversionHistory/ConversionHistory";

const App = () => {
  return (
    <>
      <CentralizedWrapper>
        <SidePanelContainer
          sideHeader="Historia"
          sidePanel={({ opened }) => (
            <ConversionHistory disableButtons={!opened} />
          )}
        >
          <Converter />
        </SidePanelContainer>
      </CentralizedWrapper>
      <Alert />
    </>
  );
};

export default App;

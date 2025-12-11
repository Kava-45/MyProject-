import React from "react";
import { Routes, Route } from "react-router-dom";
import Main_pages from "./main_pages";
import Profile from "./pages/profile";
import Basket from "./pages/basket";
import Cards_1 from "./cards/cards_1";
import Cards_2 from "./cards/cards_2";
import Cards_3 from "./cards/cards_3";
import Cards_4 from "./cards/cards_4";
import Cards_5 from "./cards/cards_5";
import Cards_6 from "./cards/cards_6";
import Cards_7 from "./cards/cards_7";
import Cards_8 from "./cards/cards_8";
import Cards_9 from "./cards/cards_9";
import Cards_10 from "./cards/cards_10";
import Cards_11 from "./cards/cards_11";
import Cards_12 from "./cards/cards_12";
import Cards_13 from "./cards/cards_13";
import Cards_14 from "./cards/cards_14";
import Cards_15 from "./cards/cards_15";
import Cards_16 from "./cards/cards_16";
import Cards_17 from "./cards/cards_17";
import Cards_18 from "./cards/cards_18";
import Cards_19 from "./cards/cards_19";
import Cards_20 from "./cards/cards_20";
import Cards_21 from "./cards/cards_21";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main_pages />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/basket" element={<Basket />} />
      <Route path="/cards_1" element={<Cards_1 />} />
      <Route path="/cards_2" element={<Cards_2 />} />
      <Route path="/cards_3" element={<Cards_3 />} />
      <Route path="/cards_4" element={<Cards_4 />} />
      <Route path="/cards_5" element={<Cards_5 />} />
      <Route path="/cards_6" element={<Cards_6 />} />
      <Route path="/cards_7" element={<Cards_7 />} />
      <Route path="/cards_8" element={<Cards_8 />} />
      <Route path="/cards_9" element={<Cards_9 />} />
      <Route path="/cards_10" element={<Cards_10 />} />
      <Route path="/cards_11" element={<Cards_11 />} />
      <Route path="/cards_12" element={<Cards_12 />} />
      <Route path="/cards_13" element={<Cards_13 />} />
      <Route path="/cards_14" element={<Cards_14 />} />
      <Route path="/cards_15" element={<Cards_15 />} />
      <Route path="/cards_16" element={<Cards_16 />} />
      <Route path="/cards_17" element={<Cards_17 />} />
      <Route path="/cards_18" element={<Cards_18 />} />
      <Route path="/cards_19" element={<Cards_19 />} />
      <Route path="/cards_20" element={<Cards_20 />} />
      <Route path="/cards_21" element={<Cards_21 />} />
    </Routes>
  );
};

export default App;

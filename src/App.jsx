import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Add from "./components/add-folder-or-list/add-folder-or-list";
import Inbox from "./components/inbox/inbox";
import './App.css'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="add" element={<Add />} />
          <Route path="inbox" element={<Inbox />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
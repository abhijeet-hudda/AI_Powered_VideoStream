import React, { useState,useEffect} from "react";
import { Outlet } from "react-router-dom";
import Header from "./componets/Header/Header";
import Sidebar from "./componets/Header/Sidebar";
import { socket } from "./socket/socket.js";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";


function Layout() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  //const queryClient = useQueryClient();

  //get logged-in user from redux
  const user = useSelector((state) => state.auth.user);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  //Join socket room when user is available
  useEffect(() => {
    if (user?._id) {
      socket.emit("join", user._id);
    }
  }, [user]);

  //Listen for notifications
  useEffect(() => {
    socket.on("notification", (data) => {
      console.log("New notification:", data);

      // toast popup
      toast.success(data.message);

      // refresh notifications list / unread count
      // queryClient.invalidateQueries(["notifications"]);
    });
     return () => {
      socket.off("notification");
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 pt-14">
        <Sidebar isOpen={isSidebarOpen} />
        <main
          className={`flex-1 bg-gray-100 overflow-y-auto transition-all duration-200 ${
            isSidebarOpen ? "ml-64" : "ml-20"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
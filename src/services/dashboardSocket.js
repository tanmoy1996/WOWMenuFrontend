import io from "socket.io-client";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const socket = io.connect("https://wowmenubackend.onrender.com/");
export default function DashboardSocket() {
  const restaurantId = useSelector((state) => state.restaurant.details.id);
  const [newOrder, setNewOrder] = useState(null);

  useEffect(() => {
    const listener = (order) => {
      setNewOrder(order);
    };
    socket.on(`${restaurantId}`, listener);

    return () => socket.off(`${restaurantId}`, listener);
  }, [`${restaurantId}`]);
  return { newOrder };
}

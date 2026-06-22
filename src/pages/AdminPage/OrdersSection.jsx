import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../store/cartSlice";
import OrderDetailsCard from "../../components/OrderDetailsCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSocket } from "../../AppContext/SocketContext"

const OrdersSection = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.cart.adminOrders);
  const loading = useSelector((state) => state.cart.loading);

  const socket = useSocket();
  // console.log(allOrders);

  const currentPage = useSelector((state) => state.cart.page);
  const totalPages = useSelector((state) => state.cart.totalPages);

  // Listen to socket when new order is placed 
  useEffect(() => {
    if (!socket) return;
    const handleNewOrder = () => dispatch(getOrders(1));
    socket.emit("orderupdates");

    socket.on("new-order", handleNewOrder);

    return () => {
      socket.off("new-order", handleNewOrder);
      socket.emit("leave-orderupdates");
    };
  }, [socket, dispatch]);


  // Fetch orders when component mounts
  useEffect(() => {
    if (!loading && allOrders.length === 0) {
      dispatch(getOrders(currentPage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function fetchMoreOrders() {
    if (currentPage < totalPages) {
      dispatch(getOrders(currentPage + 1));
    }
  }

  return (
    <>
      <div className="admin_order_details_main">
        {allOrders?.length === 0 ? (
          <div>No orders so far</div>
        ) : (
          <InfiniteScroll
            dataLength={allOrders?.length}
            next={fetchMoreOrders}
            hasMore={currentPage < totalPages}
            loader={<h4>Loading...</h4>}
            style={{ overflowY: "hidden" }}
          >
            {allOrders?.map((order) => (
              <>
                <OrderDetailsCard key={order._id} order={order} />
              </>
            ))}
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};

export default OrdersSection;

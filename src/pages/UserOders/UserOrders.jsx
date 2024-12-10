import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getordersCurrentUser } from "../../store/cartSlice";
import UserOrderCard from "../../components/UserOrderCard";
import InfiniteScroll from "react-infinite-scroll-component";

function UserOrders() {
  const { userid } = useParams();
  // console.log(userid);
  const dispatch = useDispatch();

  const allOrders = useSelector((state) => state.cart.orders);

  // console.log(allOrders);
  const currentPage = useSelector((state) => state.cart.userpage);
  const totalPages = useSelector((state) => state.cart.usertotalPages);
  const totalOrderItems = useSelector(
    (state) => state.cart.usertotalOrderItems
  );

  useEffect(() => {
    dispatch(getordersCurrentUser({ userid, currentPage }));
  }, [dispatch]);

  function fetchMoreOrders() {
    if (currentPage < totalPages) {
      dispatch(getordersCurrentUser({ userid, currentPage: currentPage + 1 }));
    }
  }

  return (
    <>
      <Container>
        <div className="user_orders_main"></div>
        <InfiniteScroll
          dataLength={allOrders.length}
          next={fetchMoreOrders}
          hasMore={currentPage < totalPages}
          loader={<h4>Loading...</h4>}
          style={{ overflowY: "hidden" }}
        >
          {allOrders.length > 0 ? (
            <div>
              <p className="order_page_title">Your Order history</p>
              {allOrders.map((order) => (
                <UserOrderCard key={order._id} order={order} />
              ))}
            </div>
          ) : (
            <div className="no_order">You haven't placed any order yet</div>
          )}
        </InfiniteScroll>
      </Container>
    </>
  );
}

export default UserOrders;

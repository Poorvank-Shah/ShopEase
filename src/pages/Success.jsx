import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/cartRedux";
import { userRequest } from "../requestMethods";

const Success = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
    const data = location.state.stripeData;
    // const cart = location.state?.products;
    const cart = useSelector((state) => state.cart)
    const currentUser = useSelector((state) => state.user.currentUser);
    const [orderId, setOrderId] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        const createOrder = async () => {
            try {
                const res = await userRequest.post("/orders", {
                    userId: currentUser._id,
                    products: cart.products.map((item) => ({
                        productId: item._id,
                        quantity: item.quantity,
                    })),
                    amount: cart.total,
                    address: data.shipping.address,
                    status: "pending"
                });
                setOrderId(res.data._id);
                dispatch(clearCart());                
                
//                 setTimeout(() => {
//                     navigate("/");
//                 }, 3000)
            } catch { }
        }
        data && createOrder();
    }, []);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {orderId
                ? 
                `Order has been created successfully. 
                 Your order number is ${orderId}`    
                : `Successfull. Your order is being prepared...`}
            <Link to="/">
                <button onclick={() => navigate('/')} style={{ padding: 10, marginTop: 20 }}>Going to Homepage in 3sec...</button>
            </Link>
        </div>
    );
};

export default Success;

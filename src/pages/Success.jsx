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
            const TOKEN = localStorage.getItem("persist:root") === null ? null : 
            JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser === null ? null : 
            JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken
            try {
                const res = await axios.create({
                    baseURL: "https://store-api-6cny.onrender.com/",
                    headers: { token: `Bearer ${TOKEN}` },
                }).post("/orders", {
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
            } catch { }
        }
        data && createOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                flexWrap: "wrap",
                fontWeight: "400",
                padding: "20px",
                textAlign: "center"
            }}
        >
            {orderId
                ? 
                `Order has been created successfully. 
                 Your order number is ${orderId}`    
                : `Successfull. Your order is being prepared...`}
            <Link to="/">
                <button onClick={() => navigate('/')} style={{
                    padding: 10, marginTop: 20, fontSize: "15px", fontWeight: "bold", cursor: "pointer"}}>Click to Redirect to Homepage</button>
            </Link>
        </div>
    );
};

export default Success;

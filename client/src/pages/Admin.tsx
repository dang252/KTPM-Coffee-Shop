import { useEffect } from "react";
import OrderNav from "../components/OrderNav";
import HomeFooter from "../components/HomeFooter";

const Admin = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "The Coffee House | Admin";
    }, []);

    return (
        <div>
            <OrderNav />
            <form>

            </form>
            <HomeFooter />
        </div>
    )
}

export default Admin
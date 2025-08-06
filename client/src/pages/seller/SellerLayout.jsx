import toast from "react-hot-toast";
import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const SellerLayout = () => {
  const { axios, navigate } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Order", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async() => {
    try {
      const {data} = await axios.get('/api/seller/logout')
      if(data.success){
        toast.success(data.message)
        navigate('/')
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      
    }
  };
 
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-8 border-b border-gray-200 py-3 bg-white shadow-sm">
        <Link to="/">
          <img src={assets.logo} alt="logo" className="cursor-pointer w-28 md:w-36" />
        </Link>
        <div className="flex items-center gap-4 text-gray-700">
          <p className="hidden sm:block">Hi! Admin</p>
          <button
            onClick={logout}
            className="border border-gray-300 hover:border-red-400 hover:text-red-500 rounded-full text-sm px-4 py-1 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="md:w-64 w-20 bg-white border-r border-gray-200 overflow-y-auto py-4">
          <nav className="flex flex-col gap-2">
            {sidebarLinks.map((item) => (
              <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 transition-all ${
                  isActive
                    ? "bg-primary/10 border-l-4 border-r-md:border-r-[60px] border-primary text-primary"
                    : "hover:bg-gray-100/90 border-white"
                }`
              }
            >
              <img src={item.icon} alt={item.name} className="w-6 h-6" />
              <span className="hidden md:block">{item.name}</span>
            </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;

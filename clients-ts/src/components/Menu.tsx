import axios from "axios";
import { useEffect, useState } from "react";
import './style/Menu.css';
import MenuSkeleton from "./MenuSkeleton";

// Interface Menuitem
interface Menuitem {
  _id: string;
  name: string;
  image: string;
  price: number;
}

interface MenuProps {
  handleAddToCart: (menu: Menuitem) => void;
}

const Menu: React.FC<MenuProps> = ({ handleAddToCart }) => {
  const [menus, setMenus] = useState<Menuitem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Menuitem[]>("https://ngopibro.vercel.app/api/menu")
      .then((response) => {
        setMenus(response.data);
        setLoading(false); // Setelah data diterima, loading dihentikan
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Jika terjadi error, juga hentikan loading
      });
  }, []); // Kosongkan dependency array agar hanya dijalankan sekali saat komponen dimuat

  if (loading) {
    return <MenuSkeleton />;
  }

  return (
    <>
      <div id="menu" className="mt-28">
        <h1 className="mt-10 text-center font-bold text-2xl text-orange-500 uppercase underline-animation">Our Menu</h1>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-3 gap-4 p-4">
        {menus.map((menu) => (
          <div className="card w-80 mx-auto bg-base-100 shadow-xl hover:shadow-amber-300" key={menu._id}>
            <figure className="px-10 pt-10">
              <img src={menu.image} alt={menu.name} className="rounded-xl hover:scale-110 duration-200" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{menu.name}</h2>
              <p>IDR {menu.price}</p>
              <div className="card-actions">
                <button className="btn btn-primary" onClick={() => handleAddToCart(menu)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Menu;

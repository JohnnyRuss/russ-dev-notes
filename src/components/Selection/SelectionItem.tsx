import { Link } from "react-router-dom";
import { PATHS } from "@/config/paths";

type SelectionItemT = {
  logo: string;
  title: string;
  query: string;
};

const SelectionItem: React.FC<SelectionItemT> = ({ title, logo, query }) => {
  return (
    <Link
      to={`${PATHS.blog_page}?category=${query}`}
      className="size-[220px] bg-app-dark-primary text-white p-10 rounded-lg shadow-2xl"
    >
      <figure className="w-full h-full flex flex-col justify-center items-center gap-7">
        <div className="size-[80%] min-h-[80%] flex items-center justify-center">
          <img src={logo} alt="" className="w-full h-full object-contain" />
        </div>
        <figcaption className="text-xl font-semibold">{title}</figcaption>
      </figure>
    </Link>
  );
};

export default SelectionItem;

import ShopIcon from "../assets/SVG/shopTabIcon.svg?component";
import StoresIcon from "../assets/SVG/storesTabIcon.svg?component";
import AuthorIcon from "../assets/SVG/authorTabIcon.svg?component";
import BooksIcon from "../assets/SVG/booksTabIcon.svg?component";
export const sidebarTabs = [
    {
        name: "Shop",
        icon: ShopIcon,
        link: "/"
    },
    {
       name: "Stores",
       icon: StoresIcon,
       link: "/stores" 
    },
    { 
        name: "Author",
        icon: AuthorIcon,
        link: "/author"
    },
    { 
        name: "Books",
        icon: BooksIcon,
        link: "/books"
    }
]
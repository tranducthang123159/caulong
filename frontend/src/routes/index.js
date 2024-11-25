import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import Admin from "../admin/AdminDashboard"; 
import AdminDashboard from '../admin/AdminDashboard';
import AddProductForm from '../admin/AddProductForm';
import ProductList from '../admin/ProductList';
import CategoryManager from '../admin/CategoryManager';
import UserManagement from '../admin/UserManagement';
import CartComponent from "../pages/CartPage/CartComponent"; 
import CheckoutPage from "../pages/CartPage/CheckoutPage";  // Make sure it's the CheckoutPage
import orders from '../admin/orders';
import OrderDetailsComponent from '../admin/OrderDetailsComponent';



export const routes = [


  {
    path: '/checkout',  // This is the path for the checkout page
    page: CheckoutPage,  // Ensure it's pointing to the CheckoutPage component
    isShowHeader: true,  // Show header on this page (if needed)
  },

  {
    path: '/',
    page: HomePage,
    isShowHeader: true,
  },

  {
    path: '/admin/dashboard',
    page: AdminDashboard,
    isShowHeader: true,
  },

  {
    path: '/admin/orders/:id',  // Use dynamic ID for order details
    page: OrderDetailsComponent,
    isShowHeader: true,
  },

  {
    path: '/admin/orders',
    page: orders,
    isShowHeader: true,
  },

  {
    path: '/admin/user',
    page: UserManagement,
    isShowHeader: true,
  }, 

  {
    path: '/admin/ProductList',
    page: ProductList,
    isShowHeader: true,
  },
  {
    path: '/admin/add-product',
    page: AddProductForm,
    isShowHeader: true,
  },

  {
    path: '/admin/categories', 
    page: CategoryManager,    
    isShowHeader: true,       
  },

  {
    path: '/order',
    page: OrderPage,
    isShowHeader: true,
  },
  {
    path: '/products',
    page: ProductsPage,
    isShowHeader: true,
  },
  {
    path: '/:type',
    page: TypeProductPage,
    isShowHeader: true,
  },
  {
    path: '/sign-in',
    page: SignInPage,
    isShowHeader: false,
  },
  {
    path: '/sign-up',
    page: SignUpPage,
    isShowHeader: false,
  },
  {
    path: '/product/:id',  // Dynamic route for product details
    page: ProductDetailsPage,
    isShowHeader: true,
  },


  {
    path: '/cart', // Route for the cart page
    page: CartComponent, // Display the cart page
    isShowHeader: true,
  },

  {
    path: '/admin',
    page: Admin,
    isShowHeader: true,
  },


  {
    path: '/products/category/:categoryId',
    page: ProductsPage,
    isShowHeader: true,
  },

  {
    path: '*',
    page: NotFoundPage,
  },
];

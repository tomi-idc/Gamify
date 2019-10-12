import AuthModel from './domain/AuthModel'
import SlideshowModel from './domain/SlideshowModel'
import CartModel from './domain/CartModel'
import CurrentProductModel from './domain/CurrentProductModel'
import CategoryModel from './domain/CategoryModel'
import SearchModel from './domain/SearchModel';
import UserModel from './domain/UserModel'
import WishlistModel from './domain/WishlistModel';
import AdminModel from './domain/AdminModel'

class RootStore {
    static type = {
        LOGIN_MODEL: 'loginModel',
        SLIDESHOW_MODEL: 'slideshowModel',
        CART_MODEL: 'cartModel',
        CURRENTPRODUCT_MODEL: 'currentProductModel',
        CATEGORY_MODEL: 'categoryModel',
        SEARCH_MODEL: 'searchModel',
        USER_MODEL: 'userModel',
        WISHLIST_MODEL: 'wishlistModel',
        ADMIN_MODEL: 'adminModel'
    };

    constructor() {
        this.LoginModel = new AuthModel();
        this.userModel = new UserModel(this.LoginModel);

        this.SlideshowModel = new SlideshowModel();
        this.categoryModel = new CategoryModel();
        this.searchModel = new SearchModel();

        this.cartModel = new CartModel(this.LoginModel, this.userModel);
        this.currentProductModel = new CurrentProductModel(this.LoginModel, this.userModel);
        this.wishlistModel = new WishlistModel(this.LoginModel);
        this.adminModel = new AdminModel(this.authModel);
    }

    getStores = () => ({
        [RootStore.type.LOGIN_MODEL]: this.LoginModel,
        [RootStore.type.SLIDESHOW_MODEL]: this.SlideshowModel,
        [RootStore.type.CART_MODEL]: this.cartModel,
        [RootStore.type.CURRENTPRODUCT_MODEL]: this.currentProductModel,
        [RootStore.type.CATEGORY_MODEL]: this.categoryModel,
        [RootStore.type.SEARCH_MODEL]: this.searchModel,
        [RootStore.type.USER_MODEL]: this.userModel,
        [RootStore.type.WISHLIST_MODEL]: this.wishlistModel,
        [RootStore.type.ADMIN_MODEL]: this.adminModel
    })
}

export default RootStore
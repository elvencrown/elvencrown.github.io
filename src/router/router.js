import * as VueRouter from 'vue-router'
 
import CatalogPage from '../components/pages/catalogPage/CatalogPage.vue'
import CartPage from '../components/pages/cartPage/CartPage.vue'
import ProductPage from '../components/pages/productPage/ProductPage.vue'
import UserProfilePage from '../components/pages/userProfilePage/UserProfilePage.vue'
import CheckoutPage from '../components/pages/checkoutPage/CheckoutPage.vue'

import AboutUsPage from '../components/pages/AboutUsPage.vue'
import ContactsPage from '../components/pages/ContactsPage.vue'

const router = new VueRouter.createRouter({
	history: VueRouter.createWebHistory(),
	routes: [
		{
			path: '/',  
			name: 'main',  
			component: CatalogPage,
			meta: {
		      title: 'elvencrown',
		    }
		},

		{
			path: '/contacts',  
			name: 'contacts',  
			component: ContactsPage,
			meta: {
		      title: 'Контакти | elvencrown',
		    }
		},

		{
			path: '/user',  
			name: 'user',  
			component: UserProfilePage,
			meta: {
		      title: 'Мій профіль | elvencrown',
		    }
		},

		{
			path: '/about-us',  
			name: 'about-us',  
			component: AboutUsPage,
			meta: {
		      title: 'Про нас | elvencrown',
		    }
		},

		{
			path: '/cart',  
			name: 'cart',  
			component: CartPage,
			meta: {
		      title: 'Кошик | elvencrown',
		    }
		},

		{
			path: '/checkout',  
			name: 'checkout',  
			component: CheckoutPage,
			meta: {
		      title: 'Оформлення замовлення | elvencrown',
		    }
		},

		{ 
			path: '/:pathMatch(.*)*', 
			name: 'NotFound', 
			component: {template: '<div>404</div>'},
			meta: {
		      title: 'Сторінки немає | elvencrown',
		    }
		},

		{ 
			path: '/product_page/id:product_id', 
			name: 'product_page', 
			component: ProductPage
		}
	]
})	

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'elvencrown';
  next();
});

export default router
import { createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router'
import { lazy, useEffect } from 'react'
import ReactDOM from 'react-dom/client'

import { Provider, useDispatch } from 'react-redux'
import App from './App'
import { sleep } from './lib/utils'
import { store } from './store'
import { AppModes, setLoadingProgress, setMode } from './store/app'
import Route from './widgets/Route'

const HomePageLazy = lazy(() => import('./pages/Home/Home'))

const rootRoute = createRootRoute({
	component: () => <App />
})

const homeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	loader: async () => {
		if(!window.Telegram) return
		
		window.Telegram.WebApp.expand()
		window.Telegram.WebApp.disableVerticalSwipes()
		window.Telegram.WebApp.headerColor = '#1D1D1D'
		window.Telegram.WebApp.backgroundColor = '#1D1D1D'
	},
	component: function Index() {
		const dispatch = useDispatch()
		
		useEffect(() => {
			(async() => {
				dispatch(setLoadingProgress(30))
				await sleep(1000)
		
				dispatch(setLoadingProgress(60))
				await sleep(1500)
		
				dispatch(setLoadingProgress(80))
				await sleep(1000)
		
				dispatch(setLoadingProgress(100))
				await sleep(500)

				dispatch(setMode(AppModes.Default))
			})()
		}, [])
		

		return (
			<Route>
				<HomePageLazy />
			</Route>
		)
	}
})


const routeTree = rootRoute.addChildren([
	homeRoute,
])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
  );

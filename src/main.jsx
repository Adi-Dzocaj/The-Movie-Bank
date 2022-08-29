import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {
	QueryClient,
	QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from "react-query/devtools";
import UrlContextProvider from './Contexts/UrlPrefixerContext';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			// After 1 hour, data becomes stale.
			staleTime: 1000 * 60 * 60,
			// After 2 hours, the cached data is removed from memory.
			cacheTime: 1000 * 60 * 60 * 2
		}
	}
})

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<UrlContextProvider>
						<App />
					</UrlContextProvider>
				</BrowserRouter>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
	</React.StrictMode>
)

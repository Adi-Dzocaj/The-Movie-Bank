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

const queryClient = new QueryClient()

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

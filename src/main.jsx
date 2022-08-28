import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
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
				<HashRouter>
					<UrlContextProvider>
						<App />
					</UrlContextProvider>
				</HashRouter>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>

	</React.StrictMode>
)

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import your AuthProvider
import PrivateRoute from './components/pages/PrivateRoute';
import Signup from './components/pages/Signup';
import Signin from './components/pages/Signin';
import DashBoard from './components/pages/DashBoard';
import SendMoney from './components/pages/SendMoney';
import Settings from './components/pages/Settings';
import Transactions from './components/pages/Transactions';
import { RecoilRoot } from 'recoil';
import NotFound from './components/pages/NotFound';

function App() {
	const { authenticated } = useAuth();
	return (
		<>
			<RecoilRoot>
				{' '}
				<AuthProvider>
					<BrowserRouter>
						<Routes>
							<Route
								path='/signup'
								element={
									authenticated ? <Navigate to='/dashboard' /> : <Signup />
								}
							/>
							<Route
								path='/signin'
								element={
									authenticated ? <Navigate to='/dashboard' /> : <Signin />
								}
							/>

							{/* Private routes */}
							<Route
								path='/dashboard'
								element={
									<PrivateRoute>
										<DashBoard />
									</PrivateRoute>
								}
							/>
							<Route
								path='/send'
								element={
									<PrivateRoute>
										<SendMoney />
									</PrivateRoute>
								}
							/>
							<Route
								path='/settings'
								element={
									<PrivateRoute>
										<Settings />
									</PrivateRoute>
								}
							/>
							<Route
								path='/transactions'
								element={
									<PrivateRoute>
										<Transactions />
									</PrivateRoute>
								}
							/>
							<Route
								path='/'
								element={<Navigate to='/dashboard' />}
							/>
							<Route
								path='*'
								element={<NotFound />}
							/>
						</Routes>
					</BrowserRouter>
				</AuthProvider>
			</RecoilRoot>
		</>
	);
}

export default App;
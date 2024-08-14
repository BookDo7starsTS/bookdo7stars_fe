import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';
import Footer from './components/Footer';
import Header from './components/Header';
import StyledComponentsRegistry from './lib/registry';
import StoreProvider from './providers/StoreProvider';
import ThemeProvider from './theme-provider';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <StoreProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </StoreProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
};

export default RootLayout;

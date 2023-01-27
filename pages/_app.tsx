import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from "recoil";
import { useAuth } from '../firestore/useAuth';

type Props = {
  children: JSX.Element;
};

const Auth = ({ children }: Props): JSX.Element => {
  const { isLoading } = useAuth();
  return isLoading ? <p>Loading...</p> : children;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    < RecoilRoot>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </RecoilRoot>
  )
}

import { lazy, Suspense, useEffect, useState } from 'react'
import './App.css'
import { sayHello } from './utils/sayHello'
import ReactLogo from './assets/react.svg?react'
import styles from './App.module.css'
import './styles.scss'
import Button from './components/Button'
import Card from './components/Card'
import logo from './assets/react.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const LazyChart = lazy(() => import('./components/Chart'))
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))

type Props = {
  name?: string
};

function App({ name }: Props) {
  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_API_URL);
  }, []);

  const [count, setCount] = useState(0);
  return (<>
    <h1>Hello {name}</h1>
    <div className="card">
      <button onClick={() => setCount(count + 1)}>Count is {count}</button>
      <div>---</div>
      <button onClick={() => setCount((count) => count * 10)}>Countx10 {count}</button>

      <p>Edit <code>src/App.tsx</code> and save to test HMR</p>
    </div>

    <p className="read-the-docs">Click on the Vite and React logos to learn more</p>

    <button onClick={() => alert('Hello Vite!')}>Test</button>
    <h1>{import.meta.env.VITE_APP_NAME}</h1>
    <p>API URL: {import.meta.env.VITE_API_URL}</p>
    <p>{sayHello("Vite")}</p>
    <p>Version: {import.meta.env.VITE_VERSION}</p>

    <ReactLogo width={100} height={150} />

    <h1 className="title">Hello Vite</h1>
    <button className="btn">Click me</button>
    <Card title='Test card'>
      <div>Test</div>
      <h1 className={styles.title}>Hello Vite</h1>
      <Button label="Bấm tao đi" />
    </Card>

    <img src={logo} alt="Logo" width={100} />
    <p>File từ public folder:</p>
    <img src="/vite.svg" alt="Vite public" width={100} />

    <div>
      <h1>Trang Dashboard</h1>
      <Suspense fallback={<p>Đang tải chart...</p>}>
        <LazyChart />
      </Suspense>
    </div>

    <BrowserRouter>
      <Suspense fallback={<p>Đang tải...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </>);
}

export default App;
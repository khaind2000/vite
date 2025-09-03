import { useEffect, useState } from 'react'
import './App.css'
import { sayHello } from './utils/sayHello';

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
  </>);
}

export default App;
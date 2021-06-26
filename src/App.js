import {useState, useEffect} from "react";
import {API} from "aws-amplify";
import './App.css';

function App() {
  const [coins, setCoins] = useState([]);

  async function fetchCoins() {
    const data = await API.get('cryptoapi', '/coins');
    setCoins(data.coins);
  }

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className="App">
      {
        coins.map(coin => (
          <div key={coin.symbol}>
            <h2>{coin.name} - {coin.symbol}</h2>
            <h5>${coin.price_usd}</h5>
          </div>
        ))
      }
    </div>
  );
}

export default App;

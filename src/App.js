import {useState, useEffect} from "react";
import {API} from "aws-amplify";
import './App.css';

function App() {
  const [input, setInput] = useState({limit: 5, start: 0});
  const [coins, setCoins] = useState([]);

  function updateInputValues(type, value) {
    setInput({...input, [type]: value});
  }

  async function fetchCoins() {
    const {limit, start} = input;
    const data = await API.get('cryptoapi', `/coins?limit=${limit}&start=${start}`);
    setCoins(data.coins);
  }

  return (
    <div className="App">
      <input type="text" onChange={(e) => updateInputValues('limit', e.target.value)} placeholder="limit"/>
      <input type="text" onChange={(e) => updateInputValues('start', e.target.value)} placeholder="start"/>
      <button onClick={fetchCoins}>Fetch coins</button>
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

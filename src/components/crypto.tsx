import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../css/Crypto.css';

import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

interface ICrypto {
  userId: number;
  id: string;
  name: string;
  market_cap: number;
  current_price: number;
  image: string;
  total_volume: number;
  symbol: string;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: string;
}

const defaultProps:ICrypto[] = [];

const Cryptocurrency: React.FC = () => {
  const [crypto, setCryptos]: [ICrypto[], (posts: ICrypto[]) => void] = React.useState(defaultProps);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");
  const [search, setSearch]: [string, (search: string) => void] = React.useState("");
  const [show, toggleShow] = React.useState(true);

  React.useEffect(() => {
    axios
      .get<ICrypto[]>("https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=7d")
      .then(response => {
        setCryptos(response.data);
        setLoading(false);
      }).catch(ex => {
        const error =
        ex.response.status === 404
          ? "Resource not found"
          : "An unexpected error has occurred";
        setError(error);
        setLoading(false);
      });
  }, []);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
      maxWidth: 1300,
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: "30px",
      marginBottom: "30px",
    },
  });

  const classes = useStyles();
  return (
    
  <div className="japp">
    <div >

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
            <p className="crypto-matches">100 matches</p>
            <input className="" placeholder='Search' type="text" value={search} onChange={(e) => setSearch(e.target.value)}></input>
          <TableRow>
            <TableCell>Coin</TableCell>
            <TableCell>Cymbol</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Volume</TableCell>
            <TableCell align="right">Market cap</TableCell>
            <TableCell align="right">24h</TableCell>
            <TableCell align="right">7d</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {crypto.map((crypto) => {
            if (search === "" || crypto.name.toLowerCase().includes(search.toLowerCase())) {
              return (
            <TableRow key={crypto.id}>
              <TableCell component="th" scope="row">
                <img src={crypto.image} alt="image" />
                <Link to="/cryptoInfo">{crypto.name.toLocaleUpperCase()}</Link>
              </TableCell>
              <TableCell align="right">{crypto.symbol.toLocaleUpperCase()}</TableCell>
              <TableCell align="right">{crypto.current_price} SEK</TableCell>
              <TableCell align="right">{crypto.total_volume} SEK</TableCell>
              <TableCell align="right">{crypto.market_cap} SEK</TableCell>
              <TableCell align="right">{crypto.price_change_percentage_24h} %</TableCell>
              <TableCell align="right">{crypto.price_change_percentage_7d_in_currency} %</TableCell>
            </TableRow>
          )}})}
        </TableBody>
        {error && <p className="error">{error}</p>}
      </Table>
    </TableContainer>







      {/* <table className="crypto-content">    
        <thead>
          <tr className="jfjfj">
            <td className="hello">
              Kryptotillgångar som innehåller Bitcoins
              Bitcoin är världens mest omsatta kryptovaluta 
              som representerar en stor del av kryptovaluta 
              marknaden. Det var den första kryptovalutan som 
              introducerades för allmänheten och har därför mest 
              utvecklad infrastruktur. Den är ofta ansedd att vara 
              en trendsättare i kryptovaluta-världen. Bitcoin skapades 
              som en alternativ tillgångsklass och kan användas i 
              portföljen som del av en riskstrategi, särskilt under 
              de turbulenta marknader.
            </td>
          </tr>
          <tr className="crypto-search-header">
            <td className="crypto-matches">100 matches</td>
            <td><input className="" placeholder='Search' type="text" value={search} onChange={(e) => setSearch(e.target.value)}></input></td>
          </tr>
          <tr>
            <th>Coin</th>
            <th>Name</th>
            <th>Price</th>
            <th>Volume</th>
            <th>Market cap</th>
            <th>24h</th>
            <th>7d</th>
          </tr>
        </thead>
        <tbody>
          {crypto.map((crypto) => {
          if (search === "" || crypto.name.toLowerCase().includes(search.toLowerCase())) {
          return (
            <tr key={crypto.id} >
              <td className="crypto-image">
                <img src={crypto.image} alt="image" />
                <tr><Link to="/cryptoInfo">{crypto.symbol.toLocaleUpperCase()}</Link></tr>
              </td>
              <td>{crypto.id.toLocaleUpperCase()}</td>
              <td>{crypto.current_price} SEK</td>
              <td>{crypto.total_volume} SEK</td>
              <td>{crypto.market_cap} SEK</td>
              <td>{crypto.price_change_percentage_24h} SEK</td>
              <td>{crypto.price_change_percentage_7d_in_currency} SEK</td>
            </tr>
          );}})}
        </tbody>
        {error && <p className="error">{error}</p>}
      </table> */}
    </div>
  </div>
  )
}

export default Cryptocurrency;







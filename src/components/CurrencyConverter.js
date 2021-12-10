import { useState } from 'react'
import ExchangeRate from './ExchangeRate'
import axios from 'axios'
import { FaBitcoin } from "react-icons/fa";

const CurrencyConverter = () => {
    const currencies = ['BTC', 'ETH', 'EUR', 'USD', 'LTC', 'XRP', 'ADA','XMR', 'USDT']
    const [chosenPrimaryCurrency, SetChosenPrimaryCurrency] = useState('BTC')
    const [chosenSecondaryCurrency, SetChosenSecondaryCurrency] = useState('EUR')
    const [amount, SetAmount] = useState(1)
    const [exchangedData, setExchangedData] = useState({
        primaryCurrency: 'BTC',
        secondaryCurrency: 'BTC',
        exchangeRate: 0
    })
    const [result, setResult] = useState(0)

    console.log("exchangedData: ",exchangedData)

//function Convert - convert crypto value to another crypto
    const convert = () => {
        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
            headers: {
                'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
            }
        }

        axios.request(options).then((response) => {
            console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            //setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
            //setPrimaryCurrencyExchanged(chosenPrimaryCurrency)
            //setSecondaryCurrencyExchanged(chosenSecondaryCurrency)
            setExchangedData({
                primaryCurrency: chosenPrimaryCurrency,
                secondaryCurrency: chosenSecondaryCurrency,
                exchangeRate: response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']
            })
        }).catch((error) => {
            console.error(error)
        })
    }


    return (
        <div className="currency-converter">
            <h2>Cryptocurrency Converter  <FaBitcoin /></h2>

            <div className="input-box">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text " id="inputGroup-sizing-default">Currency</span>
                    </div>

                    <input className="form-control w-50"
                           aria-label="Default"
                           aria-describedby="inputGroup-sizing-default"
                           type="number"
                           name="currency-amount-1"
                           value={amount}
                           onChange={(e) => SetAmount(e.target.value)}
                    />
                    <select
                        value={chosenPrimaryCurrency}
                        name="currency-option-1"
                        className="currency-options form-control w-auto text-center "
                        onChange={(e) => SetChosenPrimaryCurrency(e.target.value)}
                    >
                        {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}

                    </select>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">Currency</span>
                    </div>
                    <input className="form-control w-50"
                           aria-label="Default"
                           aria-describedby="inputGroup-sizing-default"
                           type="number"
                           name="currency-amount-2"
                           value={result}
                           disabled={true}
                    />
                    <select
                        value={chosenSecondaryCurrency}
                        name="currency-option-2"
                        className="currency-options form-control w-auto text-center border-light"
                        onChange={(e) => SetChosenSecondaryCurrency(e.target.value)}
                    >
                        {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}

                    </select>
                </div>
                <button id="convert-button" className="btn btn-primary button" onClick={convert}>Convert</button>
            </div>


            <ExchangeRate
                exchangedData={exchangedData}
            />
        </div>
    )
}

export default CurrencyConverter
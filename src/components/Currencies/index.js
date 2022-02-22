import './style.scss';
import PropTypes from 'prop-types';

const Currencies = ({
    list,
    onCurrencyClick,
    selectedCurrency,
    onFilterChange,
    filterInput
}) => (
    <div className="currencies">
        <div className="currencies-title">
        <input
        placeholder="filtrer"
        value={filterInput}
        onChange={(evt) => {
            onFilterChange(evt.target.value);
        }
        }
        />
        </div>        
        <ul className="currencies-list">
            {
                list.map((currencyObj) => (
                    <li key={currencyObj.name} onClick={() => {
                        onCurrencyClick(currencyObj.name);
                    }} className={currencyObj.name === selectedCurrency ? 'currency currency-selected' : 'currency'}>
                    {currencyObj.name}</li>
                ))
            }
        </ul>
    </div>
);

Currencies.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
    })).isRequired,
    onCurrencyClick: PropTypes.func.isRequired,
    selectedCurrency: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    filterInput: PropTypes.string.isRequired,
};

export default Currencies;
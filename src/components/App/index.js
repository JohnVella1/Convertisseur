// == Import
import React from 'react';
import Header from '../Header';
import Currencies from '../Currencies';
import Amount from '../Amount';
import Toggler from '../Toggler';

import './styles.css';

import currenciesArray from '../../data/currencies';

class App extends React.Component {
  state = {
    isVisible: true,
    baseAmount: 1,
    selectedCurrency: 'United States Dollar',
    filterText: '',
  }

  componentDidMount (){
    this.updateDocumentTitle();
    const selectedCurrency = localStorage.getItem('selectedCurrency');
    if(selectedCurrency){
      this.setState({
        selectedCurrency,
      })
    }
  }

  componentDidUpdate (){
    const { selectedCurrency } = this.state;
    this.updateDocumentTitle();
    localStorage.setItem('selectedCurrency', selectedCurrency);
  }

  updateDocumentTitle (){
    const {selectedCurrency} = this.state;
    document.title = `Convertisseur ${selectedCurrency}`
  }

  toggleCurrencies = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  }

  getValue = () => {
    const { selectedCurrency, baseAmount } = this.state;
    const currencyObject = currenciesArray.find((currency) => currency.name === selectedCurrency);
      const result = currencyObject.rate * baseAmount;
    return Math.round(result * 100) / 100;
  }

  changeBaseValue = (number) => {
    this.setState({
      baseAmount: number,
    });
  }

  changeCurrency = (newCurrency) => {
    this.setState({
      selectedCurrency: newCurrency,
    });
  }

  changeFilterText = (filterText) => {
    this.setState({
      filterText,
    });
  }

  getFilteredCurrencies = () => {
    const { filterText } = this.state;
    const filteredCurrencies = currenciesArray.filter((currency) => {
      const filter = filterText.toLowerCase();
      const currencyName = currency.name.toLowerCase();

      const currencyContainsFilter = currencyName.includes(filter);

      return currencyContainsFilter;
    });
    return filteredCurrencies;
  }

  render() {
    const {
      isVisible,
      baseAmount,
      selectedCurrency,
      filterText
    } = this.state;

    return (
      <div className="app">
        <Header baseAmount={baseAmount} onInputChange={this.changeBaseValue} />
        <Toggler opened={isVisible} toggle={this.toggleCurrencies} />
        {
        isVisible && <Currencies
        filterInput={filterText}
        onFilterChange={this.changeFilterText}
        selectedCurrency={selectedCurrency}
        list={this.getFilteredCurrencies()}
        onCurrencyClick={this.changeCurrency}
        />
        }
        <Amount currency={selectedCurrency} value={this.getValue()} />
      </div>
    );    
  }
}

// == Composant

// == Export
export default App;

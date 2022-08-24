import React from 'react';
import Autosuggest from 'react-autosuggest';
import { theme } from '../../theme.css'

// Imagine you have a list of tags that you'd like to autosuggest.
const tags = [
    {name:"angular"},
    {name:"apple"},
    {name:"adobe"},
    {name:"apache"},
    {name:"axios"},
    {name:"bash"},
    {name:"c"},
    {name:"c-"},
    {name:"c#"},
    {name:"c++"},
    {name:"canvas"},
    {name:"curl"},
    {name:"c shell"},
    {name:"dart"},
    {name:"database"},
    {name:"django"},
    {name:"express"},
    {name:"firebase"},
    {name:"git"},
    {name:"github"},
    {name:"go"},
    {name:"go!"},
    {name:"google"},
    {name:"java"},
    {name:"javascript"},
    {name:"leetcode"},
    {name:"lodash"},
    {name:"mern"},
    {name:"mongodb"},
    {name:"mongoose"},
    {name:"nesl"},
    {name:"net.data"},
    {name:"node"},
    {name:"opal"},
    {name:"python"},
    {name:"python3"},
    {name:"pipenv"},
    {name:"react"},
    {name:"scratch"},
    {name:"script.net"},
    {name:"sql"},
    {name:"swift"},
    {name:"typescript"},
    {name:"visual studio"},
    {name:"vue"}
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : tags.filter(tag =>
    tag.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

class Autocomplete extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={{theme}}
      />
    );
  }
}

export default Autocomplete
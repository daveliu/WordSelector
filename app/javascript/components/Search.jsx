import React from 'react';
import axios from 'axios';
import Autocomplete from 'react-autocomplete'

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

export default class Search extends React.Component {
  state = { value: '', results: [], mywords: [] }

  constructor(props) {
    super(props)
    this.triggerChange = this.triggerChange.bind(this)
  }

  componentWillMount() {
    this.timer = null

    axios.get('/mywords.json', { params: {} })
      .then(res => this.setState({ mywords: res.data }))
  }

  // Input fire onChange when user stopped typing
  onChange = (e, value) => {
    clearTimeout(this.timer)
    this.setState({ value })
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  }

  triggerChange() {
    const value = this.state.value

    if (value.length > 0) {
      axios.get('/search.json', { params: { query: value } })
        .then(res => this.setState({ results: res.data }))
        .catch(() => this.setState({ results: [] }))
    } else {
      this.setState({ results: [] })
    }
  }

  onSelect = (value, item) => {
    this.setState({ value: '', results: [] })
    const url  = "/mywords.json"

    axios.post(url, { id: item.id })
      .then(res => this.setState({ mywords: res.data }))
  }

  render() {
    const { value, results, mywords } = this.state
    return (
      <div class="middle aligned row">
        <div class="ui container">
          <div class="ui icon header">
            <i class="search icon"></i>
            Word Selector
          </div>


          <Autocomplete
            inputProps={{ id: 'words-autocomplete', type: 'text', placeholder: 'Search words...'}}
            wrapperProps={{ class: 'ui input' }}
            wrapperStyle={{ position: 'relative', display: 'block' }}
            value={this.state.value}
            items={results}
            getItemValue={(item) => item.name}
            onSelect={this.onSelect}
            onChange={this.onChange}
            renderItem={(item, isHighlighted) => (
              <div className={`item  result ${isHighlighted ? 'item-highlighted' : ''}`}                 
                 key={item.id}>
                <div className="middle aligned content">
                  <div className="header title">{item.name}</div>
                </div>
              </div>
            )}

          />


        </div>

        <div class="ui huge labels">
          {mywords.map(word =>
            <div class="ui label" key={word.id}>
              {word.name}
            </div>
          )}
        </div>
      </div>
    );
  }
}

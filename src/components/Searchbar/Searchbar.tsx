import * as S from './Searchbar.styled';
import React, { Component, SyntheticEvent } from 'react';
import { BiSearchAlt } from 'react-icons/bi';

interface Props {
  onSubmit: (searchQuery: string) => void;
}

interface State {
  searchQuery: string;
}

export class Searchbar extends Component<Props, State> {
  state: State = {
    searchQuery: '',
  };

  handleSubmit = (e: SyntheticEvent) => {
    const { onSubmit } = this.props;
    const { searchQuery } = this.state;
    e.preventDefault();
    onSubmit(searchQuery.trim());
  };

  handleSearchInputChange = (e: SyntheticEvent) => {
    this.setState({ searchQuery: (e.target as HTMLInputElement).value.trim() });
  };

  render() {
    const { handleSubmit, handleSearchInputChange } = this;
    const { searchQuery } = this.state;

    return (
      <S.Searchbar>
        <form onSubmit={handleSubmit}>
          <button type="submit">
            <BiSearchAlt size={30} />
          </button>

          <input
            onChange={handleSearchInputChange}
            type="text"
            autoComplete="off"
            autoFocus
            name="searchQuery"
            value={searchQuery}
            placeholder="Search results and photos"
          />
        </form>
      </S.Searchbar>
    );
  }
}

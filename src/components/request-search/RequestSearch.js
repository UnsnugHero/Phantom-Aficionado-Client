import React, { useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useHistory } from 'react-router';

import { MakeRequestButton, RequestSearchBar, RequestSearchContainer } from '../styles/Request.style';
import { GeneralXLHeader } from '../styles/App.style';
import RequestFilterMenu from './RequestFilterMenu';
import RequestList from './RequestList';
import { connect } from 'react-redux';

const RequestSearch = ({ isAuthenticated }) => {
  const mockRequests = [
    {
      id: 1,
      subject: 'Help!',
      location: 'Shinjuku',
      completed: false,
      postedDate: new Date('2021-10-1').toLocaleDateString('en-US'),
      likesCount: 156,
      comments: [],
    },
    {
      id: 2,
      subject: 'Someone please',
      location: 'Chiba',
      completed: true,
      postedDate: new Date('2021-5-31').toLocaleDateString('en-US'),
      likesCount: 81,
      comments: [{}, {}],
    },
    {
      id: 3,
      subject: 'This needs to stop',
      location: 'Shibuya',
      completed: false,
      postedDate: new Date('2021-9-13').toLocaleDateString('en-US'),
      likesCount: 23,
      comments: [{}, {}, {}, {}],
    },
  ];

  const [formState, setForm] = useState({
    subject: '',
    areFiltersActive: false,
    filters: { hideCompleted: false },
    selectedSort: { sortOn: 'postedDate', sortDir: 'desc' },
    isLoading: false,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const search = useCallback(
    debounce((searchPayload) => {
      console.log('I just searched with ', searchPayload);
    }, 300),
    []
  );

  useEffect(() => {
    search(formState);
    // call search here yo
  });

  const history = useHistory();

  const onMenuAction = useCallback((menuState) => {
    setForm((newState) => ({
      ...newState,
      areFiltersActive: menuState.isMenuExpanded,
      filters: menuState.filters,
      selectedSort: menuState.selectedSort,
    }));
  }, []);

  const handleInputChange = (event) => {
    setForm({ ...formState, subject: event.target.value });
  };

  const handleMakeRequestButtonClick = () => {
    history.push('/make-request');
  };

  return (
    <RequestSearchContainer>
      <GeneralXLHeader>Request Search</GeneralXLHeader>
      {isAuthenticated && (
        <MakeRequestButton text='Make A Request' onButtonClick={handleMakeRequestButtonClick}></MakeRequestButton>
      )}
      <RequestSearchBar
        className='request-search-bar'
        name='search'
        placeholder='Search Requests'
        onInputChange={handleInputChange}
        type='text'
        value={formState.subject}
      />
      <RequestFilterMenu onMenuAction={onMenuAction} />
      <RequestList requests={mockRequests} loading={formState.isLoading} />
    </RequestSearchContainer>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(RequestSearch);
import Detail from './Detail';

test('load content using skeleton while loading', async () => {
  mockedAxios.get.mockImplementationOnce(()=> {
    return Promise.resolve({
      data: {
        data:{
            results:[{
                id: 1,
                name:'Adam Warlock',
                description: 'This is Mocked Adam Warlock',
                thumbnail: { path: 'AdamWarlockPath', extension:'jpg' }
            }],
            total:0
        }
      }
    })
  }).mockImplementationOnce(()=> {
    return Promise.resolve({
      data: {
        data:{
            results:[
                {
                    id: 1,
                    title:'Adam Serie',
                    thumbnail: { path: 'AdamWarlockSeriePath', extension:'jpg' }
                }
            ],
            total:1
        }
      }
    })
  });

  const wrapper = reduxWrap(<Detail match={{params:{id:1}}} />, {pages:{characters:[], customCharacters:[]}});

  const {queryByTestId, queryByText, queryAllByText, getByTestId} = render(wrapper)
  
  expect(queryByTestId('content')).not.toBeInTheDocument();
  expect(queryByTestId('content-skeleton')).toBeInTheDocument();

  await waitForElement(() => queryByTestId('content'));
  expect(queryByTestId('content')).toBeInTheDocument();
  expect(queryByTestId('content-skeleton')).not.toBeInTheDocument();
  expect(queryByText(/name/i)).toBeInTheDocument();
  expect(queryByText(/description/i)).toBeInTheDocument();
  expect(queryByText(/adam warlock/i)).toBeInTheDocument();
  expect(queryByText(/adam serie/i)).toBeInTheDocument();
});

test('edit content and save', async () => {
    mockedAxios.get.mockImplementationOnce(()=> {
      return Promise.resolve({
        data: {
          data:{
              results:[{
                  id: 1,
                  name:'Adam Warlock',
                  description: 'This is Mocked Adam Warlock',
                  thumbnail: { path: 'AdamWarlockPath', extension:'jpg' }
              }],
              total:0
          }
        }
      })
    }).mockImplementationOnce(()=> {
      return Promise.resolve({
        data: {
          data:{
              results:[
                  {
                      id: 1,
                      title:'Adam Serie',
                      thumbnail: { path: 'AdamWarlockSeriePath', extension:'jpg' }
                  }
              ],
              total:1
          }
        }
      })
    });
  
    const wrapper = reduxWrap(<Detail match={{params:{id:1}}} />, {pages:{characters:[], customCharacters:[]}});
  
    const {queryByTestId, queryByText, getByText} = render(wrapper)
    
    expect(queryByTestId('content')).not.toBeInTheDocument();
    expect(queryByTestId('content-skeleton')).toBeInTheDocument();
  
    await waitForElement(() => queryByTestId('content'));

    act(() => {
        fireEvent.click(getByText("Edit"));
    });

    expect(queryByText('Cancel')).toBeInTheDocument();
    expect(queryByText('Save')).toBeInTheDocument();
    expect(queryByText('Edit')).not.toBeInTheDocument();

    act(() => {
        fireEvent.click(getByText("Save"));
    });

    expect(queryByText('Cancel')).not.toBeInTheDocument();
    expect(queryByText('Save')).not.toBeInTheDocument();
    expect(queryByText('Edit')).toBeInTheDocument();
  });

  test('edit content and cancel', async () => {
    mockedAxios.get.mockImplementationOnce(()=> {
      return Promise.resolve({
        data: {
          data:{
              results:[{
                  id: 1,
                  name:'Adam Warlock',
                  description: 'This is Mocked Adam Warlock',
                  thumbnail: { path: 'AdamWarlockPath', extension:'jpg' }
              }],
              total:0
          }
        }
      })
    }).mockImplementationOnce(()=> {
      return Promise.resolve({
        data: {
          data:{
              results:[
                  {
                      id: 1,
                      title:'Adam Serie',
                      thumbnail: { path: 'AdamWarlockSeriePath', extension:'jpg' }
                  }
              ],
              total:1
          }
        }
      })
    });
  
    const wrapper = reduxWrap(<Detail match={{params:{id:1}}} />, {pages:{characters:[], customCharacters:[]}});
  
    const {queryByTestId, queryByText, getByText} = render(wrapper)
    
    expect(queryByTestId('content')).not.toBeInTheDocument();
    expect(queryByTestId('content-skeleton')).toBeInTheDocument();
  
    await waitForElement(() => queryByTestId('content'));

    act(() => {
        fireEvent.click(getByText("Edit"));
    });

    expect(queryByText('Cancel')).toBeInTheDocument();
    expect(queryByText('Save')).toBeInTheDocument();
    expect(queryByText('Edit')).not.toBeInTheDocument();

    act(() => {
        fireEvent.click(getByText("Cancel"));
    });

    expect(queryByText('Cancel')).not.toBeInTheDocument();
    expect(queryByText('Save')).not.toBeInTheDocument();
    expect(queryByText('Edit')).toBeInTheDocument();
  });

  test('with already loaded character', async () => {
    mockedAxios.get.mockImplementationOnce(()=> {
      return Promise.resolve({
        data: {
          data:{
              results:[
                  {
                      id: 1,
                      title:'Adam Serie',
                      thumbnail: { path: 'AdamWarlockSeriePath', extension:'jpg' }
                  }
              ],
              total:1
          }
        }
      })
    });
  
    const wrapper = reduxWrap( < Detail match = {{params: {id: 1}}}/>, 
        {
            pages:{characters:[], customCharacters:{
                1:{
                    id: 1,
                    name:'Adam Warlock',
                    description: 'This is Mocked Adam Warlock',
                    thumbnail: { path: 'AdamWarlockPath', extension:'jpg' }
                }
            }
        }
    });
  
    const {queryByTestId, queryByText} = render(wrapper)
    
    expect(queryByTestId('content')).toBeInTheDocument();
    expect(queryByTestId('content-skeleton')).not.toBeInTheDocument();
  
    await waitForElement(() => queryByText(/adam serie/i));

    expect(queryByTestId('content')).toBeInTheDocument();
    expect(queryByTestId('content-skeleton')).not.toBeInTheDocument();
    expect(queryByText(/name/i)).toBeInTheDocument();
    expect(queryByText(/description/i)).toBeInTheDocument();
    expect(queryByText(/adam warlock/i)).toBeInTheDocument();
    expect(queryByText(/adam serie/i)).toBeInTheDocument();
  });
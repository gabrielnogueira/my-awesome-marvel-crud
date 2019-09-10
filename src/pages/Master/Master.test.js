import Master from './Master';

afterEach(() => {
  cleanup();
});

test('load skeleton while loading', () => {
  mockedAxios.get.mockImplementationOnce(()=> {
    return Promise.resolve({
      data: {
        data:{
            results:[],
            total:0
        }
      }
    })
  });

  const wrapper = reduxWrap(<Master />, {pages:{characters:[]}});

  const {queryByTestId, queryByTitle} = render(wrapper)
  
  expect(document.querySelector('.masonry-item')).not.toBeInTheDocument();
  expect(queryByTestId('masonry-skeleton')).toBeInTheDocument();

  waitForElement(() => queryByTitle('notfound'));
  
  wait(() => {
      expect(document.querySelector('.masonry-item')).not.toBeInTheDocument();
      expect(queryByTestId('masonry-skeleton')).not.toBeInTheDocument();
      expect(queryByTitle('notfound')).toBeInTheDocument();
  });
});

test('fetch characters ', () => {
      mockedAxios.get.mockImplementationOnce(()=>
        Promise.resolve({
          data: {
            data:{
                results:[
                  {
                    id: 1,
                    name:'Adam Warlock',
                    description: 'This is Mocked Adam Warlock',
                    thumbnail: { path: 'AdamWarlockPath', extension:'jpg' }
                  },{
                    id: 2,
                    name:'Some Other Character',
                    description: 'This is Mocked Character',
                    thumbnail: { path: 'CharPath', extension:'jpg' }
                  }
                ],
                total:2
            }
          }
        })
      );

      const wrapper = reduxWrap(<Master />, {pages:{characters:[]}});
    
      const {queryByTestId, queryByText, getByTestId} = render(wrapper)
      
      expect(document.querySelector('.masonry-item')).not.toBeInTheDocument();
    
      waitForElement(() => document.querySelector('.masonry-item'));
      
      wait(() => {
          expect(document.querySelector('.masonry-item')).toBeInTheDocument();
          expect(document.querySelectorAll('.masonry-item').length).toBe(2);
          expect(queryByTestId('masonry-skeleton')).not.toBeInTheDocument();
          expect(queryByTitle('notfound')).not.toBeInTheDocument();
          expect(queryByText('/Adam/i')).toBeInTheDocument();
          expect(queryByText('/Other/i')).toBeInTheDocument();
      });
    }
);


test('fetch characters with invalid search', () => {
  mockedAxios.get.mockImplementationOnce(()=>
    Promise.resolve({
      data: {
        data:{
            results:[],
            total:0
        }
      }
    })
  );

  const wrapper = reduxWrap(<Master />, {pages:{characters:[]}});

  const {queryByTestId, queryByTitle} = render(wrapper)
  
  expect(document.querySelector('.masonry-item')).not.toBeInTheDocument();

  waitForElement(() => queryByTitle('notfound'));
  
  wait(() => {
      expect(document.querySelector('.masonry-item')).not.toBeInTheDocument();
      expect(queryByTestId('masonry-skeleton')).not.toBeInTheDocument();
      expect(queryByTitle('notfound')).toBeInTheDocument();
  });
});

test('fetch characters with a valid search', async () => {
  mockedAxios.get.mockImplementationOnce(()=>
    Promise.resolve({
      data: {
        data:{
            results:[],
            total:0
        }
      }
    })
  );

  const wrapper = reduxWrap(<Master />, {pages:{characters:[]}});

  const {getByTestId, queryByTestId, queryByText, queryByTitle, getByLabelText} = render(wrapper)
  
  expect(document.querySelector('.masonry-item')).not.toBeInTheDocument();

  waitForElement(() => queryByTitle('notfound'));

  mockedAxios.get.mockImplementationOnce(()=>
    Promise.resolve({
      data: {
        data:{
            results:[{
                id: 1,
                name:'Hulk 1',
                description: 'This is Mocked Hulk 1',
                thumbnail: { path: 'Hulk1Path', extension:'jpg' }
              },{
                id: 2,
                name:'Hulk 2',
                description: 'This is Mocked Hulk 2',
                thumbnail: { path: 'Hulk2Path', extension:'jpg' }
              }
            ],
            total:2
        }
      }
    })
  );

  const search = getByLabelText("search");

  fireEvent.change(search, { target: { value: 'hulk' } });

  jest.advanceTimersByTime(500)

  fireEvent.keyDown(search, { key: 'Enter', code: 13 });

  waitForElement(() => document.querySelector('.masonry-item'));
  
  wait(() => {
      expect(document.querySelector('.masonry-item')).toBeInTheDocument();
      expect(document.querySelectorAll('.masonry-item').length).toBe(2);
      expect(queryByTestId('masonry-skeleton')).not.toBeInTheDocument();
      expect(queryByTitle('notfound')).not.toBeInTheDocument();
      expect(queryByText('/Hulk 1/i')).toBeInTheDocument();
      expect(queryByText('/Hulk 2/i')).toBeInTheDocument();
  });
});

test('fetch more characters ', async () => {

  const result = [];
  
  for (let i; i < 40; i++){
    result.push({
      id: i,
      name:'Some Character',
      description: 'This is Mocked Character',
      thumbnail: { path: 'CharPath'+i, extension:'jpg' }
    })
  }
  mockedAxios.get.mockImplementationOnce(()=>
    Promise.resolve({
      data: {
        data:{
            results:result.splice(0,20),
            total:result.length
        }
      }
    })
  );

  const wrapper = reduxWrap(<Master />, {pages:{characters:[]}});

  const {queryByTestId, queryByText, getByTestId} = render(wrapper)
  
  expect(document.querySelector('.masonry-item')).not.toBeInTheDocument();

  waitForElement(() => document.querySelector('.masonry-item'));

  mockedAxios.get.mockImplementationOnce(()=>
    Promise.resolve({
      data: {
        data:{
            results:result.splice(20,40),
            total:result.length
        }
      }
    })
  );

  fireEvent.scroll(global, {target:{scrollY:800}});

  jest.advanceTimersByTime(500);

  wait(() => {
      expect(document.querySelector('.masonry-item')).toBeInTheDocument();
      expect(document.querySelectorAll('.masonry-item').length).toBe(result.length);
      expect(queryByTestId('masonry-skeleton')).not.toBeInTheDocument();
      expect(queryByTitle('notfound')).not.toBeInTheDocument();
  });
}
);
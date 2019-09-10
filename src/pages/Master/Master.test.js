import Master from './Master';

test('load skeleton while loading', async () => {
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

  const {queryByTestId, queryByText} = render(wrapper)
  
  expect(document.querySelector('.masonry-item')).not.toBeInTheDocument();
  expect(queryByTestId('masonry-skeleton')).toBeInTheDocument();

  await waitForElement(() => queryByText(/not found/i));
  
  expect(document.querySelector('.masonry-item')).not.toBeInTheDocument();
  expect(queryByTestId('masonry-skeleton')).not.toBeInTheDocument();
  expect(queryByText(/not found/i)).toBeInTheDocument();
});

test('fetch characters ', async () => {
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

  const {queryByTestId, queryByText} = render(wrapper);
  
  expect(document.querySelector('.masonry-item')).not.toBeInTheDocument();
  expect(queryByTestId('masonry-skeleton')).toBeInTheDocument();
  
  await waitForElement(() => document.querySelector('.masonry-item'));
  
  expect(document.querySelector('.masonry-item')).toBeInTheDocument();
  expect(document.querySelectorAll('.masonry-item').length).toBe(2);
  expect(queryByTestId('masonry-skeleton')).not.toBeInTheDocument();
  expect(queryByText(/not found/i)).not.toBeInTheDocument();
  expect(queryByText(/adam/i)).toBeInTheDocument();
  expect(queryByText(/other/i)).toBeInTheDocument();
});


test('fetch characters with invalid search', async () => {
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
            total:2,
        }
      }
    })
  ).mockImplementationOnce(()=>
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

  const {queryByTestId, queryByText, getByLabelText} = render(wrapper)
  
  expect(document.querySelector('.masonry-item')).not.toBeInTheDocument();
  expect(queryByTestId('masonry-skeleton')).toBeInTheDocument();
  
  await waitForElement(() => document.querySelector('.masonry-item'));

  const search = getByLabelText("search");

  act(() => {
    fireEvent.change(search, { target: { value: 'invalidCharacter' } });
  });

  await waitForElement(() => queryByText(/not found/i));

  expect(document.querySelector('.masonry-item')).not.toBeInTheDocument();
  expect(queryByTestId('masonry-skeleton')).not.toBeInTheDocument();
  expect(queryByText(/not found/i)).toBeInTheDocument();
});

test('fetch characters with a valid search', async () => {
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
            total:2,
        }
      }
    })
  ).mockImplementationOnce(()=>
    Promise.resolve({
      data: {
        data:{
          results:[{
            id: 1,
            name:'Hulk 1',
            description: 'This is Mocked Hulk 1',
            thumbnail: { path: 'Hulk1Path', extension:'jpg' }
          }
        ],
        total:1
        }
      }
    })
  );

  const wrapper = reduxWrap(<Master />, {pages:{characters:[]}});

  const {queryByTestId, queryByText, getByLabelText} = render(wrapper)
  
  expect(document.querySelector('.masonry-item')).not.toBeInTheDocument();
  expect(queryByTestId('masonry-skeleton')).toBeInTheDocument();
  
  await waitForElement(() => document.querySelector('.masonry-item'));

  const search = getByLabelText("search");

  act(() => {
    fireEvent.change(search, { target: { value: 'hulk' } });
  });
  
  await waitForElement(() => queryByText(/Hulk 1/i));

  expect(document.querySelector('.masonry-item')).toBeInTheDocument();
  expect(document.querySelectorAll('.masonry-item').length).toBe(1);
  expect(queryByTestId('masonry-skeleton')).not.toBeInTheDocument();
  expect(queryByText(/not found/i)).not.toBeInTheDocument();
  expect(queryByText(/Hulk 1/i)).toBeInTheDocument();
});


//https://codesandbox.io/s/test-scroll-0rbmh?from-embed
// test('fetch more characters ', async () => {

//   mockedAxios.get.mockImplementationOnce(()=>
//   Promise.resolve({
//     data: {
//       data:{
//           results:[
//             {
//               id: 1,
//               name:'Adam Warlock',
//               description: 'This is Mocked Adam Warlock',
//               thumbnail: { path: 'AdamWarlockPath', extension:'jpg' }
//             },{
//               id: 2,
//               name:'Some Other Character',
//               description: 'This is Mocked Character',
//               thumbnail: { path: 'CharPath', extension:'jpg' }
//             }
//           ],
//           total:4
//       }
//     }
//   })
// ).mockImplementationOnce(()=>
// Promise.resolve({
//   data: {
//     data:{
//         results:[
//           {
//             id: 3,
//             name:'She Hulk',
//             description: 'This is Mocked She Hulk',
//             thumbnail: { path: 'SheHulkPath', extension:'jpg' }
//           },{
//             id: 4,
//             name:'Wolverine',
//             description: 'This is Mocked Wolverine',
//             thumbnail: { path: 'WolverinePath', extension:'jpg' }
//           }
//         ],
//         total:4
//     }
//   }
// })
// );

// const wrapper = reduxWrap(<Master />, {pages:{characters:[]}});

// const {queryByTestId, getByTestId, queryByText} = render(wrapper);

// expect(document.querySelector('.masonry-item')).not.toBeInTheDocument();
// expect(queryByTestId('masonry-skeleton')).toBeInTheDocument();

// await waitForElement(() => document.querySelector('.masonry-item'));

// act(() => {
//   fireEvent.scroll(window, {target:{x:0,y:1600}});
// });

// await waitForElement(() => queryByText(/she/i));

// expect(document.querySelector('.masonry-item')).toBeInTheDocument();
// expect(document.querySelectorAll('.masonry-item').length).toBe(4);
// expect(queryByTestId('masonry-skeleton')).not.toBeInTheDocument();
// expect(queryByText(/not found/i)).not.toBeInTheDocument();
// expect(queryByText(/adam/i)).toBeInTheDocument();
// expect(queryByText(/other/i)).toBeInTheDocument();
// expect(queryByText(/she/i)).toBeInTheDocument();
// expect(queryByText(/wolverine/i)).toBeInTheDocument();

// }
// );
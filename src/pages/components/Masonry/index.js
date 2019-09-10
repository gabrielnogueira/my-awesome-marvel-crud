// React componente based on: https://w3bits.com/css-masonry/

import React, {useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import imagesLoaded from 'imagesloaded';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import Skeleton from './Skeleton';
import './masonry.css';

const resizeMasonryItem = (item) => {
  var grid = document.getElementsByClassName('masonry')[0];
  if( grid ) {
    var rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
        rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    var rowSpan = Math.ceil((item.querySelector('.masonry-content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));

    item.style.gridRowEnd = 'span '+rowSpan;
  }
}

const waitForImages = (items) => {
  var allItems = document.querySelectorAll('.masonry-item');
  if( allItems ) {
    for(var i=0;i<allItems.length;i++){
      imagesLoaded( allItems[i], function(instance) {
        var item = instance.elements[0];
        resizeMasonryItem(item);
      } );
    }
  }
}

const masonryEvents = ['load', 'resize'];
masonryEvents.forEach( function(event) {
  window.addEventListener(event, waitForImages);
});

const Masonry = (props) => {
  const {items, total, loadMore} = props;
 
  useEffect(() => {
    waitForImages(items);
  }, [items])

  return <InfiniteScroll
            loadMore={()=>loadMore()}
            hasMore={items && (items.length < total)}
            loader={<div className="loader" style={{textAlign:'center', padding:20}} key={0}><CircularProgress /></div>} >
                      <div className="masonry-wrapper">
                          <div className="masonry">
                                {items.map(item=><div key={item.id} className="masonry-item">
                                    <Link to={`/details/${item.id}`}>
                                      <div className="masonry-content">
                                          <img src={item.imageSrc} alt={item.name} />
                                          <h3 className="masonry-title">{item.title}</h3>
                                      </div>
                                    </Link>
                                </div>)}
                          </div>
                      </div>
         </InfiniteScroll>
}

Masonry.Skeleton = Skeleton;

export default Masonry;
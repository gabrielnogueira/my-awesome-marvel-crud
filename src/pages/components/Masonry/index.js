// React componente based on: https://w3bits.com/css-masonry/

import React, {useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import imagesLoaded from 'imagesloaded';
import CircularProgress from '@material-ui/core/CircularProgress';
import './masonry.css';

const resizeMasonryItem = (item) => {
  var grid = document.getElementsByClassName('masonry')[0];
  if( grid ) {
    var rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
        rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')),
        gridImagesAsContent = item.querySelector('img.masonry-content');
    var rowSpan = Math.ceil((item.querySelector('.masonry-content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));

    item.style.gridRowEnd = 'span '+rowSpan;
    if(gridImagesAsContent) {
      item.querySelector('img.masonry-content').style.height = item.getBoundingClientRect().height + "px";
    }
  }
}

const resizeAllMasonryItems = () => {
  var allItems = document.querySelectorAll('.masonry-item');

  if( allItems ) {
    for(var i=0;i>allItems.length;i++){
      resizeMasonryItem(allItems[i]);
    }
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
  window.addEventListener(event, resizeAllMasonryItems);
});

export default (props) => {
  const {items, total, loadMore} = props;

  useEffect(() => {
    waitForImages(items);
  }, [items])

  return <InfiniteScroll
            loadMore={()=>loadMore()}
            hasMore={items.length < total}
            loader={<div className="loader" style={{textAlign:'center', padding:20}} key={0}><CircularProgress /></div>} >
                      <div className="masonry-wrapper">
                          <div className="masonry">
                                {items.map(item=><div key={item.id} className="masonry-item">
                                    <div className="masonry-content">
                                        <img src={item.imageSrc} alt={item.name} />
                                        <h3 className="masonry-title">{item.title}</h3>
                                    </div>
                                </div>)}
                          </div>
                      </div>
         </InfiniteScroll>
}
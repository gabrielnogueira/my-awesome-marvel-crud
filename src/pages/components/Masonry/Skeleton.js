//http://danilowoz.com/create-content-loader/
import React from 'react';
import ContentLoader from "react-content-loader"
import { useMediaQuery } from 'react-responsive'

export default (props) => {
  
  const layout3Columns = useMediaQuery({ query: '(min-width: 600px)' })
  const layout4Columns = useMediaQuery({ query: '(min-width: 768px)' })
  const layout5Columns = useMediaQuery({query: '(min-width: 1024px)'})

  return <div style={{height:'600px', margin:'auto', paddingTop:2, display:'flex', justifyContent:'center'}}>
      <div style={{width:'170px'}}>
        <ContentLoader 
          height={400}
          width={117}
          speed={2}
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <rect x="0" y="15" rx="0" ry="0" width="117" height="116" /> 
          <rect x="35" y="141" rx="0" ry="0" width="50" height="13" />
          <rect x="0" y="173" rx="0" ry="0" width="115" height="200" />
          <rect x="35" y="380" rx="0" ry="0" width="50" height="13" />
        </ContentLoader>
      </div>
      <div style={{width:'170px', marginLeft:10}}>
        <ContentLoader 
          height={400}
          width={117}
          speed={2}
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <rect x="0" y="15" rx="0" ry="0" width="117" height="152" />
          <rect x="35" y="177" rx="0" ry="0" width="50" height="13" />
          <rect x="0" y="205" rx="0" ry="0" width="115" height="100" />
          <rect x="35" y="312" rx="0" ry="0" width="50" height="13" />
          <rect x="0" y="345" rx="0" ry="0" width="115" height="50" /> 
        </ContentLoader>
      </div>

      {layout3Columns && <div style={{width:'170px', marginLeft:10}}>
        <ContentLoader 
          height={400}
          width={117}
          speed={2}
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
      <rect x="0" y="15" rx="0" ry="0" width="117" height="118" /> 
      <rect x="35" y="141" rx="0" ry="0" width="50" height="13" /> 
      <rect x="0" y="175" rx="0" ry="0" width="117" height="60" /> 
      <rect x="35" y="241" rx="0" ry="0" width="50" height="13" />  
      <rect x="0" y="275" rx="0" ry="0" width="117" height="130" /> 
        </ContentLoader>
      </div>}
      
      {layout4Columns && <div style={{width:'170px', marginLeft:10}}>
        <ContentLoader 
          height={400}
          width={117}
          speed={2}
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
      <rect x="0" y="15" rx="0" ry="0" width="116" height="99" /> 
      <rect x="35" y="120" rx="0" ry="0" width="50" height="13" /> 
      <rect x="0" y="155" rx="0" ry="0" width="116" height="180" /> 
      <rect x="35" y="341" rx="0" ry="0" width="50" height="13" />
      <rect x="0" y="376" rx="0" ry="0" width="115" height="30" />
        </ContentLoader>
    </div> }
      {layout5Columns && <div style={{width:'170px', marginLeft:10}}>
        <ContentLoader 
          height={400}
          width={117}
          speed={2}
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
      <rect x="0" y="15" rx="0" ry="0" width="116" height="138" /> 
      <rect x="35" y="160" rx="0" ry="0" width="50" height="13" />
      <rect x="0" y="192" rx="0" ry="0" width="116" height="138" /> 
      <rect x="35" y="335" rx="0" ry="0" width="50" height="13" /> 
      <rect x="0" y="370" rx="0" ry="0" width="115" height="30" />
        </ContentLoader>
      </div>}
  </div>
}


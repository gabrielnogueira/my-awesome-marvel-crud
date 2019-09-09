//http://danilowoz.com/create-content-loader/
import React from 'react';
import ContentLoader from "react-content-loader"
import { useMediaQuery } from 'react-responsive'

export default (props) => {

  const layoutFull = useMediaQuery({ query: '(min-width: 960px)' })

  return <div style={{margin:'auto', paddingTop:2, display:'flex', justifyContent:'center'}}>
    {layoutFull && <div style={{width:'100%'}}>
      <ContentLoader 
        height={600}
        width={900}
        speed={2}
        primaryColor="#dad8d8"
        secondaryColor="#e6e6e6"
      >
        <rect x="143" y="16" rx="0" ry="0" width="265" height="267" /> 
        <rect x="433" y="62" rx="0" ry="0" width="87" height="19" /> 
        <rect x="433" y="112" rx="0" ry="0" width="312" height="125" /> 
        <rect x="702" y="249" rx="0" ry="0" width="43" height="19" /> 
        <rect x="433" y="52" rx="0" ry="0" width="25" height="7" /> 
        <rect x="433" y="102" rx="0" ry="0" width="50" height="7" />
      </ContentLoader>
    </div>}
      {!layoutFull && <div style={{width:'100%', justifyContent:'center', padding:50, paddingTop:18}}>
        <div style={{maxWidth:400, margin:'auto'}} >
          <ContentLoader 
            height={267}
            width={265}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="0" y="0" rx="0" ry="0" width="265" height="267" />
          </ContentLoader>
        </div>

      <div style={{paddingLeft:16, paddingTop:36}}><ContentLoader 
            height={400}
            width={600}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
            style={{minHeight:365, maxHeight:365}}
          >
            <rect x="0" y="13" rx="0" ry="0" width="103" height="19" /> 
            <rect x="0" y="57" rx="0" ry="0" width="590" height="265" /> 
            <rect x="520" y="334" rx="0" ry="0" width="51" height="19" /> 
            <rect x="0" y="0" rx="0" ry="0" width="30" height="7" /> 
            <rect x="0" y="43" rx="0" ry="0" width="59" height="7" />
          </ContentLoader>
      </div>
          </div>}
    </div>
}
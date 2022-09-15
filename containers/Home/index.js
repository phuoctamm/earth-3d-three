import React from 'react'
import PropTypes from 'prop-types'
// import EarthTexture from './Earth'
import dynamic from 'next/dynamic';

const EarthTexture = dynamic(() => import('./Earth'), { ssr: false });

function HomePage(props) {
  return (
    <div style={{height: '100vh', background: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <EarthTexture />
    </div>
  )
}

HomePage.propTypes = {}

export default HomePage

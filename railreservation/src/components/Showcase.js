import React from 'react'
 import Destinations from '../components/Destinations';

const Showcase = () => {
  return (
    <section className='showcase'>
      <div className='showcase-overlay'>
        <h1 style={{marginTop:"62rem"}}>Book easier, Travel safer with Indian Railway.</h1>
        <p>
          Get to tour the world in style. Select a destination, book your
          train, and off you go!
        </p>
        
        <div >
        <Destinations/>
        </div>
       
      </div>
    </section>
  )
}

export default Showcase

import React from 'react';
import { navOpts } from '../data';
import { IoMdMenu } from 'react-icons/io';
import '../styles/nav.css';

const Navbar = () => {
  return (
    <nav className='sect'>
      <div className='center_sect'>
        <div className='left_side'>
          <div className='logo_wrapper'>
            <span className='logo'></span>
            <h1>TeachMateAI</h1>
          </div>

          <div className='navopts_wrapper'>
            {navOpts.map((opt) => (
              <span className='nav_opt' key={opt}>
                {opt}
              </span>
            ))}
          </div>
        </div>

        <div className='right_side'>
          <button className='upgrade_btn'>Upgrade to Pro</button>
          <input className='search' type='text' placeholder='Search...' />

          <button className='menu_btn'>
            <IoMdMenu />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

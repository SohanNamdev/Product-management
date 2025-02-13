import React from 'react';

const Navbar = ({ username, profileImage }) => {
  return (
    <nav className=''>
      <img src={profileImage} alt={`${username}'s profile`} />
      <span>{username}</span>
    </nav>
  );
};

export default Navbar;
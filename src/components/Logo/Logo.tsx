import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <Link to="/">
        <img
          className="w-24 h-24 xl:w-32 xl:h-32"
          src="/assets/images/afsmyj5hkqp-bg-removed-VizXpress.png"
          alt="Logo"
        />
      </Link>
    </div>
  );
};

export default Logo;
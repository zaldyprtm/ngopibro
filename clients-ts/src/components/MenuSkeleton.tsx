import React from 'react';

const MenuSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse flex flex-col md:grid md:grid-cols-3 gap-4 p-4 mt-28">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="card w-96 bg-base-100 shadow-xl">
          <div className="px-10 pt-10">
            <div className="w-64 h-64 bg-gray-300 rounded-xl"></div>
          </div>
          <div className="card-body items-center text-center">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="card-actions">
              <div className="btn btn-primary bg-gray-300 border-none w-24 h-10"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuSkeleton;

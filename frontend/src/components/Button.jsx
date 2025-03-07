import React from 'react';

export default function Button({ name, isSelected, onClick }) {
    return (
        <button 
            onClick={onClick} 
            className={`cursor-pointer flex items-center gap-2 border px-4 h-10 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 
                ${isSelected ? 'bg-blue-500 text-white' : 'border-blue-500 text-gray-600'}`}
        >
            <span className='font-bold'> {name} </span>
        </button>
    );
}

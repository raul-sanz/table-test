"use client"

import React, { useState } from 'react';

export default function Home() {
  const [years, setYears] = useState([2022, 2023, 2024]);
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const generateRandomData = () => {
    const randomData = [];
    for (let i = 0; i < 12; i++) {
      randomData.push(Math.floor(Math.random() * 100) + 1);
    }
    return randomData;
  };
  const data = years.map(() => generateRandomData());

  const addYear = () => {
    const newYear = years[years.length - 1] + 1;
    setYears([...years, newYear]);
  };

  const calculateAveragePerMonth = () => {
    const averages = [];
    for (let i = 0; i < 12; i++) {
      let total = 0;
      for (let j = 0; j < years.length; j++) {
        const yearIndex = years.indexOf(years[j]);
        total += data[yearIndex][i];
      }
      averages.push(total / years.length);
    }
    return averages;
  };

  const calculateTotalPerYear = (yearIndex: number) => {
    let total = 0;
    data[yearIndex].forEach(value => {
      total += value;
    });
    return total;
  };

  const averagesPerMonth = calculateAveragePerMonth();

  return (
    <div className="flex justify-center p-12">
      <div>
        <div className='flex justify-end py-4'>
          <button onClick={addYear} className='bg-blue-400 font-bold rounded-2xl p-2 text-white'>Agregar Año</button>
        </div>
        <div >
          <table className="table-auto">
            <thead>
              <tr className='border p-2'>
                <th className='border p-2'>Año/Mes</th>
                {months.map((month, index) => (
                  <th className='border p-2' key={index}>{month}</th>
                ))}
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {years.map((year, yearIndex) => (
                <tr className='border p-2' key={year}>
                  <td className='border p-2'>{year}</td>
                  {data[yearIndex].map((value, index) => (
                    <td className='border p-2' key={index}>{value}</td>
                  ))}
                  <td>{calculateTotalPerYear(yearIndex)}</td>
                </tr>
              ))}
              <tr className='border p-2'>
                <td className='border p-2'>Promedio</td>
                {averagesPerMonth.map((average, index) => (
                  <td className='border p-2' key={index}>{average.toFixed(2)}</td>
                ))}
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
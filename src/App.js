import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import InputForm from './InputForm';
import SignaturePreview from './SignaturePreview';

function App() {
  const getInitialFormData = () => {
    const saved = localStorage.getItem('signatureFormData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {
          firstName: '',
          lastName: '',
          nickname: '',
          position: '',
          email: '',
          phoneNumber: '',
          country: '',
          logo: '',
          department: '',
          banner: ''
        };
      }
    }
    return {
      firstName: '',
      lastName: '',
      nickname: '',
      position: '',
      email: '',
      phoneNumber: '',
      country: '',
      logo: '',
      department: '',
      banner: ''
    };
  };

  const [formData, setFormData] = useState(getInitialFormData());
  const [departments, setDepartments] = useState([]);
  const [countries, setCountries] = useState([]);
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://dev-wyeth-3.pdoh-dev.acommercedev.com/db')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch data');
        return response.json();
      })
      .then(data => {
        setDepartments(data.departments || []);
        setCountries(data.countries || []);
        setLogos(data.logo || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('signatureFormData', JSON.stringify(formData));
  }, [formData]);

  return (
    <Box className="wrapper">
      <Box className="main">
        <InputForm
          formData={formData}
          setFormData={setFormData}
          departments={departments}
          countries={countries}
          logos={logos}
          loading={loading}
          error={error}
        />
        <SignaturePreview
          formData={formData}
          departments={departments}
          countries={countries}
          logos={logos}
          loading={loading}
          error={error}
        />
      </Box>
    </Box>
  );
}

export default App;
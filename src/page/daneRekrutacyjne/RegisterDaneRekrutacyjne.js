import React from 'react'
import { useEffect } from 'react';
import axiosPublic from '../../utils/useAxios';

const RegisterDaneRekrutacyjne = () => {
  const client = axiosPublic;

  useEffect(() => {
        const fetchFormData = async () => {
            const formData = await client.get("/api/v1/dane-rekrutacyjne/form-data");
            console.log(formData.data)
        }
        fetchFormData();
  })

  return (
    <div>
        <h1>Register Dane Rekrutacyjne</h1>
    </div>
  )
}

export default RegisterDaneRekrutacyjne
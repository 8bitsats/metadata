import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Copy, Download, Save, Play } from 'lucide-react';
import axios from 'axios';

const ApiKeyManager: React.FC = () => {
  // ... (previous state declarations)

  const testApiKey = async () => {
    if (!selectedKeyId || !testUrl) {
      showNotification('Please select an API key and enter a test URL');
      return;
    }
    const selectedKey = apiKeys.find(key => key.id.toString() === selectedKeyId);
    if (!selectedKey) {
      showNotification('Selected API key not found');
      return;
    }
    try {
      setTestResult('Testing...');
      const response = await axios.get(testUrl, {
        headers: {
          'Authorization': `Bearer ${selectedKey.value}`
        }
      });
      if (response.status >= 200 && response.status < 300) {
        setTestResult('Success! API key is working.');
      } else {
        setTestResult(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setTestResult(`Error: ${error.response?.status} ${error.response?.statusText}`);
      } else {
        setTestResult(`Error: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  };

  // ... (rest of the component remains the same)
};

export default ApiKeyManager;
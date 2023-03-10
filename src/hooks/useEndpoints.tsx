import React, { useState } from 'react';

interface Endpoint {
  name: string;
  url: string;
}

const defaultEndpoint: Endpoint = {
  name: 'Local dummy data',
  url: '', // js
};

const useEndpoints = () => {
  const [endpoint, setEndpoint] = useState<Endpoint>(defaultEndpoint);
  const BackendEndpoints: Endpoint[] = [
    defaultEndpoint,
    {
      name: 'Rails',
      url: 'http://localhost:3003',
    },
    {
      name: 'Node',
      url: 'http://localhost:3004',
    },
  ];

  const onChange = (event: React.ChangeEvent) => {
    const selectedIndex = Number((event.target as HTMLSelectElement).value);
    setEndpoint(BackendEndpoints[selectedIndex]);
  };

  return {
    endpoint,
    availableEndpoints: BackendEndpoints,
    onChange
  };
};

export { useEndpoints, type Endpoint };

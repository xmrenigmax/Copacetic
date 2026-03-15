import React, { useState } from 'react';
import _ from 'lodash';

interface AddressBarProps {
  url: string;
  onNavigate: (url: string) => void;
}

export const AddressBar = ({ url, onNavigate }: AddressBarProps) => {
  const [inputUrl, setInputUrl] = useState(url);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!_.isNull(inputUrl) && !_.isEmpty(inputUrl)) {
      let parsedUrl = inputUrl;
      if (!parsedUrl.startsWith('http://') && !parsedUrl.startsWith('https://')) {
        parsedUrl = `https://${parsedUrl}`;
      }
      onNavigate(parsedUrl);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full max-w-3xl mx-auto bg-secondary rounded-lg px-4 py-1.5 shadow-sm backdrop-blur-xl">
      <div className="mr-3 text-gray-400 tt-u">
        SECURE
      </div>
      <input type="text" value={inputUrl} onChange={handleChange} className="w-full bg-transparent outline-none text-white text-sm tracking-wide" placeholder="Search or enter website name..." />
    </form>
  );
};

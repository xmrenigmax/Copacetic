import React, {
  useState
} from 'react';
import _ from 'lodash';

interface AddressBarProps {
  url: string;
  onNavigate: (url: string) => void;
}

export const AddressBar = ({ url, onNavigate }: AddressBarProps) => {
  const [
    inputUrl,
    setInputUrl
  ] = useState(url);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!_.isNull(inputUrl) && !_.isEmpty(inputUrl)) {
      let parsedUrl = inputUrl.trim();
      if (_.includes(parsedUrl, ' ') || !_.includes(parsedUrl, '.')) {
        parsedUrl = `https://www.google.com/search?q=${encodeURIComponent(parsedUrl)}`;
      } else if (!parsedUrl.startsWith('http://') && !parsedUrl.startsWith('https://')) {
        parsedUrl = `https://${parsedUrl}`;
      }
      onNavigate(parsedUrl);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full bg-black/20 rounded-md px-3 py-1.5 border border-white/5 shadow-inner transition-all focus-within:bg-black/40 focus-within:border-white/20">
      <div className="mr-2 text-white/30 tt-u text-[9px] tracking-widest font-semibold shrink-0">
        SECURE
      </div>
      <input
        id="address-bar-input"
        type="text"
        value={inputUrl}
        onChange={handleChange}
        className="w-full bg-transparent outline-none text-white/80 text-xs font-light tracking-wide placeholder-white/30"
        placeholder="Search or enter website..."
      />
    </form>
  );
};

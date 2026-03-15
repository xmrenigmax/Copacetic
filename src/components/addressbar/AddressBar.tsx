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
    <form onSubmit={handleSubmit} className="flex items-center w-full max-w-3xl mx-auto bg-primary rounded-full px-5 py-2 shadow-inner border border-white/5 bdT transition-all focus-within:bg-white/10 focus-within:border-white/20">
      <div className="mr-3 text-white/50 tt-u text-[10px] tracking-widest font-semibold">
        SECURE
      </div>
      <input type="text" value={inputUrl} onChange={handleChange} className="w-full bg-transparent outline-none text-white text-sm font-light tracking-wide placeholder-white/30" placeholder="Search or enter website name..." />
    </form>
  );
};

import React, { useState } from 'react';

function App() {
  const userid = 'u-earn'; // Replace with your userid 
  const [copied, setCopied] = useState(false);
  const referralBaseUrl = 'https://example.com/referral/';

  const referralLink = `${referralBaseUrl}${userid}`;

  const handleCopyClick = () => {
    const copyInput = document.createElement('input');
    copyInput.value = referralLink;
    document.body.appendChild(copyInput);
    copyInput.select();
    document.execCommand('copy');
    document.body.removeChild(copyInput);

    setCopied(true);
  };

  return (
    <div>
      <p>
        Referral Link: <a href={referralLink}>{referralLink}</a>
      </p>
      <button
        onClick={handleCopyClick}
        className="bg-blue-500 text-white px-3 py-1 rounded mt-2 hover:bg-blue-600 transition"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}

export default App;

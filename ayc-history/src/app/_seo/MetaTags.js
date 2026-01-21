export default function MetaTags() {
    return (
      <>
        {/* IE Compatibility */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  
        {/* Mobile Web App */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AYC Archive" />
  
        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#1e3a8a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
  
        {/* Format Detection */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="date=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="format-detection" content="email=no" />
      </>
    );
  }
  
// pages/site/[site].js

import { useRouter } from 'next/router';

function SitePage() {
  const router = useRouter();
  const { site } = router.query;

  return (
    <div>
      <h1>Site: {site}</h1>
      <p>This is the page for site {site}.</p>
    </div>
  );
}

export default SitePage;

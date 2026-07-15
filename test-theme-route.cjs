const http = require('http');

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, body: data });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  try {
    console.log('Fetching homepage http://localhost:3000/...');
    const res = await get('http://localhost:3000/');
    console.log('Homepage status:', res.statusCode);
    
    // Check if script is injected
    const hasScript = res.body.includes("localStorage.getItem('theme')");
    console.log('Contains blocking theme script:', hasScript);
    
    // Check if toggle buttons are rendered in desktop/mobile layout
    const hasToggle = res.body.includes('Toggle theme') || res.body.includes('aria-label="Toggle theme"');
    console.log('Contains theme toggle buttons:', hasToggle);
    
    if (!hasScript || !hasToggle) {
      console.log('Snippet of head / body elements to inspect:');
      console.log(res.body.substring(0, 2000));
    }
  } catch (err) {
    console.error('Error fetching homepage:', err);
  }
}

run();

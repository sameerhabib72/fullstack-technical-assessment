const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');

async function runLighthouse() {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = {
        logLevel: 'info',
        output: 'html',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        port: chrome.port,
    };
    
    const runnerResult = await lighthouse(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000', options);
    
    // PDF 6: Generate Lighthouse report
    const reportHtml = runnerResult.report;
    fs.writeFileSync('lighthouse-report.html', reportHtml);
    
    await chrome.kill();
}

runLighthouse();
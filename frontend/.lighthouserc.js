module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      url: NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', {minScore: 0.9}],
        'categories:accessibility': ['warn', {minScore: 0.9}],
        'categories:best-practices': ['warn', {minScore: 0.9}],
        'categories:seo': ['warn', {minScore: 0.9}],
        'max-potential-fid': ['warn', {maxNumericValue: 100}],
        'first-contentful-paint': ['warn', {maxNumericValue: 2000}],
        'largest-contentful-paint': ['warn', {maxNumericValue: 2500}],
        'total-blocking-time': ['warn', {maxNumericValue: 300}],
        'cumulative-layout-shift': ['warn', {maxNumericValue: 0.1}],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-reports',
    },
  },
};
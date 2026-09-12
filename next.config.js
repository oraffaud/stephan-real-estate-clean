/** @type {import('next').NextConfig} */

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), usb=()',
  },
  { key: 'X-Frame-Options', value: 'DENY' },
];

const nextConfig = {
  poweredByHeader: false,

  outputFileTracingIncludes: {
    '/[lang]/actualites': ['./content/news/**/*'],
    '/[lang]/actualites/[slug]': ['./content/news/**/*'],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'stephan-real-estate-hcoz.vercel.app',
          },
        ],
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;

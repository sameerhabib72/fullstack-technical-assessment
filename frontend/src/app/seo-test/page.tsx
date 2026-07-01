import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "SEO Test Page",
    description: "Testing SEO metadata implementation",
    robots: {
        index: true,
        follow: true,
    },
};

export default function SEOTestPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center p-8">
                <h1 className="text-2xl font-bold">SEO Test Page</h1>
                <p className="text-gray-600 mt-4">Check meta tags in head</p>
                <div className="mt-4 text-sm text-gray-500">
                    <p>Open DevTools → Elements → Check &lt;head&gt;</p>
                </div>
            </div>
        </div>
    );
}
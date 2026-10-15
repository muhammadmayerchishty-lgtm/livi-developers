import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
}

const BASE_TITLE = 'LIVI DEVELOPERS';

export function useSEO({ title, description, image }: SEOProps) {
  useEffect(() => {
    // Set document title
    const fullTitle = title.includes(BASE_TITLE) ? title : `${title} | ${BASE_TITLE}`;
    document.title = fullTitle;

    // Helper to update or create meta tags
    const setMetaTag = (attribute: string, value: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    if (description) {
      setMetaTag('name', 'description', description);
      setMetaTag('property', 'og:description', description);
      setMetaTag('name', 'twitter:description', description);
    }

    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('name', 'twitter:title', fullTitle);

    if (image) {
      setMetaTag('property', 'og:image', image);
      setMetaTag('name', 'twitter:image', image);
    }
  }, [title, description, image]);
}

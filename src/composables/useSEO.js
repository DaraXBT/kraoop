/**
 * SEO Composable
 * Manages meta tags, Open Graph, and structured data
 */

import {useHead} from "@vueuse/head";
import {computed} from "vue";
import {config} from "../config";

/**
 * useSEO Composable
 */
export function useSEO(options = {}) {
  const {
    title = "Kraoop Beauty",
    description = "Discover premium Korean skincare products for all skin types",
    image = "/og-image.jpg",
    url = "",
    type = "website",
    article = null,
    product = null,
  } = options;

  const fullTitle = computed(() => {
    return title.includes("Kraoop") ? title : `${title} - Kraoop Beauty`;
  });

  const fullUrl = computed(() => {
    return url ? `${config.app.url}${url}` : config.app.url;
  });

  const fullImage = computed(() => {
    return image.startsWith("http") ? image : `${config.app.url}${image}`;
  });

  const metaTags = computed(() => {
    const tags = [
      // Basic meta tags
      {name: "description", content: description},
      {
        name: "keywords",
        content: "korean skincare, beauty products, K-beauty, skincare",
      },

      // Open Graph
      {property: "og:title", content: fullTitle.value},
      {property: "og:description", content: description},
      {property: "og:image", content: fullImage.value},
      {property: "og:url", content: fullUrl.value},
      {property: "og:type", content: type},
      {property: "og:site_name", content: "Kraoop Beauty"},

      // Twitter Card
      {name: "twitter:card", content: "summary_large_image"},
      {name: "twitter:title", content: fullTitle.value},
      {name: "twitter:description", content: description},
      {name: "twitter:image", content: fullImage.value},

      // Mobile
      {name: "viewport", content: "width=device-width, initial-scale=1"},
      {name: "theme-color", content: "#F5A3B7"},
    ];

    // Add article-specific meta
    if (type === "article" && article) {
      tags.push(
        {property: "article:published_time", content: article.publishedTime},
        {property: "article:author", content: article.author}
      );
    }

    // Add product-specific meta
    if (type === "product" && product) {
      tags.push(
        {property: "product:price:amount", content: product.price},
        {property: "product:price:currency", content: product.currency || "USD"}
      );
      if (product.availability) {
        tags.push({
          property: "product:availability",
          content: product.availability,
        });
      }
    }

    return tags;
  });

  useHead({
    title: fullTitle,
    meta: metaTags,
    link: [{rel: "canonical", href: fullUrl.value}],
  });

  return {
    fullTitle,
    fullUrl,
    fullImage,
  };
}

/**
 * Generate structured data for products
 */
export function generateProductStructuredData(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title || product.product,
    description: product.description || `${product.brand} ${product.category}`,
    image: product.image,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      url: `${config.app.url}/detail/${product.id}`,
      priceCurrency: "USD",
      price: parseFloat(product.price.replace("$", "")),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: product.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.ratingCount || 0,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url ? `${config.app.url}${item.url}` : undefined,
    })),
  };
}

/**
 * Add structured data to page
 */
export function addStructuredData(data) {
  // Remove existing structured data script
  const existingScript = document.querySelector(
    'script[type="application/ld+json"]'
  );
  if (existingScript) {
    existingScript.remove();
  }

  // Add new structured data
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * useProductSEO - Specialized for product pages
 */
export function useProductSEO(product) {
  if (!product) return;

  const title = product.title || product.product;
  const description = `${product.brand} ${product.category} - ${
    product.title
  }. ${product.inStock ? "In Stock" : "Out of Stock"}. Only ${product.price}${
    product.originalPrice ? ` (was ${product.originalPrice})` : ""
  }.`;

  useSEO({
    title,
    description,
    image: product.image,
    url: `/detail/${product.id}`,
    type: "product",
    product: {
      price: parseFloat(product.price.replace("$", "")),
      currency: "USD",
      availability: product.inStock ? "in stock" : "out of stock",
    },
  });

  // Add structured data
  const structuredData = generateProductStructuredData(product);
  addStructuredData(structuredData);
}

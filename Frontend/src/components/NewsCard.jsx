import React from "react";

const NewsCard = ({ article }) => {
  if (!article) return null;

  const { title, url, urlToImage, description } = article;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl hover:shadow-lg transition p-6 bg-blue-50"
    >
      {urlToImage && (
        <img
          src={urlToImage}
          alt={title}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
      )}
      <h2 className="text-2xl font-semibold mb-2 text-black">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </a>
  );
};

export default NewsCard;

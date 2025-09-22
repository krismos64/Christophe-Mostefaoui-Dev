import { Link } from "react-router-dom";

export default function SimpleBlogCTA() {
  return (
    <div className="py-16 bg-purple-100 dark:bg-gray-800 text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Blog Technique - Veille & IA
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Découvrez mes articles sur React.js, l'IA et les nouvelles technologies
        </p>
        <Link
          to="/blog"
          className="inline-block bg-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-700 transition-colors"
        >
          Accéder au Blog
        </Link>
      </div>
    </div>
  );
}
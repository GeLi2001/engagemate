'use client';

import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  link?: string;
}

interface RedditPost {
  id: string;
  title: string;
  content: string;
  author: string;
  subreddit: string;
  url: string;
  score: number;
  comments: number;
  created: Date;
}

interface GeneratedComment {
  id: string;
  postId: string;
  post: RedditPost;
  content: string;
  productId: string;
  product: Product;
  status: 'generated' | 'posted' | 'failed';
  createdAt: Date;
}

export default function Comments() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [subreddits, setSubreddits] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [foundPosts, setFoundPosts] = useState<RedditPost[]>([]);
  const [generatedComments, setGeneratedComments] = useState<GeneratedComment[]>([]);
  const [searchStatus, setSearchStatus] = useState<string>('');

  useEffect(() => {
    // Load products and comments from localStorage
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      const parsed = JSON.parse(savedProducts);
      setProducts(parsed.map((p: Product & { createdAt: string }) => ({ ...p, createdAt: new Date(p.createdAt) })));
    }

    const savedComments = localStorage.getItem('generated-comments');
    if (savedComments) {
      const parsed = JSON.parse(savedComments);
      setGeneratedComments(parsed.map((c: GeneratedComment & { createdAt: string; post: RedditPost & { created: string } }) => ({ 
        ...c, 
        createdAt: new Date(c.createdAt),
        post: { ...c.post, created: new Date(c.post.created) }
      })));
    }
  }, []);

  const saveComments = (comments: GeneratedComment[]) => {
    localStorage.setItem('generated-comments', JSON.stringify(comments));
    setGeneratedComments(comments);
  };

  const checkRedditSettings = () => {
    const settings = localStorage.getItem('reddit-settings');
    if (!settings) return false;
    const parsed = JSON.parse(settings);
    return parsed.clientId && parsed.clientSecret;
  };

  const handleFindPosts = async () => {
    if (!selectedProduct || !subreddits.trim()) {
      alert('Please select a product and enter subreddits');
      return;
    }

    if (!checkRedditSettings()) {
      alert('Please configure Reddit API settings first');
      return;
    }

    setIsSearching(true);
    setSearchStatus('Searching Reddit for relevant posts...');
    setFoundPosts([]);

    try {
      // Simulate Reddit API search (replace with actual Reddit API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockPosts: RedditPost[] = [
        {
          id: '1',
          title: 'Looking for recommendations on productivity tools',
          content: 'I&apos;m struggling to stay organized with my work. Any suggestions for tools that actually work?',
          author: 'productivityseeker',
          subreddit: 'productivity',
          url: 'https://reddit.com/r/productivity/comments/1',
          score: 45,
          comments: 23,
          created: new Date()
        },
        {
          id: '2',
          title: 'Best software for small business management?',
          content: 'Running a small business and need better tools for managing everything. What do you recommend?',
          author: 'smallbizowner',
          subreddit: 'entrepreneur',
          url: 'https://reddit.com/r/entrepreneur/comments/2',
          score: 78,
          comments: 34,
          created: new Date()
        }
      ];

      setFoundPosts(mockPosts);
      setSearchStatus(`Found ${mockPosts.length} relevant posts`);
    } catch (error) {
      setSearchStatus('Error searching for posts');
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleGenerateComments = async () => {
    if (foundPosts.length === 0) {
      alert('No posts found. Please search for posts first.');
      return;
    }

    const selectedProductObj = products.find(p => p.id === selectedProduct);
    if (!selectedProductObj) return;

    setIsGenerating(true);
    const newComments: GeneratedComment[] = [];

    try {
      for (const post of foundPosts) {
        setSearchStatus(`Generating comment for: ${post.title.substring(0, 50)}...`);
        
        // Simulate AI comment generation (replace with actual OpenAI API call)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockComment = `That&apos;s a great question! I&apos;ve been using ${selectedProductObj.name} for similar challenges and it&apos;s been really helpful. ${selectedProductObj.description.substring(0, 100)}... ${selectedProductObj.link ? `You can check it out here: ${selectedProductObj.link}` : 'Feel free to ask if you have any questions about it!'}`;

        const generatedComment: GeneratedComment = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          postId: post.id,
          post: post,
          content: mockComment,
          productId: selectedProduct,
          product: selectedProductObj,
          status: 'generated',
          createdAt: new Date()
        };

        newComments.push(generatedComment);
      }

      const updatedComments = [...generatedComments, ...newComments];
      saveComments(updatedComments);
      setSearchStatus(`Generated ${newComments.length} comments successfully!`);
      
      // Clear found posts after generating comments
      setFoundPosts([]);
    } catch (error) {
      setSearchStatus('Error generating comments');
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeleteComment = (commentId: string) => {
    if (confirm('Are you sure you want to delete this comment?')) {
      const updatedComments = generatedComments.filter(c => c.id !== commentId);
      saveComments(updatedComments);
    }
  };

  const handlePostComment = async (commentId: string) => {
    // This would integrate with Reddit API to actually post the comment
    const updatedComments = generatedComments.map(c => 
      c.id === commentId ? { ...c, status: 'posted' as const } : c
    );
    saveComments(updatedComments);
    alert('Comment posted! (This is a simulation - actual Reddit posting would happen here)');
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">AI Comment Generator</h2>
        <p className="text-gray-600">Find relevant Reddit posts and generate AI-powered comments for your products</p>
      </div>

      {/* Search Configuration */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">🔍 Search Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-2">
              Select Product *
            </label>
            <select
              id="product"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Choose a product...</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            {products.length === 0 && (
              <p className="text-xs text-red-500 mt-1">No products found. Add products first.</p>
            )}
          </div>

          <div>
            <label htmlFor="subreddits" className="block text-sm font-medium text-gray-700 mb-2">
              Subreddits *
            </label>
            <input
              type="text"
              id="subreddits"
              value={subreddits}
              onChange={(e) => setSubreddits(e.target.value)}
              placeholder="productivity, entrepreneur, startups"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Comma-separated list of subreddits</p>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-2">
            Keywords (Optional)
          </label>
          <input
            type="text"
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="tool, software, recommendation, help"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Additional keywords to filter posts</p>
        </div>

        <div className="flex items-center space-x-3 mt-6">
          <button
            onClick={handleFindPosts}
            disabled={isSearching || !selectedProduct || !subreddits.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? '🔍 Searching...' : '🔍 Find Posts'}
          </button>

          {foundPosts.length > 0 && (
            <button
              onClick={handleGenerateComments}
              disabled={isGenerating}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? '🤖 Generating...' : '🤖 Generate Comments'}
            </button>
          )}
        </div>

        {searchStatus && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">{searchStatus}</p>
          </div>
        )}
      </div>

      {/* Found Posts */}
      {foundPosts.length > 0 && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">📝 Found Posts ({foundPosts.length})</h3>
          <div className="space-y-4">
            {foundPosts.map((post) => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{post.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{post.content}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>r/{post.subreddit}</span>
                      <span>by u/{post.author}</span>
                      <span>↑ {post.score}</span>
                      <span>💬 {post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generated Comments */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          💬 Generated Comments ({generatedComments.length})
        </h3>
        
        {generatedComments.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🤖</div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No comments generated yet</h4>
            <p className="text-gray-600">Use the search tool above to find posts and generate AI comments</p>
          </div>
        ) : (
          <div className="space-y-4">
            {generatedComments.map((comment) => (
              <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{comment.post.title}</h4>
                    <p className="text-xs text-gray-500">r/{comment.post.subreddit} • Product: {comment.product.name}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    comment.status === 'generated' ? 'bg-yellow-100 text-yellow-800' :
                    comment.status === 'posted' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {comment.status}
                  </span>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    Generated {comment.createdAt.toLocaleString()}
                  </p>
                  <div className="flex items-center space-x-2">
                    {comment.status === 'generated' && (
                      <button
                        onClick={() => handlePostComment(comment.id)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Post Comment
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

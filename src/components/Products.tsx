'use client';

import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct, initPrismaDatabase } from '@/lib/actions/prisma-products';
import type { Product } from '@prisma/client';

// Using Prisma's generated Product type

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    link: ''
  });

  useEffect(() => {
    initializeAndFetchProducts();
  }, []);

  const initializeAndFetchProducts = async () => {
    try {
      await initPrismaDatabase();
      await fetchProducts();
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const products = await getProducts();
      setProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim()) return;

    try {
      if (editingProduct) {
        // Update existing product
        await updateProduct(editingProduct.id, {
          name: formData.name,
          description: formData.description,
          link: formData.link || undefined
        });
        setEditingProduct(null);
      } else {
        // Create new product
        await createProduct({
          name: formData.name,
          description: formData.description,
          link: formData.link || undefined
        });
      }

      // Refresh products list
      await fetchProducts();
      
      // Reset form
      setFormData({ name: '', description: '', link: '' });
      setIsCreating(false);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      link: product.link || ''
    });
    setIsCreating(true);
  };

  const handleDelete = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        await fetchProducts(); // Refresh products list
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingProduct(null);
    setFormData({ name: '', description: '', link: '' });
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          <p className="text-gray-600">Manage your products for Reddit marketing campaigns</p>
        </div>
        
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            ➕ Add Product
          </button>
        )}
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter product name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your product, its benefits, target audience, etc."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
                Product Link (Optional)
              </label>
              <input
                type="url"
                id="link"
                value={formData.link}
                onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                placeholder="https://example.com/product"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center space-x-3 pt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products List */}
      {products.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
          <p className="text-gray-600 mb-4">
            Add your first product to start creating targeted Reddit marketing campaigns
          </p>
          {!isCreating && (
            <button
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Your First Product
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-3">{product.description}</p>
                  
                  {product.link && (
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                    >
                      🔗 View Product
                    </a>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-3">
                    Created {product.createdAt.toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
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
  );
}

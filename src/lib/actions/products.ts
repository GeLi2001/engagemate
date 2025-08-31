'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return { success: true, data: products }
  } catch (error) {
    console.error('Error fetching products:', error)
    return { success: false, error: 'Failed to fetch products' }
  }
}

export async function createProduct(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const link = formData.get('link') as string

    if (!name || !description) {
      return { success: false, error: 'Name and description are required' }
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        link: link || null
      }
    })

    revalidatePath('/') // Revalidate the page to show new data
    return { success: true, data: product }
  } catch (error) {
    console.error('Error creating product:', error)
    return { success: false, error: 'Failed to create product' }
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const link = formData.get('link') as string

    if (!name || !description) {
      return { success: false, error: 'Name and description are required' }
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        link: link || null
      }
    })

    revalidatePath('/') // Revalidate the page to show updated data
    return { success: true, data: product }
  } catch (error) {
    console.error('Error updating product:', error)
    return { success: false, error: 'Failed to update product' }
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id }
    })

    revalidatePath('/') // Revalidate the page to show updated data
    return { success: true, message: 'Product deleted successfully' }
  } catch (error) {
    console.error('Error deleting product:', error)
    return { success: false, error: 'Failed to delete product' }
  }
}

// Alternative versions that work with JSON data instead of FormData
export async function createProductFromJSON(data: { name: string; description: string; link?: string }) {
  try {
    if (!data.name || !data.description) {
      return { success: false, error: 'Name and description are required' }
    }

    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        link: data.link || null
      }
    })

    revalidatePath('/') // Revalidate the page to show new data
    return { success: true, data: product }
  } catch (error) {
    console.error('Error creating product:', error)
    return { success: false, error: 'Failed to create product' }
  }
}

export async function updateProductFromJSON(id: string, data: { name: string; description: string; link?: string }) {
  try {
    if (!data.name || !data.description) {
      return { success: false, error: 'Name and description are required' }
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        link: data.link || null
      }
    })

    revalidatePath('/') // Revalidate the page to show updated data
    return { success: true, data: product }
  } catch (error) {
    console.error('Error updating product:', error)
    return { success: false, error: 'Failed to update product' }
  }
}

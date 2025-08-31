import { PrismaClient } from '@prisma/client';
import type { Product } from '@prisma/client';

// Create a single Prisma instance for the desktop app
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./engagemate.db'
    }
  }
});

// Initialize database (create tables if they don't exist)
export async function initPrismaDatabase() {
  try {
    // This will create the database file and tables if they don't exist
    await prisma.$connect();
    console.log('Database connected successfully');
    
    // Check if we need to run migrations (in case of app updates)
    await checkAndRunMigrations();
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

async function checkAndRunMigrations() {
  try {
    // Try a simple query to test schema compatibility
    await prisma.product.findFirst();
  } catch (error) {
    console.log('Schema mismatch detected, running migrations...');
    
    // Import invoke dynamically to avoid issues in non-Tauri environments
    const { invoke } = await import('@tauri-apps/api/core');
    await invoke('run_migrations');
    
    console.log('Migrations completed, reconnecting...');
    await prisma.$disconnect();
    await prisma.$connect();
  }
}

export async function getProducts(): Promise<Product[]> {
  return await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function createProduct(data: {
  name: string;
  description: string;
  link?: string;
}): Promise<Product> {
  return await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      link: data.link || null
    }
  });
}

export async function updateProduct(id: string, data: {
  name?: string;
  description?: string;
  link?: string;
}): Promise<Product | null> {
  try {
    return await prisma.product.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.link !== undefined && { link: data.link || null }),
        updatedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    await prisma.product.delete({
      where: { id }
    });
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
}

// Clean up function
export async function closePrismaConnection() {
  await prisma.$disconnect();
}

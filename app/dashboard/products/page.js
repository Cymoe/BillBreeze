import { getProducts } from '../../actions/productActions';
import AddProductForm from './AddProductForm';

export default async function Products() {
  const products = await getProducts();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Add New Product</h2>
        <AddProductForm />
      </div>

      <h2 className="text-xl font-bold mb-2">Product List</h2>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Price</th>
            <th className="text-left">Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b">
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.category ? product.category.name : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

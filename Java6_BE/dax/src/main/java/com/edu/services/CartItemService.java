package com.edu.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.entities.CartItemEntity;
import com.edu.entities.EmployeeEntity;
import com.edu.entities.SkusEntity;
import com.edu.jpa.CartItemJPA;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CartItemService {

    @Autowired
    private CartItemJPA cartItemRepository;

    // Retrieve cart items for a specific user
    public List<CartItemEntity> getCartItemsByUserId(int userId) {
        try {
            List<CartItemEntity> cartItems = cartItemRepository.findByEmployee_Id(userId);
            if (cartItems.isEmpty()) {
                // Return empty list if no cart items found
                return cartItems;
            }
            return cartItems;
        } catch (Exception e) {
            // Log unexpected errors
            e.printStackTrace();
            // Return empty list on error
            return List.of();
        }
    }

    // Update the quantity of a cart item
    public void updateCartItemQuantity(int userId, int skusId, int productId, int quantity) {
        if (quantity <= 0) {
            System.out.println("Invalid quantity: " + quantity);
            return;
        }

        try {
            // Find the cart item based on user ID and product ID through SKUs
            CartItemEntity cartItem = cartItemRepository.findByEmployee_Id(userId)
                    .stream()
                    .filter(item -> item.getSkus().getId() == skusId)
                    .filter(item -> item.getSkus().getProduct().getId() == productId)
                    .findFirst()
                    .orElseThrow(() -> new EntityNotFoundException(
                            "Cart item not found for SKU ID: " + skusId + " and Product ID: " + productId));

            // Update the quantity
            cartItem.setQuantity(quantity);
            cartItemRepository.save(cartItem);
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Delete a cart item by ID
    public void deleteCartItem(int userId, int skusId) {
        try {
            // Find the cart item for the given userId and skusId
            CartItemEntity cartItem = cartItemRepository.findByEmployee_IdAndSkus_Id(userId, skusId);

            if (cartItem != null) {
                // Delete the cart item if it exists
                cartItemRepository.delete(cartItem);
                System.out.println("Cart item deleted for user ID: " + userId + " and product ID: " + skusId);
            } else {
                // Handle case where the item doesn't exist
                System.out.println("Cart item not found for user ID: " + userId + " and product ID: " + skusId);
            }
        } catch (Exception e) {
            // Log unexpected errors with additional context
            System.err.println(
                    "Error occurred while deleting cart item for user ID: " + userId + " and product ID: " + skusId);
            e.printStackTrace();
        }
    }


    // Add or update cart item
    public void addOrUpdateCartItem(int userId, int skusId, int quantity) {
        try {
            // Find existing cart item for the user and SKU
            CartItemEntity existingCartItem = cartItemRepository.findByEmployee_IdAndSkus_Id(userId, skusId);

            if (existingCartItem != null) {
                // Update quantity if item exists
                existingCartItem.setQuantity(existingCartItem.getQuantity() + quantity);
                cartItemRepository.save(existingCartItem);
            } else {
                // Create new cart item if it does not exist
                EmployeeEntity employee = new EmployeeEntity(); // Retrieve employee entity based on userId
                employee.setId(userId);

                SkusEntity skus = new SkusEntity(); // Retrieve SKU entity based on skusId
                skus.setId(skusId);

                CartItemEntity newCartItem = new CartItemEntity();
                newCartItem.setEmployee(employee);
                newCartItem.setSkus(skus);
                newCartItem.setQuantity(quantity);

                cartItemRepository.save(newCartItem);
            }
        } catch (Exception e) {
            // Handle errors and log exceptions
            e.printStackTrace();
        }
    }
      // Thêm sản phẩm vào giỏ hàng
      public void addCartItem(CartItemEntity cartItem) {
        // Kiểm tra nếu sản phẩm đã có trong giỏ hàng thì cập nhật số lượng
        CartItemEntity existingItem = cartItemRepository.findByEmployee_IdAndSkus_Id(cartItem.getEmployee().getId(), cartItem.getSkus().getId());
        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + cartItem.getQuantity());
            cartItemRepository.save(existingItem);
        } else {
            cartItemRepository.save(cartItem);
        }
    }
    public void clearCartByUserId(int userId) {
  List<CartItemEntity> cartItems = cartItemRepository.findByEmployee_Id(userId);
  for (CartItemEntity item : cartItems) {
    cartItemRepository.delete(item);
  }
}
}
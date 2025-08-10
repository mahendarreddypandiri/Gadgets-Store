package com.gadgets.backendspring.order;

import com.gadgets.backendspring.product.Product;
import com.gadgets.backendspring.product.ProductRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @PostMapping
    public ResponseEntity<Order> create(@Valid @RequestBody CreateOrder body) {
        // Load products and calculate total
        List<String> ids = body.getItems().stream().map(Item::getProductId).toList();
        List<Product> products = productRepository.findAllById(ids);
        BigDecimal total = BigDecimal.ZERO;
        Order order = new Order();
        order.setEmail(body.getEmail());
        order.setFullName(body.getFullName());
        order.setPhone(body.getPhone());
        order.setAddress(body.getAddress());
        order.setCity(body.getCity());
        order.setZip(body.getZip());
        order.setPayment(body.getPayment());

        for (Item it : body.getItems()) {
            Product p = products.stream().filter(pp -> pp.getId().equals(it.getProductId())).findFirst().orElse(null);
            if (p == null) return ResponseEntity.badRequest().build();
            BigDecimal line = p.getPrice().multiply(BigDecimal.valueOf(it.getQuantity()));
            total = total.add(line);
            OrderItem oi = OrderItem.builder()
                    .order(order)
                    .product(p)
                    .title(p.getTitle())
                    .price(p.getPrice())
                    .quantity(it.getQuantity())
                    .build();
            order.getItems().add(oi);
        }
        order.setTotal(total);
        return ResponseEntity.status(201).body(orderRepository.save(order));
    }

    @Data
    public static class CreateOrder {
        @Email @NotBlank private String email;
        @NotBlank private String fullName;
        @NotBlank private String phone;
        @NotBlank private String address;
        @NotBlank private String city;
        @NotBlank private String zip;
        @NotBlank private String payment; // card | cod
        private List<Item> items;
    }

    @Data
    public static class Item {
        @NotBlank private String productId;
        @Min(1) private Integer quantity;
    }
}
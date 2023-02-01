package ensa.proj.pfa_project.web;


import ensa.proj.pfa_project.auth.AuthenticationResponse;
import ensa.proj.pfa_project.auth.RegisterRequest;
import ensa.proj.pfa_project.dtos.ProductDTO;
import ensa.proj.pfa_project.entities.Product;
import ensa.proj.pfa_project.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
    @RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

  private final ProductService productService;

    @GetMapping("/getAll")
    public List<ProductDTO> getAllProducts(){
        return productService.listProducts();
    }

    @PostMapping("/create")
    public ProductDTO createProduct(@RequestBody ProductDTO productDTO){
        System.out.println(productDTO);
        return productService.saveProduct(productDTO);
    }
}
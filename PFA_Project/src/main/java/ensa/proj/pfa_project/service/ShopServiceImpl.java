package ensa.proj.pfa_project.service;

import ensa.proj.pfa_project.dtos.ShopDTO;
import ensa.proj.pfa_project.dtos.UserDTO;
import ensa.proj.pfa_project.entities.Shop;
import ensa.proj.pfa_project.entities.User;
import ensa.proj.pfa_project.mappers.ShopMapperImpl;
import ensa.proj.pfa_project.mappers.UserMapperImpl;
import ensa.proj.pfa_project.repositories.ShopRepository;
import ensa.proj.pfa_project.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ShopServiceImpl implements ShopService{

    private ShopRepository shopRepository;
    private ShopMapperImpl shopMapper;
    private UserMapperImpl userMapper;


    private UserRepository userRepository;
    @Override
    public ShopDTO saveShop(ShopDTO shopDTO) {
        Shop shop=shopMapper.fromShopDTO(shopDTO);
        System.out.println(shop);
        shopRepository.save(shop);
        return shopMapper.fromShop(shop);

    }

    @Override
    public ShopDTO findShopByUser(UserDTO userDTO) {
        return shopMapper.fromShop(shopRepository.findByUser(userMapper.fromUserDTO(userDTO)).orElseThrow());
    }
}